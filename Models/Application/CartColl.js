const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required:true
    },
    productName: {
        type: String,
        required:true
    },
    ImgUrl : {
        type: String,
        required:true
    },
    productPrice: {
        type: String,
        required:true
    },
    productDefn : {
        type: String,
        required:true
    },
    productSeller : {
        type: String,
        required:true
    },
   oldPrice : {
        type: String,
        required:true
    },
    category  : {
        type: String,
        required:true
    },
    OrderQty:{
        type: Number,
        required: true
    }
}, {
    "collection":"Cart"
})

module.exports = mongoose.model("Cart", cartSchema);

