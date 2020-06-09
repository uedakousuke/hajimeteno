const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");

//データベース接続の設定
mongoose.connect(
    "mongodb://127.0.0.1:27017/recipe_db",
    {useNewUrlParser:true}
);

mongoose.connection;
var contacts = [
    {
        name:"Jon Wexler",
        email:"jon@jonwexler.com",
        zipCode: 10016
    },
    {
        name: "Chef Eggplant",
        email:"eggplant@recipeapp.com",
        zipCode: 20331
    },
    {
        name: "Professor Souffle",
        email:"souffle@recipeapp.com",
        zipCode:190103
    }
];

//既存のデータを、すべて削除
Subscriber.deleteMany()
.exec()
.then(() => {
    console.log("Subscriber data is empty!");
});

var commands = [];

//Subscriberオブジェクトをループしてプロミスを作る
contacts.forEach(c => {
    commands.push(Subscriber.create({
        name:c.name,
        email:c.email
    }));
});

//プロミス解決後に、ログで解決する
Promise.all(commands)
.then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
})
.catch(error => {
    console.log(`ERROR: ${error}`);
});