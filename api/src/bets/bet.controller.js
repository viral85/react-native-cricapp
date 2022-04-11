const Bet = require("./bet.model");
const User = require("../users/user.model");
const Wallet = require("../wallet/wallet.model");
const Team = require("../seeders/team.model");
const { joiErrors, mongooseErrors } = require("../utils/errors");
const { ExtractJwt } = require("passport-jwt");
const fetch = require("isomorphic-fetch");

/**
 * POST /bet
 * Header Bearer Token
 * Places bet on the team.
 */
exports.placeBet = async (req, res) => {
  const betInfo = {
    team1: req.body.team1,
    team2: req.body.team2,
    date: req.body.date,
    amount: req.body.amount,
    beton: req.body.beton,
    match_id: req.body.match_id,
    user: req.user,
    status: "pending"
  };

  const currentDateTime = new Date();

  // Check if match is already started.
  if (new Date(betInfo.date) < currentDateTime) {
    return res.status(200).json({
      success: false,
      message: "Match already started you can't bet now."
    });
  }

  const bet = new Bet(betInfo);

  const user = await User.findById(req.user.id);
  const oldBalance = user.balance;

  if (oldBalance < betInfo.amount) {
    return res.status(200).json({
      success: false,
      message: "You don't have enough cash. Please recharge your wallet."
    });
  }

  // Create transaction in wallet

  const transaction = new Wallet({
    transaction_type: "joined",
    amount: betInfo.amount,
    user: req.user,
    status: "success"
  });

  const addTransaction = await transaction.save();

  if (!addTransaction) {
    return res.status(400).json({ message: "Error occured." });
  }

  const newBalance = oldBalance - betInfo.amount;

  await User.updateOne({ balance: newBalance });

  bet.save(err => {
    if (err) {
      return res.status(200).json({
        success: false,
        message: "Error Occured",
        errors: mongooseErrors(err)
      });
    }

    return res.status(201).json({
      success: true,
      message: "Bet placed successfully",
      bet: bet,
      balance: newBalance
    });
  });
};

/**
 * GET /bet
 * Header Bearer Token
 * List bets of user.
 */
exports.getBets = async (req, res) => {
  let bets = await Bet.find({ user: req.user.id })
    .sort("field -createdAt")
    .lean();

  await Promise.all(
    bets.map(async bet => {
      const fetchUrl = `https://cricket.sportmonks.com/api/v2.0/fixtures/${bet.match_id}?api_token=ArAX5LcbCkLst7I0uqZRiypcFYnXUHbc8JfVefHkqZlAs3vw3TaMx5MP74nW&include=localteam,visitorteam`;
      const res = await fetch(fetchUrl);
      const match = await res.json();
      bet.match = match.data;
    })
  );

  return res.status(200).json({
    success: true,
    message: "Bets Found.",
    bets: bets
  });
};

/**
 * GET /bet/match/id
 * Header Bearer Token
 * List bets of user for a match.
 */

exports.getBetsByMatch = async (req, res) => {
  const bets = await Bet.find({
    user: req.user.id,
    match_id: req.params.match_id
  }).sort({ createdAt: "desc" });
  return res.status(200).json({
    success: true,
    message: "Bets Found.",
    bets: bets
  });
};
