const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
    }
}, {
    "collection":"products"
})

module.exports = mongoose.model("products", productSchema);

