const router = require("express").Router();
const { Post } = require("../models/users");
require("dotenv").config();

router.post("/post", async (req, res) => {
  try {
    const {
      postId,
      author,
      age,
      gender,
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
      postId,
      author,
      age,
      gender,
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
      postId: postId,
      author: author,
      age: age,
      gender: gender,
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

router.get("/getpost", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("데이터 요청 받음:", {
      email: email,
    });

    const post = await Post.findOne({
      email: email,
    });
    console.log("해당 게시글 찾음:", post);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    const result = {
      post: post,
    };
    console.log("데이터:", result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
