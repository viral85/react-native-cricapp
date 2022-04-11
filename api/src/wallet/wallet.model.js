const { Schema, model } = require("mongoose");

//TODO: Transaction type(add, withdrawal, bonus, winning, joined), User, Amount, Status(pending,failed,success)

const walletSchema = new Schema(
  {
    transaction_type: {
      type: String,
      enum: ["addcash", "withdrawal", "bonus", "winning", "joined"],
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "failed", "success"],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Wallet = model("wallet", walletSchema);

module.exports = Wallet;
