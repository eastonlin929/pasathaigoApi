const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const messageRoute = require("./routes").message;
const authRoute = require("./routes").auth;
const profileRoute = require("./routes").profile;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
//連接到MongoDB
mongoose
  .connect("mongodb://localhost:27017/ThaiDB")
  .then(() => {
    console.log("成功連結到資料庫");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(bodyParser.json());
app.use("/api/messages", messageRoute);
app.use(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);

app.listen(8080, () => {
  console.log("後端伺服器在port 8080上運行...");
});
