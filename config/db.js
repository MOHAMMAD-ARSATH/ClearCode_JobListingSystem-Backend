const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("✅ MongoDB Connection Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));

module.exports = mongoose;