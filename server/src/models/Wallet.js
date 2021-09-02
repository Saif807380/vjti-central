const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  publicKey: {
    type: String,
    required: true
  }
});

const Wallet = mongoose.model("wallet", WalletSchema);
module.exports = Wallet;
