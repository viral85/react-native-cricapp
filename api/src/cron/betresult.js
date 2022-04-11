const cron = require("node-cron");
const Bet = require("../bets/bet.model");
const User = require("../users/user.model");
const Wallet = require("../wallet/wallet.model");
const fetch = require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const betResult = async () => {
  cron.schedule("* * * * *", async function() {
    const pendingResults = await Bet.find({ status: "pending" });
    await Promise.all(
      // Get all bets with status = "pending"
      pendingResults.map(bet => {
        // Get match result
        fetch(
          `https://cricket.sportmonks.com/api/v2.0/fixtures/${bet.match_id}?api_token=${process.env.SPORTMONKS_KEY}`
        ).then(async res => {
          const response = await res.json();

          // Check if bet is win or loss
          if (response.data.winner_team_id === null) {
            console.log("Match Result is pending.");
          } else {
            // Update bet status to success
            await Bet.updateOne({ _id: bet.id }, { status: "success" });

            if (response.data.winner_team_id === bet.beton) {
              // Update the user wallet history
              const transaction = new Wallet({
                transaction_type: "winning",
                amount: bet.amount * 2,
                user: bet.user,
                status: "success"
              });

              await transaction.save(async err => {
                // console.log(err);

                // Get previous balance of user
                const user = await User.findOne({ _id: bet.user });
                const newBalance = user.balance + transaction.amount;

                // Add winning amout to the user
                await User.updateOne(
                  { _id: bet.user },
                  { balance: newBalance }
                );
              });
            }
          }
        });
      })
    );
  });
};

module.exports = betResult;
