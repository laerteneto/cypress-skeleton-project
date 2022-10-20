/**
 * This is the basePage class with all basic methods we can use across all the pages
 */

const selectors = {
  toastNotification: '#toastNotification',
  toastNotificationXBtn: '#toastClose',
  notificationError: '#notificationError',
  progressBar: '#progressBar'
}

class BasePage {
  /**
   * Check the current url
   *
   * @param {string} url The entire url or a part of it
   *
   */
  checkUrl(url) {
    cy.url().should('include', url)
  }

  /**
   * Check url by passing a regex
   *
   * @param {RegExp} url The entire url or a part of it. Is is a string like this: /regex/
   *
   */
  checkUrlByRegex(url) {
    cy.url().should('match', url)
  }

  /**
   * Verify if a file was downloaded in the default 'cypress/downloads/' path
   *
   * @param {string} filename name of the file we want to verify if it was downloaded
   */
  assertFileWasDownloadedSuccessfully(filename) {
    cy.readFile('cypress/downloads/' + filename, { timeout: 15000 }).should('exist')
    cy.readFile('cypress/downloads/' + filename, { timeout: 15000 }).should('have.length.gt', 50)
  }

  /**
   * Assert a toast notification is displayed alongside a given message
   *
   * @param {string} toastMsg Toast message text
   * @param {boolean} displayed True to assert the entity is displayed. False otherwise.
   * @param {boolean} displayed True to close the toastNotification right after it is displayed
   */
  assertToastNotificationMessageIsDisplayed(toastMsg, displayed = true, close = false) {
    if (!displayed && close) {
      throw new Error('It does not make sense to check if the toast is displayed and then ask for close it!')
    }

    if (displayed) {
      cy.get(selectors.toastNotification).should('be.visible').should('contain.text', toastMsg)
    } else {
      cy.get(selectors.toastNotification).should('not.exist')
    }

    if (close) {
      cy.get(selectors.toastNotificationXBtn).click()
    }
  }

  /**
   * Assert if a list of elements is in alphabetical order, or in numerical order.
   * It works by sending n elements with the same locator, so this method can extract the text of all elements and assert they are being neatly displayed.
   *
   * @param {object} locator Object locator containing many elements
   */
  assertElementsInAlphabeticalOrNumericalOrder(locator) {
    const listDisplayed = []
    let listOrdered = []

    cy.get(locator)
      .each(($el, index) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            listDisplayed.push(text)
            cy.log('Element added in the list to compare: ' + listDisplayed[index])
          })
      })
      .then(() => {
        listOrdered = listDisplayed.slice()
        listOrdered = listOrdered.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })) //Not consider case sensitive, so this is a personalized sort
        cy.log('List Displayed: ' + listDisplayed.slice().toString())
        cy.log('List Ordered: ' + listOrdered.toString())
        expect(JSON.stringify(listOrdered) === JSON.stringify(listDisplayed), 'Asserting if list is ordered').to.be.true
        cy.log('List is alphabetically ordered')
      })
  }

  /**
   * Assert the elements in a locator are not duplicated. For example, you can send the locator contains ids and the method will verify if the ids are unique
   *
   * @param {object} locator Object locator containing many elements
   */
  assertNoDuplicatesOnList(locator) {
    const listToBeVerified = []

    cy.get(locator)
      .each(($el, index) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            listToBeVerified.push(text)
            cy.log('Element added in the list: ' + listToBeVerified[index])
          })
      })
      .then(() => {
        expect(new Set(listToBeVerified).size !== listToBeVerified.length, 'Asserting duplicated values in an array').to.be.false
      })
  }

  /**
   * Assert the notificationError message is displayed
   *
   * @param {string} textDisplayed Text to be validated in the error notification
   * @param {boolean} displayed True is the default value to validate if the notification error message is displayed. False otherwise.
   */
  assertNotificationErrorDisplayed(textDisplayed = '', displayed = true) {
    displayed ? cy.get(selectors.notificationError).should('be.visible') : cy.get(selectors.notificationError).should('not.exist')

    if (textDisplayed !== '' && displayed) {
      cy.get(selectors.notificationError).contains(textDisplayed)
    }
  }

  /**
   * Assert if the gs progress bar is displayed on the top of a page
   *
   * @param {boolean} displayed True is default value to check if the progress bar is being displayed. False to assert otherwise.
   */
  assertProgressBarDisplayed(displayed = true) {
    displayed ? cy.get(selectors.progressBar).should('be.visible') : cy.get(selectors.progressBar).should('not.exist')
  }

  /**
   * Move back or forward in the browser
   *
   * @param {string} direction 'back' or 'forward' in the browser
   *
   */
  goBackOrForwardInBrowser(direction) {
    if (direction === 'back') {
      cy.go(-1)
    } else if (direction === 'forward') {
      cy.go(1)
    }
  }

  /**
   * Change the browser resolution
   *
   * @param {number} x Number of pixels in the x coordinates (width)
   * @param {number} y Number of pixels in the Y coordinates (height)
   */
  changeBrowserResolution(x, y) {
    cy.viewport(x, y)
  }

  /**
   * Reload/Refresh the current page
   */
  reloadPage() {
    cy.reload()
  }

  /**
   * Navigate to an URL
   *
   * @param {string} url url to navigate. If you have a baseUrl defined in the cypress.json file, just send the endpoint instead of the entire URL.
   *
   * @example
   * When baseURL defined as https://myurl.co.uk/, just send something like /client/431 and you go to https://myurl.co.uk/client/431
   */
  navigateToUrl(url) {
    cy.visit(url, { failOnStatusCode: false })
  }

  /**
   * Get the current URL and add a text (urlPathToAdd) in the end of the current path. Then, visit this new url.
   * This method can be handy in situations where you want to perform an action by an url. Look in the example to more details
   *
   * @param {string} urlPathToAdd text to be added as a path in the end of the current url
   *
   * @example: use addPathToUrlAndVisitIt(';action=duplicate') to visit the url "yourCurrentUrl;action=duplicate"
   */
  addPathToUrlAndVisitIt(urlPathToAdd) {
    cy.url().then((url) => {
      cy.visit(url + urlPathToAdd, { failOnStatusCode: false })
    })
  }

  /**
   * Wait for a certain number of time.
   *
   * PS: Do not use this method unless you really need it.
   * It may be useful in some situations like statements, when we need to wait for some seconds until a statement changes its status
   *
   * @param {number} time Time in milliseconds to wait
   */
  waitSpecificTime(time) {
    cy.forcedWait(time)
  }
}

export default BasePage
