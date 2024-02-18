const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: String,
    price: Number,
    categoty: String,
    userid: String,
    company: String
});
const productModel = new mongoose.model("product", Schema);
module.exports = productModel
