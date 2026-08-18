// External module
const express = require("express");
const storeRouter = express.Router();

//Local module

const { getHomes ,getBookings, getFavouriteList, getIndex, getHomeDetails, postAddToFavourites, postDeleteFavourites} = require("../controllers/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/homes",getHomes );
storeRouter.get("/bookings", getBookings);

storeRouter.get("/favourites", getFavouriteList);

storeRouter.post("/favourites", postAddToFavourites);

storeRouter.get("/homes/:homeId", getHomeDetails);

storeRouter.post('/host/delete-favourite/:homeId',postDeleteFavourites)


module.exports = storeRouter;
