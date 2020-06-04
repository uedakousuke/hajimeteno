const express = require("express"),
app = express(),
homeController = require("./controllers/homeController"),
layouts = require("express-ejs-layouts");
app.use(layouts);
app.set("port",process.env.PORT || 3000);
app.set("view engine","ejs")
app.get("/name/:myName",homeController.respondWithName);
app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});