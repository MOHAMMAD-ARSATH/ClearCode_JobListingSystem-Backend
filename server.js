const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

require("./config/db");

const app = express();

// ✅ Middleware for non-file routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS and logger
app.use(cors({
  origin: ["http://localhost:3000", "https://clear-code-jobs.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(morgan("dev"));

// ✅ Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
const jobRoutes = require("./routes/jobRoute");
app.use("/api/job", jobRoutes);

// ✅ Apply route handles files — multer used inside
const applicationRoutes = require("./routes/applicationRoute");
app.use("/api/apply", applicationRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
