const mongoose = require('mongoose');

const Application = require("../model/Application");
const Job = require('../model/Job');

const API_URL = process.env.REACT_APP_API_URL;

exports.applyJob = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    console.log("FILES RECEIVED:", req.files);
    console.log('RESUME RECEIVED:', req.files.resume);

    const { name, email, contact, gender, address, job } = req.body;

    if (!name || !email || !contact || !address) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!req.files || !req.files.resume || !req.files.resume[0]) {
      return res.status(400).json({ message: "Resume is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(job)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const jobDoc = await Job.findById(job);
    if (!jobDoc) {
      return res.status(404).json({ message: "Job not found" });
    }

    const isCloudinary = process.env.USE_CLOUDINARY === "true";

    const resumeFile = req.files.resume[0];
    const resume = isCloudinary ? resumeFile.path : `${API_URL}/uploads/${resumeFile.filename}`;
    console.log("✔ Resume File Path:", resumeFile.path);

    const coverLetterFile = req.files?.coverLetter?.[0];
    const coverLetter = coverLetterFile
      ? isCloudinary
        ? coverLetterFile.path
        : `${API_URL}uploads/${coverLetterFile.filename}`
      : null;

    const newApplication = new Application({
      name,
      email,
      contact,
      gender: gender != "" ? gender : null,
      address,
      resume,
      coverLetter,
      jobs: jobDoc._id,
    });

    await newApplication.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("❌ Error submitting application:", error.message);
    res.status(500).json({
      message: "Server error while submitting application",
      error: error.message,
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
