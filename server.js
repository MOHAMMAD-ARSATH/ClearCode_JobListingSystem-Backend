const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const jobRoutes = require("./routes/jobRoute");
app.use("/api/job", jobRoutes);
const applicationRoutes = require("./routes/applicationRoute");
app.use("/api/apply", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));