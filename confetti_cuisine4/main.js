//expressをロードして、
const express = require("express")
//MongoDBモジュールをロードする
const MongoDB =require("mongodb").MongoClient,
      dbURL = "mongodb://127.0.0.1:27017",
      dbName = "recipe_db";
      //ローカルデータベースサーバーへの接続を設定
MongoDB.connect(dbURL,(error,client) => {
    if(error) throw error;
    //MongoDBサーバーへの接続から、recipe_dbデータベースを取得
    let db =client.db(dbName);
    // contactsコレクションから全レコードを取り出す
    db.collection("contacts")
    .find()
    .toArray((error,data) => {
        if (error) throw error;
        console.log(data);
        //結果をコンソールにログ出力
    });
    db.collection("contacts").insert(
        {
            name: "Freddie Mercury",
            email: "fred@queen.com"
        },
        (error,db) => {
            if(error)throw error;
            console.log(db);
        }
    );
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
