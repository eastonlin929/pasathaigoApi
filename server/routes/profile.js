const router = require("express").Router();
const User = require("../models").user;

router.use((req, res, next) => {
  console.log("正在接收一個請求...");
  next();
});
//初次更改暱稱（新增）
router.post("/", async (req, res) => {
  try {
    let { nickname } = req.body;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { nickname });

    return res.json({
      message: "暱稱已成功新增",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法修改暱稱");
  }
});
//更改暱稱
router.patch("/", async (req, res) => {
  try {
    const {
      nickname: { userId, newNickname },
    } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { nickname: newNickname },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "查無此用戶" });
    }

    return res.json({
      message: "暱稱已成功更新",
      updatedUser,
    });
  } catch (e) {
    return res.status(500).send("無法更新暱稱");
  }
});

module.exports = router;
