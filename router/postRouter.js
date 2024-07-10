const router = require("express").Router();
const { Post } = require("../models/users");
require("dotenv").config();

router.post("/post", async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      selectedPayment,
      selectPlace,
      selectedKeyword,
      joinedPeople,
      addressName,
      categoryName,
      phone,
      placeName,
      placeUrl,
      roadAddressName,
      x,
      y,
      createAt,
    } = req.body;

    console.log(
      userId,
      title,
      description,
      selectedPayment,
      selectPlace,
      selectedKeyword,
      joinedPeople,
      addressName,
      categoryName,
      phone,
      placeName,
      placeUrl,
      roadAddressName,
      x,
      y,
      createAt
    );

    const newPost = new Post({
      userId: userId,
      title: title,
      description: description,
      selectedPayment: selectedPayment,
      selectPlace: selectPlace,
      selectedKeyword: selectedKeyword,
      joinedPeople: joinedPeople,
      createAt: createAt,
      addressName: addressName,
      categoryName: categoryName,
      phone: phone,
      placeName: placeName,
      placeUrl: placeUrl,
      roadAddressName: roadAddressName,
      x: x,
      y: y,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

module.exports = router;
