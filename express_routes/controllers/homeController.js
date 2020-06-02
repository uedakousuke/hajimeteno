//ある経路に固有のリクエストを扱う関数を作る
exports.sendReqParam = (req,res) =>{
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`)
};