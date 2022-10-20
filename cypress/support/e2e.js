// @ts-nocheck

/**
 * This example support/index.js is processed and loaded automatically before your test files.
 * This is a great place to put global configuration and behavior that modifies Cypress.
 * You can change the location of this file or turn off automatically serving support files with the 'supportFile' configuration option.
 * You can read more here: https://on.cypress.io/configuration
 */

// References for global autocomplete
/// <reference types="cypress"/>

// Import all commands before running
import './commands.js'

// Reporter artifact
import 'cypress-mochawesome-reporter/register'

// Hooks
beforeEach(() => {
  cy.log('Cypress test: ' + Cypress.currentTest.title)
})

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-plugin-snapshots/commands'

// Plugins
require('cypress-xpath')
require('@cypress/skip-test/support')
require('cypress-grep')()
import 'cypress-real-events/support'

// Returning false here prevents Cypress from failing the test
// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
