const express = require("express");
const connectDB = require("./config/db");
const api = require("./routes/api");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("views"));
app.use(express.static("public"));
app.use("/api", api);

app.listen(3000, () => console.log("Server running on 3000"));