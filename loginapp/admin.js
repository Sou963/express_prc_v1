const express = require("express");
const ad = express.Router();
const path = require("path");
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://souravbosu844_db_user:6rRjJS8E4oyhmtJm@cluster03.wepgfva.mongodb.net/?appName=Cluster03";
const dbname = "user_info";
const client = new MongoClient(url);
ad.get("/admin", async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/admin.html"));
});

ad.get("/dashboard", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbname);
    const col = db.collection("information");
    const count = await col.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = ad;
