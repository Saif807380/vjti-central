const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sib_pass = process.env.SIB_PASS;

module.exports = {
  async sendOtpEmail(email, otp) {
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "vjticentral@gmail.com",
          pass: sib_pass
        }
      });

      const otpHtml = await ejs.renderFile(__dirname + "/../views/otp.ejs", {
        otp: otp
      });
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "vjticentral@gmail.com", // sender address
        to: email, // list of receivers
        subject: "OTP verification", // Subject line
        html: otpHtml // html body
      });

      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Something went wrong in the sendmail method. Error: ${error.message}`
      );
    }
  }
};
