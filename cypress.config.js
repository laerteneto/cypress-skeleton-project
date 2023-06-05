const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  numTestsKeptInMemory: 5,
  video: true,
  videoCompression: false,
  videoUploadOnPasses: true,
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 2,
    openMode: 0
  },
  screenshotOnRunFailure: true,
  screenshotConfig: {
    scale: false
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/test-results',
      charts: true,
      reportPageTitle: 'Test results',
      embeddedScreenshots: true,
      inlineAssets: true
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/test-results/junit/results-[hash].xml'
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://the-internet.herokuapp.com',
    specPattern: 'cypress/integration/**/*.spec.js',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    experimentalSessionAndOrigin: true,
    slowTestThreshold: 30000
  }
})
