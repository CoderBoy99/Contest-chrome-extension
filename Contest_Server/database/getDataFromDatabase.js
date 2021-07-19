const { ContestData } = require("./model");

const getDataFromDatabase = async () => {

  const result = await ContestData.find();
  console.log(result);
  return result;

};

module.exports = {getDataFromDatabase};