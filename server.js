const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

require("./config/db");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: ["http://localhost:3000", "https://clear-code-jobs.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"] 
}));
app.use(morgan("dev"));

// Routes
const jobRoutes = require("./routes/jobRoute");
app.use("/api/job", jobRoutes);
const applicationRoutes = require("./routes/applicationRoute");
app.use("/api/apply", applicationRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
