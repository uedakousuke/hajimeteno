//mongooseをロードして
const mongoose = require("mongoose"),
//スキーマのプロパティを定義
subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
});
module.exports = mongoose.model("Subscriber",subscriberSchema);