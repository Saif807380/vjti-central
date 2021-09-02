const mongoose = require("mongoose");

const transaction = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: true
    },
    studentID: {
      type: Number,
      required: true
    },
    fileID: {
      type: Number,
      required: true
    },
    docHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transaction);

module.exports = Transaction;
