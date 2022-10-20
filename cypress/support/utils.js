/**
 * Basic methods that can be used across the project. Also called helpers
 */

class Utils {
  /**
   * Get a data in a list with the format {month, day, year}.
   * You can use the parameters to get a future date or a past date.
   * If you do not want to shift date, just send 0,0,0 in the parameters and you will get current day
   *
   * @param {number} days amount of days to shift
   * @param {number} months amount of months to shift
   * @param {number} years amount of years to shift
   * @param {string} format date format, example: MM/DD/YYYY, YYYY/MM/DD
   *
   */
  getDateInFutureOrPast(days, months, years, format) {
    const dayjs = require('dayjs')

    const now = dayjs()
    const date = now.add(days, 'day').add(months, 'month').add(years, 'year')
    const date_formatted = date.format(format)

    return date_formatted.split('/')
  }

  /**
   * Verify if a array contains duplicated elements
   *
   * @param {array} array Array to be verified
   *
   * @returns True if there is a duplicated element, false otherwise
   */
  arrayHasDuplicates(array) {
    return new Set(array).size !== array.length
  }

  /**
   * Get a random number based on the Date library.
   * This method allows us to get the number of milliseconds elapsed since January 1, 1970.
   *
   * @returns A random number based in Date.now()
   */
  getRandomNumber() {
    return Date.now()
  }

  /**
   * Generates a random string of a given length
   *
   * @param {number} length Length of the string
   *
   * @returns String with the length provided
   */
  generateRandomString(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }
}

export default Utils
