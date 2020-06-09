//subscriberモジュールをロードする
const Subscriber = require("../models/subscriber");

//データを次のミドルウェア関数に渡すため、getAllSubscribersをエクスポートする
exports.getAllSubscribers = (req,res) => {
    Subscriber.find({})
    .exec()　//これがfindクエリからプロミスを返す
    //保存したデータが次のthenブロックに送られる
    .then((subscribers) => {
        //データベースからの結果を保存する
        res.render("subscribers", {
            subscribers: subscribers
        });
    })
    //プロミスを破ったエラーをキャッチする
    .catch((error) => {
        console.log(error.message);
        return[];
    })
    //ログメッセージでプロミスの連鎖を終える
    .then(() => {
        console.log("promise complete");
    });
};
//contactページをレンダリングするアクションを追加 
exports.getSubscriptionPage = (req,res) => {
    res.render("contact");
};

//購読者情報を保存するアクションを追加
exports.saveSubscriber = (req,res) => {
    //新しいSubscriberを作成
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    //新しいSubscriberを保存
    newSubscriber.save()
    .then(result => {
        //プロミス
        res.render("thanks");
    })
    .catch(error => {
        if(error)res.send(error);
    });
};