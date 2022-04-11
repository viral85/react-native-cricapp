const Team = require("./team.model");
const fetch = require("isomorphic-fetch");
const mongoose = require("mongoose");

(async () => {
  mongoose.set("useUnifiedTopology", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.connect("mongodb://localhost:27017/cricapp");
  mongoose.connection.on("error", err => {
    console.error(err);
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running."
    );
    process.exit();
  });

  const fetchUrl = `https://cricket.sportmonks.com/api/v2.0/teams?api_token=ArAX5LcbCkLst7I0uqZRiypcFYnXUHbc8JfVefHkqZlAs3vw3TaMx5MP74nW`;
  fetch(fetchUrl).then(async res => {
    const teams = await res.json();
    // console.log(teams.data);
    teams.data.map(team => {
      let teamData = new Team(team);
      teamData["team_id"] = team.id;
      teamData["image"] = team.image_path;
      teamData.save(err => {
        if (err) console.log("Something Went Wrong.");
        console.log("Completed.");
        process.exit();
      });
    });
  });
})();
