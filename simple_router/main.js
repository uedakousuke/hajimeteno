//経路とレスポンスの対応を定義するマップ
const routeResponseMap = {
    "/info":"<h1>Info Page</h1>",
    "/contact":"<h1>Contact Us</h1>",
    "/about":"<h1>More About Us</h1>",
    "/hello":"<h1>Say hello by emailing us here</h1>",
    "/error":"<h1>Sorry,the page you are looking for is not here"
};
const port = 3000,
//httpとhttp-status-codeのモジュールをロードする
http = require("http"),
httpStatus = require("http-status-codes"),
//requestとresponseのパラメータを指定してサーバーを作成
app = http.createServer((request,response) => {
    response.writeHead(httpStatus.OK,{
        "Content-Type":"text/html"
    });
    //リクエストの経路がマップで定義されているかﾁｪｯｸ
    if(routeResponseMap[request.url])
    {
        response.end(routeResponseMap[request.url]);
    }else {
              //デフォルトのHTMLでレスポンス
              response.end("<h1> Welcome!</h1>");
    }
    setTimeout(() => response.end(routeResponseMap[request.url]),2000);
});
//アプリケーションのサーバーにポート３０００を監視させる
app.listen(port);
//「サーバーが監視して、このポートを監視中：」
console.log(`The server has started and is listening on port number:${port}`);