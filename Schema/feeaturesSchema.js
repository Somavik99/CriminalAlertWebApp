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
  location: {},
  date:{
    type:Date,
    default:Date.now()
    
  }
});
