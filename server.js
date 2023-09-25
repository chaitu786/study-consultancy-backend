const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const { studentsEnquiryRouter } = require("./routes/studentRegistration.routes");
const dotenv = require("dotenv").config();

const app = express();
const server = require('http').Server(app);
app.use(
    cors({
      origin: true,
      credentials: true,
      sameSite: "none",
    })
);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{res.send('hello your study consultancy server is working properly')});
app.use("/",studentsEnquiryRouter)

const PORT = process.env.PORT || 8080;
const url = process.env.MongoAtlas;

server.listen(PORT,()=> { 
  const client = new MongoClient(url);
  client
    .connect()
    .then(() => {
      console.log("connection successful to server");
    })
    .catch((err) => {
      console.log(err, "Failed to connect to server");
    });
  console.log(`Listening on Port ${PORT}`);
})