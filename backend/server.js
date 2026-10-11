
require("dotenv").config();//loads environment variable from your .env file into process.env

const express = require("express");//imports express to create backend server and http requests.
const cors = require("cors");//Allows react frontend to make requests to backend even when they have different origin
const cookieParser = require("cookie-parser");//parse cookies into req.cookies

const connectDB = require("./config/db");//imports function that establishes the MongoDB connection.

const jobRoutes = require("./routes/JobRoutes");
const matcherRoutes = require("./routes/MatcherRoutes");
const authRoutes = require("./routes/AuthRoutes");

const app = express();

// Middlewares
//1
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

//2
app.use(express.json());//parses incoming json request so controller can access it using req.body.
//3
app.use(cookieParser());

//  registering API routes
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
