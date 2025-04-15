const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const applicationController = require("../controller/applicationController");

router.post("/", upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 }
]), applicationController.applyJob);

router.get('/applications', applicationController.getAllApplications);

module.exports = router;