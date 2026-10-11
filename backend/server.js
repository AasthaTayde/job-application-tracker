
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const jobRoutes = require("./routes/JobRoutes");
const matcherRoutes = require("./routes/MatcherRoutes");
const authRoutes = require("./routes/AuthRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/matcher", matcherRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Job Tracker API Running");
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before accepting requests
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
