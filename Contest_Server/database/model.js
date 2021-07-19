const mongoose = require("mongoose");

const DATABASE_NAME = "";
const PASSWORD = "";

mongoose
  .connect(
    `mongodb+srv://root:${PASSWORD}@cluster0.2ido4.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Database sucessfully connected !!!"));

  const contest_data = new mongoose.Schema({

        contest_url:{type:String},
        contest_name:{type:String},
        contest_date:{type:String},
        duration:{type:String},
        start_time:{type:String},
        website_name:{type:String}
  
    });

  const ContestData = new mongoose.model("ContestData", contest_data);
  module.exports = { ContestData };
