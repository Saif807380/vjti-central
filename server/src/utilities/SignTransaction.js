//added faculty public and private keys to server env file
//signature in the form of [r, s]
var ellipticcurve = require("starkbank-ecdsa");
var ecdsa = ellipticcurve.Ecdsa;
var PrivateKey = ellipticcurve.PrivateKey;

module.exports = {
  sign(txn) {
    let privateKey = PrivateKey.fromPem(process.env.FACULTY_PRIVATE_KEY);
    let signature = ecdsa.sign(txn, privateKey);
    let sig_final =
      "[" + signature.r.toString() + ", " + signature.s.toString() + "]";
   
    return sig_final;
  }
};
