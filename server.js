const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const { studentsEnquiryRouter } = require("./routes/studentRegistration.routes");
const { mongoServer } = require("./config/mongoServer");
const dotenv = require("dotenv").config();

const app = express();
const server = require('http').Server(app);
const client = new MongoClient(process.env.MongoAtlas);

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


server.listen(process.env.PORT || 8080,()=> {
  mongoServer(client)
  .then(()=>{
    console.log("connection successful to server");
  })
  .catch((err) => {
    console.log(err, "Failed to connect to server");
  })
  .finally(() => client.close());
  console.log(`Listening on Port ${PORT}`);
})