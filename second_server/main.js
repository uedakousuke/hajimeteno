const port =3000
const getJSONString = obj => {
    return JSON.stringify(obj,null,2)
};
http = require("http"),
httpStatus = require("http-status-codes"),
app = http.createServer();
//リクエストを監視するリスナ
app.on("request",(req,res) => {
    //リクエストを監視
    var body = [];    //チャンクを格納する配列を作成
    req.on("data",(bodyData) => {
        //そのデータを別のコールバック関数で処理
        body.push(bodyData);    //受信したデータをbody配列に入れる
    });
    
    req.on("end",() => {
        //データ転送の完了時に実行するコード
        body = Buffer.concat(body).toString(); //body配列を文字列テキストに変換
        //リクエストの内容をコンソールにロギングする
        console.log(`Request Body Contents:${body}`);
    });
    //レスポンスを準備
    res.writeHead(httpStatus.OK,{
        "Content-type":"text/html"
    });
    //「このメッセージが画面に現れます」
    let responseMessage = "<h1>This will show on the screen.</h1>";
    //HTMLでレスポンスする
    res.end(responseMessage);
    console.log(`Method:${getJSONString(req.method)}`); //リクエストのHTTPメソッドを見る
    console.log(`URL:${getJSONString(req.url)}`); //リクエストのURLを見る
    console.log(`Headers:${getJSONString(req.headers)}`); //リクエストのヘッダを見る
});

app.listen(port);
//「サーバーが起動しました。監視しているポート番号は：」
console.log(`The server has started and is listening on port number:${port}`);