const port= 3000,
http =require("http"),
httpStatusCodes = require("http-status-codes"),
router = require("./router"),
fs = require("fs"), //fsモジュールをインポート
plainTextContentType = {
    "Content-Type":"text/plain"
},
htmlContentType = {
    "Content-Type":"text/html"
},
//コードの重複を減らすためにreadFile関数をカスタマイズ
customReadFile = (file,res) => {
   fs.readFile(`./${file}`,(errors,data) =>{
       if(errors) {
           console.log("ERROR reading the file...");
       }
       res.end(data);
   });
};

//getとpostで経路を登録する
router.get("/",(req,res) => {
    res.writeHead(httpStatusCodes.OK,plainTextContentType);
    res.end("INDEX");
});

router.get("/index.html",(req,res) => {
    res.writeHead(httpStatusCodes.OK,htmlContentType);
    customReadFile("views/index.html",res);
});

router.post("/",(req,res) => {
    res.writeHead(httpStatusCodes.OK,plainTextContentType);
    res.end("POSTED");
});
//すべてのリクエストをrouter.jsを通じて処理する
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);