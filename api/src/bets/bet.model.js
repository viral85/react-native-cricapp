const { Schema, model } = require("mongoose");

const betSchema = new Schema(
  {
    match_id: { type: Number, required: true },
    team1: { type: Number, required: true },
    team2: { type: Number, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    beton: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Bet = model("bets", betSchema);

module.exports = Bet;
