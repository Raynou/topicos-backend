/**
 * This class is intended to be use as an standard way to return responses in the service layer
 */
class Result {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
  static success(data) {
    return new Result(true, null, data);
  }
  static fail(message) {
    return new Result(false, message, null);
  }
}

module.exports = {
  Result,
};