// packages
const express = require("express");
var mongoose = require('mongoose');
const productRouter=require("./src/routers/productRouter");
const favoritesRouter=require("./src/routers/favoritesRouter");

const cors=require('cors');
// app
const app = express();
const hostname = "127.0.0.1";
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to MyApi" });
});


app.use("/products", productRouter);
app.use("/favorites",favoritesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found!" });

});

var mongoDB = 'mongodb://127.0.0.1/storist';
mongoose.connect(mongoDB, 
  {useNewUrlParser: true, useUnifiedTopology: true},
  ()=>{
  console.log('connected to db');
});


app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port} 🚀`);
});