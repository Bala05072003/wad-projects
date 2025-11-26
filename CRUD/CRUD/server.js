const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { render } = require("ejs");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/userdb")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("user", userSchema);

app.get("/update/:user_name", (req, res) => {
  const user_name = req.params.user_name;
  res.render(path.join(__dirname, "public", "update.ejs"), { user_name });
});

app.post("/api/create", async (req, res) => {
  const body = req.body;
  const newUser = new User(body);
  try {
    const savedData = await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await User.find();
    res.render(path.join(__dirname, "public", "index.ejs"), {
      users: response,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post("/api/update", async (req, res) => {
  const body = req.body;
  console.log(body);
  const parsedAge = parseInt(body.age);
  try {
    const updateUser = await User.updateOne(
      { user_name: body.user_name },
      { $set: { age: parsedAge } }
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post("/api/delete", async (req, res) => {
  try {
    const user_name = req.body.user_name;
    console.log(user_name);
    const log = await User.deleteOne({ user_name: user_name });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log("Server is Running in 5000");
});
