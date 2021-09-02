const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  wallet_id: {
    type: Number,
    required: true
  },
  public_key: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const Wallet = mongoose.model("wallet", WalletSchema);
module.exports = Wallet;
