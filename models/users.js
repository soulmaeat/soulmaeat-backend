const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4 } = require("uuid");

const uuid = () => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

const preferenceSchema = new Schema({
  PreferenceList: {
    type: [String],
    default: null,
  },
});

const likeSchema = new Schema({
  likeList: {
    type: [String],
    default: null,
  },
});

const chargeSchema = new Schema({
  payment: {
    type: Number,
    default: null,
  },
  paymentId: {
    type: String,
    default: () => uuid(),
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  userPreference: {
    type: [preferenceSchema],
    default: [],
  },
  userLike: {
    type: [likeSchema],
    default: [],
  },
  userSoulpay: {
    type: [chargeSchema],
    default: [],
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Preference = mongoose.model("preference", preferenceSchema);
const Like = mongoose.model("like", likeSchema);
const Charge = mongoose.model("charge", chargeSchema);

module.exports = { User, Preference, Like, Charge };
