const mongoose = require("mongoose");
const User = require("./user");

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photo: String,
  description: String,
});

// homeSchema.pre("findOneAndDelete", async function () {
//   console.log("came to pre hook while deleting a home");
//   const homeId = this.getQuery()._id;
//   await favourites.deleteMany({ houseId: homeId });
// });
homeSchema.pre("findOneAndDelete", async function () {
  console.log("came to pre hook while deleting a home");
  const homeId = this.getQuery()._id;
  await User.updateMany({ favourites: homeId }, { $pull: { favourites: homeId } });
});

module.exports = mongoose.model("Home", homeSchema);
