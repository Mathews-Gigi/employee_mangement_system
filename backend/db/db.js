const mongooes = require("mongoose");

const connectDb = async () => {
  try {
    await mongooes.connect(process.env.URL);
    console.log("Db connected sucesfully");
  } catch (error) {
    console.log("Db connection error", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
