const mongoose = require('mongoose');

const Application = require("../model/Application");
const Job = require('../model/Job');

const API_URL = process.env.REACT_APP_API_URL ;

// Add a application for job
exports.applyJob = async (req, res) => {
    try {
      const { name, email, contact, gender, address, job } = req.body;
  
      if (!name || !email || !contact || !address || !req.files?.resume) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(job)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
  
      const jobDoc = await Job.findById(job);
      if (!jobDoc) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      const resumeFile = req.files["resume"]?.[0]?.filename;
      const coverLetterFile = req.files["coverLetter"]?.[0]?.filename;
  
      const newApplication = new Application({
        name,
        email,
        contact,
        gender,
        address,
        resume: `${API_URL}/uploads/${resumeFile}`,
        coverLetter: `${API_URL}/uploads/${coverLetterFile}` || null,
        jobs: jobDoc._id,
      });
  
      await newApplication.save();
  
      res.json({ message: "Application submitted successfully" });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: error.message });
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
