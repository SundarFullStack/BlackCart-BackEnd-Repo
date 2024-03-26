const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
        required:true
    },
    TotalPrice:{
        type: String,
        required:true
    },

}, {
    "collection":"Order"
})

module.exports = mongoose.model("Order", OrderSchema);

