const mongoose = require("mongoose"),
  { USER_DB, PASS_DB, HOST_DB, NAME_DB } = process.env;

let connection,
  connectDB = async () => {
    if (connection) return connection;

    try {
      connection = await mongoose.connect(`mongodb://${HOST_DB}/${NAME_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB connected...");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
    return connection;
  };

module.exports = connectDB;
