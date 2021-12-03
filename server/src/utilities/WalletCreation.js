const { randomBytes } = require("crypto");
const secp256k1 = require("secp256k1");
function getPrivateKey() {
  while (true) {
    const privKey = randomBytes(32);
    if (secp256k1.privateKeyVerify(privKey)) return privKey;
  }
}

module.exports = {
  createWallet() {
    const privKey = getPrivateKey();
    const pubKey = Buffer.from(secp256k1.publicKeyCreate(privKey)).toString(
      "hex"
    );
    const privKeyHex = Buffer.from(privKey).toString("hex");
    let data = {
      privateKey: privKeyHex,
      publicKey: pubKey
    };
    return data;
  }
};
