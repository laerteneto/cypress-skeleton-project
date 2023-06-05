// @ts-nocheck

/**
 * TO AVOID ANY ERRORS WHEN CREATING A COMMAND,
 * DO NOT FORGET TO ADD THE METHOD SIGNATURE IN THE index.d.ts
 * FILE LOCATED IN cypress/support/
 */

// References for global autocomplete
/// <reference types="cypress" />

const executeCommand = (command) => {
  cy.task('pluginExecuteCommand', command)
}

/**
 * Insert or remove latency in the test to simulate slow connections
 * PS: When using this, you modify all chrome session.
 * So, remember to call the method again with latency = -1 in case you want to remove the latency for all tests in sequence
 *
 * @param {Number} latencyTime Time of latency to simulate a slow connection
 *
 * @only_chrome  Only works on Chrome
 */
Cypress.Commands.add('changeNetworkLatency', (latencyTime = -1) => {
  cy.log('************ Inserting LATENCY:' + latencyTime + 'ms **************')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable'
      })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: false,
          latency: latencyTime,
          downloadThroughput: -1,
          uploadThroughput: -1
        }
      })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.disable'
      })
    })
})

/**
 * Go online or offline
 *
 * @param {Object} options Object to control the network behavior. See examples.
 *
 * Only works on Chrome
 *
 * @example:
 * cy.network({ offline: true }) => Goes offline
 * cy.network({ offline: false }) => Goes Online
 */
Cypress.Commands.add('network', (options) => {
  cy.log('***************** Go offline: ' + options.offline + ' ********************')
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.enable'
  })

  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.emulateNetworkConditions',
    params: {
      offline: options.offline,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
      connectionType: 'none'
    }
  })

  cy.forcedWait(1000) // Just to give a time to the browser to switch the internet connection mode
})

/**
 * Assert if the browser is connected to the internet or not
 *
 * Only works on Chrome
 *
 * @param {Object} options Object to assert the network status
 *
 * @example:
 * cy.network({ online: true }) => Assert the browser is connected
 * cy.network({ online: false }) => Assert the browser is NOT connected
 */
Cypress.Commands.add('assertNetworkOnline', (options) => {
  return cy
    .wrap(window)
    .its('navigator.onLine')
    .should('be.' + options.online)
})

/**
 * Wait for a explicity amount of time. It is the same as using cy.wait(), but without generating a warning
 *
 * @param {number} time Time im milliseconds to explicit wait
 */
Cypress.Commands.add('forcedWait', (time) => {
  cy.wait(time)
})

export default executeCommand
