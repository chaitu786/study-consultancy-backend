const express = require("express");
const cors = require("cors");
const {
  studentsEnquiryRouter,
} = require("./routes/studentRegistration.routes");
const { connectToDatabase } = require("./config/db");
const dotenv = require("dotenv").config();

const app = express();
const server = require("http").Server(app);
const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: true,
    credentials: true,
    sameSite: "none",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello your study consultancy server is working properly");
});
app.use("/", studentsEnquiryRouter);

connectToDatabase();
server.listen(PORT, async () => {
  console.log(`Listening on Port ${PORT}`);
});
