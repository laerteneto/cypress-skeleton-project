// @ts-nocheck
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// Reporter necessary variables
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib')
const exec = require('child_process').execSync

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  console.log('Initializing module settings')
  console.log('============================')

  on('before:browser:launch', (launchOptions, browser = {}) => {
    if (browser.family === 'chromium') {
      console.log('+++ Modifying chromium settings +++')
      launchOptions.args.push(
        '--ignore-certificate-errors',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--start-maximized',
        '--no-sandbox',
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*'
      )

      return launchOptions
    }
  })

  on('before:run', async (details) => {
    console.log('override before:run')

    // Amount of specs and browser highlighted
    if (details.specs && details.browser) {
      // details.specs and details.browser will be undefined in interactive mode
      console.log('\x1b[32mRunning', details.specs.length, 'specs in', details.browser.name + '\x1b[39m')
    }

    // List of forbidden environments to run automation
    const environmentsToAvoid = ['alpha-23', 'alpha23', '23']

    // This routine avoids accidents, so the tests will never be allowed to run in the environments placed in the environmentsToAvoid variable
    if (details.config.env.TARGET_ENV === '' || details.config.env.TARGET_ENV === null || details.config.env.TARGET_ENV === undefined) {
      throw new Error('\x1b[31m !!! ************** The TARGET_ENV variable MUST BE PROVIDED in the cypress.env.json file **************************** !!! \x1b[39m')
    } else if (environmentsToAvoid.includes(details.config.env.TARGET_ENV)) {
      throw new Error(
        '\x1b[31m !!! ************** The given TARGET_ENV"' + details.config.env.TARGET_ENV + '" IS FORBIDDEN for AT testing. Test ended. **************************** !!! \x1b[39m'
      )
    } else {
      environmentsToAvoid.forEach((environment) => {
        if (details.config.baseUrl.includes(environment)) {
          throw new Error(
            '\x1b[31m !!! ************** The baseUrl "' + details.config.baseUrl + '" IS FORBIDDEN for AT testing. Test ended. **************************** !!! \x1b[39m'
          )
        }
      })
    }

    console.log('\x1b[32mThe given environment "' + details.config.baseUrl + '" is approved for testing. Moving on...\x1b[39m')

    await beforeRunHook(details)
  })

  on('after:run', async () => {
    console.log('override after:run')
    await exec('cp -r cypress/test-results/.jsons cypress/test-results/jsonResults')
    await afterRunHook()
    await exec('yarn jrm ./cypress/test-results/JUnitReport.xml ./cypress/test-results/junit/*.xml')
  })

  return config
}
