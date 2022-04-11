const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    team_id: Number,
    name: String,
    code: String,
    image: String,
    country: String,
    national_team: Boolean
  },
  {
    timestamps: true
  }
);

const Team = model("team", teamSchema);

module.exports = Team;
