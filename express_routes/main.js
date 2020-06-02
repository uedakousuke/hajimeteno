const port = 3000;
const homeController = require("./controllers/homeController");
const useSignProcessor = require("./controllers/useSignProcessor");
express = require("express"),
app = express();
//ミドルウェア関数を定義
app.use((req,res,next)=> {
    //リクエストのパスをログに出す
    console.log(`request made to:${req.url}`);
    next(); //next関数を呼び出す
});
// "/items/:vegetable"に向かうGETリクエストを処理する
app.get("/items/:vegetable",homeController.sendReqParam);
app.post("/:sign_up",useSignProcessor.postReqParam);
//URLエンコードされたデータを解析する
app.use(
    express.urlencoded({
        extended:false
    })
);
app.use(express.json());

//ホームページ用に新しいPOST経路を作る
app.post("/",(req,res) =>{
    console.log(req.body);//リクエスト本文をロギング
    console.log(req.query);
    res.send("POST Successful!");
});
app.listen(port,()　=> {
    console.log(`Server running on port: ${port}`);
});