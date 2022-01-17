const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://127.0.0.1:27017";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        console.log("connect to database");
        const db = client.db("Registration-Form");
        const collection = db.collection("Students");
        route.use(bodyParser.urlencoded({ extended: false }));
        route.use(bodyParser.json());

        route.get("/registration", (req, res) => {
            res.render("register.ejs");
        });

        route.post("/post", (req, res) => {
            collection
                .insertOne(req.body)
                .then((result) => {
                    res.redirect("/registration");
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        route.get("/details", (req, res) => {
            collection
                .find()
                .toArray()
                .then((result) => {
                    res.render("registerdetails.ejs", { register: result });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    })

    .catch((error) => console.error(error));

module.exports = route;
