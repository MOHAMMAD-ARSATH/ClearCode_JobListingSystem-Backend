const mongoose = require('mongoose');

const Application = require("../model/Application");
const Job = require('../model/Job');

const API_URL = process.env.REACT_APP_API_URL;

// Add a application for job
exports.applyJob = async (req, res) => {
  try {
    const { name, email, contact, gender, address, job } = req.body;

    if (!name || !email || !contact || !address || !req.files?.resume) {
      return res.status(400).json({ message: "All required fields must be provided including resume" });
    }

    if (!mongoose.Types.ObjectId.isValid(job)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const jobDoc = await Job.findById(job);
    if (!jobDoc) {
      return res.status(404).json({ message: "Job not found" });
    }

    const isCloudinary = process.env.USE_CLOUDINARY === 'true';

    const resumeFile = req.files["resume"]?.[0];
    const coverLetterFile = req.files["coverLetter"]?.[0];

    const resume = isCloudinary ? resumeFile?.path : resumeFile?.filename;
    const coverLetter = isCloudinary ? coverLetterFile?.path : coverLetterFile?.filename;

    console.log("Uploaded Files => Resume:", resume, " | Cover Letter:", coverLetter);

    const newApplication = new Application({
      name,
      email,
      contact,
      gender: gender !== "" ? gender : null,
      address,
      resume,
      coverLetter: coverLetter || null,
      jobs: jobDoc._id,
    });

    await newApplication.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("❌ Error submitting application:", error.message, "\nStack Trace:", error.stack);
    res.status(500).json({
      message: "Server error while submitting application",
      error: error.message,
      stack: error.stack
    });
  }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("jobs", "jobId companyName roleName");

    const updatedApplications = applications.map(app => ({
      ...app._doc,
      resume: app.resume ? `${app.resume}` : null,
      coverLetter: app.coverLetter ? `${app.coverLetter}` : null
    }));

    res.json(updatedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};