const port= 3000,
//expressモジュールをアプリケーションに追加
express = require("express"),
//expressアプリケーションをapp定数に代入
app = express();

//ホームページのGET経路を設定
app.get("/",(req,res) =>{
    //サーバーからクライアントへのレスポンスを発行
    res.send("Hello, Universe!");
    console.log(req.params); //requestのパラメータをアクセスする
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
})
//ポート3000を監視するようにアプリケーションを設定
.listen(port,() => {
    console.log(`The Express.js server has started and is listening on port number:`+`${port}`);
});