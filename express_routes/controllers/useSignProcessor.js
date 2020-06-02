//ある経路に固有のリクエストを扱う関数を作る
exports.postReqParam = (req,res) => {
    let veg = req.params.sign;
    res.send(`Hello world ${veg}`)
};