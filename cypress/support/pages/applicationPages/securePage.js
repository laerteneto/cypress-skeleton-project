import BasePage from '../basePage'

const selectors = {
  logoutButton: 'a.button'
}

class SecurePage extends BasePage {
  /**
   * Check if the current page is the home URL
   */
  checkPageUrl() {
    this.checkUrl('/secure')
  }

  /**
   * Click in the logout button
   */
  clickLogout() {
    cy.get(selectors.logoutButton).click()
  }
}

export default SecurePage
