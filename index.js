const express = require("express");
const cors = require("cors");

const app = express();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middleware/authenticate.middleware");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Social Media App");
});

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the Mongo Atlas Database..");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server running at port ${process.env.port}`);
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2M1MWNiYWVhMDIxYjFlNzc4YTZmY2EiLCJpYXQiOjE2NzM4NjQwMDN9.Bompg8PQ08x-L4HgmifheaciXBUTQS2cbd-BUDf1M88
