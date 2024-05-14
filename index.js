import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./Routes/index.js";
import session from "express-session";
import fileUpload from "express-fileupload";
configDotenv();

mongoose.connect(process.env.MONGODBURI).catch(() => {
  console.log("DB connection failed");
});

const app = express();
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded());

const logRequests = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next(); // Call next to proceed to the next middleware or route handler
};

app.use(logRequests);

app.use(
  session({
    secret: process.env.SessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", apiRouter);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("hello word");
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(
    `express is running on http://localhost:${server.address().port}`
  );
});

console.log(" all ok ");
console.log(process.cwd());
