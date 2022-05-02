const jwt = require("jsonwebtoken");
const config = require("../config");
const OTPUtil = require("../utilities/otp");

module.exports = {
  loginRequired(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, config.privateKey, (err, decoded) => {
        if (!err) {
          const d = new Date();
       
          if (decoded && Number(decoded.exp) * 1000 > d.getTime()) {
            next();
          } else {
            return res.status(401).json({ error: "Token has expired" });
          }
        } else {
          return res.status(401).json({ error: err.message });
        }
      });
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }
  },

  verifyOTP(req, res, next) {
    const response = OTPUtil.verifyOTP(
      req.body.student.email,
      req.body.hash,
      req.body.otp
    );
    if (response.code !== 200) {
      return res.status(response.code).json({
        error: response.msg
      });
    }
    delete req.body.hash;
    delete req.body.otp;
    next();
  }
};
