class ApiError extends Error {
  constructor(status, message) {
    super(message); // передаем сообщение в родительский класс Error
    this.status = status;
  }

  static badRequest(message) {
    return new ApiError(400, message); // 404 → 400 для "Bad Request"
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) { // исправлено написание
    return new ApiError(403, message);
  }
}

export default ApiError;

