const Home = require("../models/home");
const fs = require('fs')

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addhome",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
 
  console.log(req.file)
  if(!req.file){
    return res.status(422).send('No image provided')
  }

  const photo =req.file.path
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  console.log(home);
  home.save().then(() => {
    console.log("Home Saved Successfully");
  });
  res.render("host/home-Added", {
    pageTitle: "Home Added SuccessFully",
    currentPage: "addhome",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    console.log(registeredHomes);
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "Host Homes",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      editing: editing,
      pageTitle: "Edit your Home",
      currentPage: "Host Homes",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { houseName, price, location, rating, description, id } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;      
      home.description = description;
      if(req.file){
        fs.unlink(home.photo ,(err)=>{
          if(err){
            console.log('Error while deleting file' ,err)
          }
        })
        home.photo = req.file.path
      }
      home
        .save()
        .then((result) => {
          console.log("Home Updated", result);
        })
        .catch((error) => {
          console.log("Error while  Updating", error);
        });
    })
    .catch((error) => {
      console.log("Error while finding home ", error);
    });

  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("delete this", homeId);
  Home.findOneAndDelete({ _id: homeId }) //  Home.findOneAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting 67", error);
    });
};
