//getFileで使うモジュールをインポート
const fs = require("fs"),
httpStatus = require("http-status-codes"),
contentTypes = require("./contentTypes")

//ファイルを読んでレスポンスを返すgetFile関数をエクスポート
module.exports = {
    getFile: (file,res) => {
        fs.readFile(`./${file}`,(error,data) => {
            if(error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
                    contentTypes.html);
                    res.end("There was an error serving content!");
            }
            res.end(data);
        });
    }
};