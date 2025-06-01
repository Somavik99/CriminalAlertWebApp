const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


UserSchema.index({ username: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("user",UserSchema)

