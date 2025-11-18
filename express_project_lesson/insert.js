const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");
const show=require('./show')
const remove=require('./delete')
const update=require('./update')
const oneuser=require('./get_one_user')
const url =
  "mongodb+srv://souravbosu844_db_user:6rRjJS8E4oyhmtJm@cluster03.wepgfva.mongodb.net/?appName=Cluster03";
const client = new MongoClient(url);
const dbname = "test";
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//html file
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/form.html"));
});
//post request and insert data
app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  try {
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection("users");
    //insert data
    await collection.insertOne({ username, password });
    console.log("connect is right,data inserted successfully");
    res.status(200).sendFile(path.join(__dirname, "/views/success.html"));
  } catch (err) {
    console.log("error is there", err);
  }
});
app.use('/',show);
app.use('/',remove);
app.use('/',update);
app.use('/',oneuser);
module.exports = app;
