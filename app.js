require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const registerRouter = require("./router/registerRouter");
const userRouter = require("./router/userRouter");

const port = process.env.PORT;
const uri = process.env.MONGO_CONNECTION;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// 라우터 사용
app.use("/api", registerRouter);
app.use("/api", userRouter);

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB 연결 성공");
  })
  .catch((err) => {
    console.log("MongoDB 연결 실패 : ", err);
  });

app.listen(port, () => {
  console.log(`server on port ${port}`);
});

module.exports = app;
