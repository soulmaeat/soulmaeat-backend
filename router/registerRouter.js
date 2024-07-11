const router = require("express").Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // 솔트 라운드 수, 더 높을수록 해시는 더 강력하지만 느려집니다.
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

router.post("/register", async (req, res) => {
  try {
    const { email, password, userId, gender, age, introduce, userPreference } =
      req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      userId: userId,
      gender: gender,
      age: age,
      introduce: introduce,
      userPreference: userPreference,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

router.post("/preference/:userId", async (req, res) => {
  try {
    let { userPreference } = req.body;
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
      { userPreference: userPreference },
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
