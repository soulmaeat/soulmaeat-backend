const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4 } = require("uuid");

const uuid = () => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

const likeSchema = new Schema({
  likeList: {
    type: [String],
    default: [],
  },
});

const postSchema = new Schema({
  postId: {
    type: String,
    default: null,
  },
  author: {
    type: String,
    default: null,
  },
  age: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  selectedPayment: {
    type: String,
    default: null,
  },
  selectPlace: {
    type: String,
    default: null,
  },
  addressName: {
    type: String,
    default: null,
  },
  categoryName: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  placeName: {
    type: String,
    default: null,
  },
  placeUrl: {
    type: String,
    default: null,
  },
  roadAddressName: {
    type: String,
    default: null,
  },
  x: {
    type: String,
    default: null,
  },
  y: {
    type: String,
    default: null,
  },
  joinedPeople: {
    type: Number,
    default: null,
  },
  selectedKeyword: {
    type: [likeSchema],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const preferenceSchema = new Schema({
  PreferenceList: {
    type: [String],
    default: [],
  },
});

const chargeSchema = new Schema({
  payment: {
    type: Number,
    default: 0,
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
  userId: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: null,
  },
  age: {
    type: String,
    default: null,
  },
  introduce: {
    type: String,
    default: null,
  },
  userPreference: {
    type: [preferenceSchema],
    default: [],
  },
  userSoulpay: {
    type: [chargeSchema],
    default: [],
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Preference = mongoose.model("Preference", preferenceSchema);
const Like = mongoose.model("Like", likeSchema);
const Charge = mongoose.model("Charge", chargeSchema);
const Post = mongoose.model("Write", postSchema);

module.exports = { User, Preference, Like, Charge, Post };
