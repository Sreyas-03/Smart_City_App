const dbConnection = require("mongoose");

console.log("Connecting to DB URL", process.env.MONGO_URL);
dbConnection.connect(process.env.MONGO_URL).then(() => console.log("yay connected to database!"));

module.exports = dbConnection;