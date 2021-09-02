const jwt = require("jsonwebtoken");

module.exports = {
  signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }
};
