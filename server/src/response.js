class Response {
    constructor(data = null, errors = null) {
      this.data = data;
      this.errors = errors;
    }
  
    success(res) {
      res.status(200).json({
        status: "success",
        data: this.data,
      });
    }
  
    created(res) {
      res.status(201).json({
        status: "created",
        data: this.data,
      });
    }
  
    badRequest(res) {
      res.status(400).json({
        status: "error",
        error: this.errors.message || this.errors,
      });
    }
  
    notFound(res) {
      res.status(404).json({
        status: "not_found",
        error: "404 Not found!",
      });
    }
  
    internalServer(res) {
      res.status(500).json({
        status: "error",
        error: this.errors.message || this.errors,
      });
    }
  }
  
  module.exports = Response;