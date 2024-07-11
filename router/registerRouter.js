const router = require("express").Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // 솔트 라운드 수, 더 높을수록 해시는 더 강력하지만 느려집니다.
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

router.post("/check", async (req, res) => {
  try {
    const { userId } = req.body;

    const id = await User.findOne({
      userId: userId,
    });
    console.log("중복된 아이디:");

    if (id) {
      res.status(404).json({ message: "중복된 아이디입니다." });
    }
    res.status(201).json({ message: "중복되지 않은 아이디입니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, userId, gender, age } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      userId: userId,
      gender: gender,
      age: age,
    });

    const user = await User.findOne({
      email: email,
    });
    console.log("사용자 찾음:", user);

    if (user) {
      res.status(404).json({ message: "중복된 유저입니다." });
    }

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

router.post("/preference/:userId", async (req, res) => {
  try {
    let { userPreference, introduce } = req.body;
    const userId = req.params.userId;

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

module.exports = router;
