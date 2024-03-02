/**
 * This exceptions is thrown when the client doesn't is a field
 * at the moment of sending a request.
 */
class NoFieldProvided extends Error {
  /**
   *
   * @param {string} message The error message
   */
  constructor(message) {
    super(message);
    this.message = `Parameter in body request not provided: ${message}`;
  }
}

module.exports = {
  NoFieldProvided,
};
