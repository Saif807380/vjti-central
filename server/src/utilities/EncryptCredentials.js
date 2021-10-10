//generates the encrypted string and returns
const crypto = require("crypto");

module.exports = {
  encryptCredentials(data, passphrase) {
    //data is JSON object
    let hash = crypto.createHash("sha1");
    let temp_data = hash.update(passphrase, "utf-8");
    let gen_hash = temp_data.digest().slice(0, 16);
    let cipher = crypto.createCipheriv("aes-128-ecb", gen_hash, "");
    let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }
};
