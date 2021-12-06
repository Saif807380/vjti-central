const OTPUtil = require("../utilities/otp");
const { sendOtpEmail } = require("../utilities/mailer");

module.exports = {
  sendOTP(req, res) {
    const [otp, hash] = OTPUtil.generateOtpHash(req.body.email);
    sendOtpEmail(req.body.email, otp);
    return res.status(200).json({ hash: hash, email: req.body.email });
  }
};
