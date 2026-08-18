exports.error404 = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "Page Not Found",
      currentPage: "404",
      isLoggedIn: req.session.isLoggedIn,
       user : req.session.user,
    });
};
