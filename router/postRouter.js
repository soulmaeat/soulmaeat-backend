const router = require("express").Router();
const { Post } = require("../models/users");
require("dotenv").config();

router.put("/receipt/:postId", async (req, res) => {
  try {
    let { userPreference, introduce } = req.body;
    const userId = req.params.postId;

    // userPreference가 문자열 배열인 경우 이를 적절한 형식으로 변환
    if (
      Array.isArray(userPreference) &&
      userPreference.every((item) => typeof item === "string")
    ) {
      userPreference = [{ PreferenceList: userPreference }];
    } else if (typeof userPreference === "string") {
      userPreference = [{ PreferenceList: [userPreference] }];
    } else {
      return res
        .status(400)
        .json({ error: "잘못된 userPreference 형식입니다." });
    }

    console.log(userPreference, userId);

    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { userPreference: userPreference, introduce: introduce },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

router.post("/post", async (req, res) => {
  try {
    const {
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
    const { postId } = req.params;
    console.log("데이터 요청 받음:", {
      postId: postId,
    });

    const post = await Post.findOne({
      postId: postId,
    });
    console.log("해당 게시글 찾음:", postId);

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

router.get("/posts", async (req, res) => {
  try {
    // 모든 게시글 데이터 조회
    const posts = await Post.find({});
    console.log("모든 게시글 조회 완료:", posts);

    res.status(200).json({ posts });
  } catch (error) {
    console.error("게시글 조회 중 오류 발생:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
