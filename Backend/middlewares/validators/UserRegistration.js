class UserRegistrationClass {
  constructor(req, res, next) {
    const errors = this.validate(req.query);
    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }
    next();
  }

  validate(body) {
    const { id } = body;
    const errors = [];

    if (id && (typeof id !== "string" || id.trim() === "")) {
      errors.push({
        field: "id",
        message: "Invalid id. Please provide a non-empty string.",
      });
    }

    return errors;
  }
}

exports = module.exports = UserRegistrationClass;
