const port = 3000,
express = require("express"),
app = express();
//POSTリクエストをExpress.jsのpostメソッドで処理
app.post("/contact",(req,res) => {
    res.send("Contact information submitted successfully.");
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query)
   })
.listen(port,()=> {
    console.log(`The Express.js server has started and is listening on port number:`+`${port}`);
});