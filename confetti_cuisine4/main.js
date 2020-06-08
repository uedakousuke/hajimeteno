//expressをロードして、
const express = require("express")
const mongoose = require("mongoose");
//データベース接続を設定
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    {useNewUrlParser: true}
);
//データベースをdb変数に代入
const db =mongoose.connection;
db.once("open",() => {
    //「Mongooseを使ってMongoDBに接続できました！」
    console.log("Successfully connected to MongoDB using Mongoose!");
});
//新しいSubscriberを実体化する
const Subscriber = require("./models/subscriber");
var myQuery = Subscriber.findOne({
    name:"Jon Wexler"
})
.where("email",/wexler/);
//クエリを実行し、コールバック関数でエラーとデータを処理する
myQuery.exec((error,data) => {
    if(data)console.log(data.name);
});

//expressアプリケーションを実体化する
app = express();
const homeController = require("./controllers/homeController");
//express-ejs-layoutsモジュールをロード
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");

//ejsの使用をアプリケーションに設定
app.set("view engine","ejs");
app.set("port",process.env.PORT || 3000)
//レイアウトモジュールの使用をアプリケーションに設定
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"))

//ホームページの経路を作る
app.get("/",(req,res) => {
    res.send("Welcome to Confetti Cuisine!");
});
//コースページと連絡ページと、連絡フォーム送出のために追加
app.get("/courses",homeController.showCourses);
app.get("/contact",homeController.showSignUp);
app.post("/contact",homeController.postedSignUpForm);

//エラー処理用にミドルウェア関数を追加
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
//アプリケーションがポート３０００を監視するように設定
app.listen(app.get("port"),() => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
