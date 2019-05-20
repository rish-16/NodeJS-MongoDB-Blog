const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const postsRoute = require("./Routes/posts");
const commentsRoute = require("./Routes/comments");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/new-post", (req, res) => {
  res.sendFile(__dirname + "/public/new_story.html");
});

mongoose
  .connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000);
