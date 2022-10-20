import BasePage from '../basePage'

const selectors = {
  usernameInput: '#username',
  passwordInput: '#password',
  loginButton: 'button[type="submit"]',
  errorMessageNotification: '#flash'
}

class LoginPage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  checkPageUrl() {
    this.checkUrl('/login')
  }

  /**
   * Login command through the application UI with session storage and XHR interceptions
   *
   * @param {string} email email to login. The default variable is set in the cypress.json file
   * @param {string} password password to login. The default variable is set in the cypress.json file
   * @param {Boolean} cacheSession Send true to cache the session using cy.session. Send false to login without caching the session
   */
  login(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH'), cacheSession = true) {
    if (cacheSession) {
      this.loginWithSession(email, password, cacheSession)
      cy.visit('/login')
      this.checkUrl('/secure') // Make sure the home page is the one loaded after the login
    } else {
      this.loginWithSession(email, password, cacheSession)
    }
  }

  /**
   * Login command through the application UI with SESSION STORAGE
   *
   * @param {string} email email to login. The default variable is set in the cypress.json file
   * @param {string} password password to login. The default variable is set in the cypress.json file
   * @param {Boolean} cacheSession Send true to cache the session using cy.session. Send false to login without caching the session
   */
  loginWithSession(email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH'), cacheSession = true) {
    const login = () => {
      cy.visit('/login')
      cy.get(selectors.usernameInput).type(email)
      cy.get(selectors.passwordInput).type(password, { log: false })
      cy.get(selectors.loginButton).click()
    }

    if (cacheSession) {
      cy.session([email, password], login), { cacheAcrossSpecs: true }
    } else {
      login()
    }
  }

  // ----------------------------------------------------------------------------- ASSERTIONS  ----------------------------------------------------------------------------------- //

  /**
   * Assert the error message is displayed when a unsuccessful login is made for an valid email
   *
   * @param {string} errorMessage error message to be validated
   */
  assertUnsuccessfulLoginErrorMessageDisplayed(errorMessage) {
    cy.get(selectors.errorMessageNotification).should('be.visible').should('contain.text', errorMessage)
  }
}

export default LoginPage
