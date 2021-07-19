const { ContestData } = require("./model");

const saveToDatabase = async (
  contest_url,
  contest_name,
  contest_date,
  duration,
  start_time,
  website_name
) => {
  try {
    const val = new ContestData({
      contest_url,
      contest_name,
      contest_date,
      duration,
      start_time,
      website_name
    });

    const result = await val.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { saveToDatabase };
