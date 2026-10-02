const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    media: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;