const express = require("express");
const multer = require("multer");
const path = require("path");
const Media = require("../models/media");

const router = express.Router();


// ===============================
// MULTER STORAGE
// ===============================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});


// ===============================
// FILE FILTER
// ===============================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/mpeg",
    "video/webm",
    "video/quicktime",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"), false);
  }
};


// ===============================
// MULTER CONFIG
// ===============================

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});


// ===============================
// UPLOAD API
// ===============================

router.post(
  "/upload",
  upload.single("media"),

  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image or video",
        });
      }

      const newMedia = await Media.create({
        title: req.body.title,

        media: `/uploads/${req.file.filename}`,

        mediaType: req.file.mimetype,
      });

      res.status(201).json({
        message: "Media uploaded successfully",

        data: newMedia,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


module.exports = router;