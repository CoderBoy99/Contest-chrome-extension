const express = require("express");
const app = express();
const cron = require("node-cron");
const cors = require("cors");
const { ContestData } = require("./database/model");
const { getDataFromDatabase } = require("./database/getDataFromDatabase");
const { saveToDatabase } = require("./saveToDatabase");
const { getCodechefPromise } = require("./scripts/codeChef");
const { getCodeforcesPromise } = require("./scripts/codeForces");
const { getleetCodePromise } = require("./scripts/leetCode");

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.use(
  cors({
    origin: "*",
  })
);

  cron.schedule("30 3 * * *", async() => {

    ContestData.deleteMany()
      .then(() => {
        console.log("Data Deleted");
      })
      .catch((err) => {
        console.log("Error occur in deleting data");
      });

  var contest_url, contest_name, contest_date, duration, start_time,website_name;

  Promise.all([
    getCodechefPromise(),
    getCodeforcesPromise(),
    getleetCodePromise(),
  ])
    .then((values) => {
        
      for (var i = 0; i < 3; i++) {
        contest_details = values[i];
        contest_url = contest_details["contest_url"];
        contest_name = contest_details["contest_name"];
        contest_date = contest_details["contest_date"];
        duration = contest_details["duration"];
        start_time = contest_details["start_time"];
        website_name = contest_details["website_name"]
        saveToDatabase(
          contest_url,
          contest_name,
          contest_date,
          duration,
          start_time,
          website_name
        );
      }
    })
    .catch((err) => {
      console.log(err.message);
    });

  console.log("Running update...");

  
},{
   scheduled: true,
   timezone:"Asia/Kolkata"
});

app.get("/getData", async (req, res) => {
  const data = await getDataFromDatabase();

  console.log("Asking for data...");

  res.json(data);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
