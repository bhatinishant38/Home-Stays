// External Modules
const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/login", getLogin);

authRouter.post("/login", postLogin);

authRouter.post("/logout", postLogout);

authRouter.get("/signup", getSignup);

authRouter.post("/signup", postSignup);

module.exports = authRouter;
