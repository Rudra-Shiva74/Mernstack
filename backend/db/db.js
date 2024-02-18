const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/e-comm";
const connectDb = async () => {
    try {
        await mongoose.connect(URL);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb;