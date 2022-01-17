const express = require("express");
const app = express();
const routes = require("./routes/route");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + '/public'));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

app.use('/',routes);