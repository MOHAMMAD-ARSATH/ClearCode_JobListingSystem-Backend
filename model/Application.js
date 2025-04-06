const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  address: String,
  gender: String,
  resume: String,
  coverLetter: String,
  jobs: { type: mongoose.Schema.Types.ObjectId, ref: "jobs" }, 
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);