import Application from '../support/pages/application'

const application = new Application()

describe('Login and Logout tests', () => {
  context('Unsuccessful scenarios', () => {
    it('Unsuccessful Login with wrong password', () => {
      application.loginPage.login(Cypress.env('DEFAULT_USER_AUTH'), 'Test@1234', false)
      application.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed('Your password is invalid!')
    })

    it('Unsuccessful Login with wrong username', () => {
      application.loginPage.login('test@test.com', Cypress.env('DEFAULT_PASSWORD_AUTH'), false)
      application.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed('Your username is invalid!')
    })
  })

  context('Successful scenarios', () => {
    beforeEach(() => {
      application.loginPage.login(Cypress.env('DEFAULT_USER_AUTH'), Cypress.env('DEFAULT_PASSWORD_AUTH'), false)
      application.securePage.checkPageUrl()
    })

    it('Successful Login', () => {
      cy.log('Test passes - scenario covered on the hook')
    })

    it('Logout from the application', () => {
      application.securePage.clickLogout()
      application.loginPage.checkPageUrl()
    })
  })
})
