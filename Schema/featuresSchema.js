const mongoose = require("mongoose");
const FeatureSchema = new mongoose.Schema({
  incidentType: {
    type: String,
    required: true,
    enum: [
      "Fire",
      "Accident",
      "Medical Emergency",
      "Natural Disaster",
      "Crime",
      "Other",
    ],
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
    coordinates: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  contactInfo: {
    mobile: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  // setting up the auth

  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});

const featureModel = mongoose.model("Feature", FeatureSchema);
module.exports = featureModel;
