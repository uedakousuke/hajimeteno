//mongooseをロード
const mongoose = require("mongoose"),
//mongoose.Schemaで新しいスキーマを作る
 subscriberSchema = mongoose.Schema({
    name: String, //スキーマのプロパティを追加
    email: String,
    zipCode: Number
});

//Subscriberモデルだけをエクスポートする
module.exports = 
mongoose.model("Subscriber",subscriberSchema);