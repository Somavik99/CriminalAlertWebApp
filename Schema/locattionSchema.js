const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    timeStamp: { type: Date, default: Date.now },
  },
});

LocationSchema.index({ coordinates: "2dsphere" });
module.exports = mongoose.model("Location", LocationSchema);
