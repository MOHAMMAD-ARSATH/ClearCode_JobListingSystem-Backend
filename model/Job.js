const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobId: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    roleName: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobLocation: { type: String, required: true },
    postedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('jobs', jobSchema);