// Core Module
const path = require("path");
require("dotenv").config();

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const DB_PATH = process.env.DB_PATH;

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authrouter");
const rootDir = require("./utils/pathUtil");
const { error404 } = require("./controllers/error404");
const connectToDatabase = require("./config/database");

const app = express();

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const randomString = (length) => {
  const chracters = "qwertyuiopasdfghjklzxcvbnm";
  let result = "";
  for (i = 0; i < length; i++) {
    result += chracters.charAt(Math.floor(Math.random() * chracters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single("photo"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    secret: "Nishant Bhati as a full stack developer",
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);
app.use((req, res, next) => {
  req.session.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(storeRouter);
app.use("/auth", authRouter);
app.use("/host", (req, res, next) => {
  // if the user is not logged in and and he remember the path where he has to go
  if (req.session.isLoggedIn) {
    // this will check if he is logged in or not and if it is then redirect it to login page
    next();
  } else {
    res.redirect("login");
  }
});
app.use("/host", hostRouter);
app.use(error404);

const PORT = 5009;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error while connecting to Mongo", error.message);
    process.exitCode = 1;
  });
