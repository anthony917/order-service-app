class Response {
  static success(res, data) {
    return res.send(data);
  }

  static error(res, httpCode, description) {
    return res.status(httpCode).send({ error: description });
  }
}

module.exports = Response;
