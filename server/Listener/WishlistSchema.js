const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
    listnerId: {
    type: String,
    required: true,
  },
  podcastId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creatorsPodcast",
  }
  
});
module.exports = mongoose.model("wishlist", WishlistSchema);
