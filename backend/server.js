const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mediaRoutes = require("./routes/mediaRoutes");

const app = express();


// Middleware



app.use(
  cors({
    origin: "https://resume-final-6rvk.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


app.use(express.json());


// Make uploads folder publicly accessible

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// Routes

app.use("/api/media", mediaRoutes);


// MongoDB connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });