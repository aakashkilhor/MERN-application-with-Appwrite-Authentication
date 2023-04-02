const Client = require("appwrite")
require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDB();
app.use("/", todoRoutes);

module.exports = app;


// const client = new Client();

// client
//     .setEndpoint('http://localhost/v1')
//     .setProject('642016d52afec2866e77');