const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  // console.log("Session value ", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home Stay home",
      currentPage: "index",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "my bookings",
    currentPage: "bookings",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      // console.log("home Not Found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-details",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    const userId = req.session.user.id || req.session.user._id;
    const user = await User.findById(userId).populate("favourites");

    if (!user) {
      return res.redirect("/auth/login");
    }

    res.render("store/favourite-list", {
      favouritesHomes: user.favourites || [],
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.postAddToFavourites = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    const homeId = req.body.id;
    const userId = req.session.user.id || req.session.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    const isAlreadyFavourite = user.favourites.some(
      (fav) => fav.toString() === homeId,
    );
    if (!isAlreadyFavourite) {
      user.favourites.push(homeId);
      await user.save();
    }

    res.redirect("/favourites");
  } catch (err) {
    next(err);
  }
};

exports.postDeleteFavourites = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    const homeId = req.params.homeId;
    const userId = req.session.user.id || req.session.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    user.favourites = user.favourites.filter(
      (fav) => fav.toString() !== homeId,
    );
    await user.save();

    res.redirect("/favourites");
  } catch (err) {
    next(err);
  }
};
