var ellipticcurve = require("starkbank-ecdsa");
var curves = require("starkbank-ecdsa/ellipticcurve/curve");
var PrivateKey = ellipticcurve.PrivateKey;

module.exports = {
  createWallet() {
    let privateKey = new PrivateKey(curves.p256);
    let publicKey = privateKey.publicKey().toPem();
    let pub1 = publicKey.split("\n");
    let pubkey = pub1[1] + pub1[2];
    let priv1 = privateKey.toPem().split("\n");
    let privkey = priv1[1] + priv1[2] + priv1[3];
    let data = {
      privateKey: privkey,
      publicKey: pubkey
    };
    return data;
  }
};
