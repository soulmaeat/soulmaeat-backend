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
    const {
      email,
      password,
      userId,
      gender,
      age,
      userPreference,
      userSoulpay,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      userId: userId,
      gender: gender,
      age: age,
      userPreference: userPreference,
      userSoulpay: userSoulpay,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

module.exports = router;
