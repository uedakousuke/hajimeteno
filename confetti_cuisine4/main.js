//expressをロードして、
const express = require("express"),
//expressアプリケーションを実体化する
app = express();
const homeController = require("./controllers/homeController");
//express-ejs-layoutsモジュールをロード
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
//mongooseをロードして
const mongoose = require("mongoose");
mongoose.connect(
    //データベース接続を設定する
    "mongodb://127.0.0.1:27017/confetti_cuisine4",
{useNewUrlParser: true}
);
mongoose.Promise =global.Promise;
//購読者用コントローラーをロードする
const subscribersController = require("./controllers/subscribersController");
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
app.use(express.static("public"));

//すべての購読者を表示するビューへの経路を追加
app.get("/subscribers",subscribersController.getAllSubscribers);
//Contactページを表示するビューへの経路を追加
app.get("/contact",subscribersController.getSubscriptionPage);
//ホームページの経路を作る
app.get("/",(req,res) => {
    res.send("Welcome to Confetti Cuisine!");
});
//コースページと連絡ページと、連絡フォーム送出のために追加
app.get("/courses",homeController.showCourses);
app.get("/contact",homeController.showSignUp);
app.post("/contact",homeController.postedSignUpForm);
//ポストされたフォームを処理するための経路を追加
app.post("/subscribe",subscribersController.saveSubscriber);

//エラー処理用にミドルウェア関数を追加
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
//アプリケーションがポート３０００を監視するように設定
app.listen(app.get("port"),() => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});