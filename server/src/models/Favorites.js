const mongoose=require('mongoose');

const FavoritesSchema=mongoose.Schema({

        id : {
          type:Number,
        },
        title: {
          type: String,
          trim: true,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
            type: String,
            required: true,
          },
        userId: {
            type: Number,
            required: true,
        },

}); 

const Favorites = mongoose.model("Favorites", FavoritesSchema);

module.exports = Favorites;