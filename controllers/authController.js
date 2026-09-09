const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("Auth/login", {
    pageTitle: "Welcome to Log in Page",
    currentPage: "login",
    isLoggedIn: false,
    user: {},
  });
};

exports.postLogin = async (req, res, next) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("Auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: req.session.isLoggedIn,
      errors: ["user does not exists"],
      oldInput: { email },
      user: {},
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("Auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: req.session.isLoggedIn,
      errors: ["Invalid Password"],
      oldInput: { email },
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = {
    id: user._id.toString(),
    email: user.email,
    userType: user.userType,
  };
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("Auth/signup", {
    pageTitle: "Sign Up",
    currentPage: "signup",
    isLoggedIn: false,
    user: {},
  });
};

exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name can only contain alphabets"),

  check("lastName")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name can only contain alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain at least one number")
    .matches(/[!@#$%^&*(){}?+=_-]/)
    .withMessage("Password should contain at least one special character"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(422).render("Auth/signup", {
        pageTitle: "Sign Up",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array(),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
        },
        user: {},
      });
    }

    // console.log(req.body);

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });
      user
        .save()
        .then(() => {
          res.redirect("/auth/login");
        })
        .catch((err) => {
          // console.log(errors.array());
          return res.status(422).render("Auth/signup", {
            pageTitle: "Sign Up",
            currentPage: "signup",
            isLoggedIn: false,
            errors: errors.array(),
            oldInput: {
              firstName,
              lastName,
              email,
              password,
              userType,
            },
            user: {},
          });
        });
    });
  },
];
