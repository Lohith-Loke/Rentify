import { Router } from "express";
import bcrypt from "bcrypt";
import path from "path";
import mongoose from "mongoose";
import Credentials from "../../Models/credentials.js";
import isValidEmail from "../../Models/validators/Emailvaliditor.js";
import isValidPassword from "../../Models/validators/Passwordvaidator.js";
import Users from "../../Models/User.js";

const auth = Router();

auth.post("/signup", async (req, res) => {
  const { usermail, password,firstname,lastname,phonenumber } = req.body;

  if (!usermail || !password || !firstname || !lastname || !phonenumber) {
    console.log(usermail, password,firstname,lastname,phonenumber);
    console.log(req.body);
    return res.status(400).json({ message: "Missing details or password" });
  }

  if (!isValidEmail(usermail) || !isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "Invalid usermail or password format" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.saltRounds)
    );
    const cred = await Credentials.create({
      usermail: usermail,
      passwordhash: passwordHash,
    });
    const user=Users.create({firstname:firstname,lastname:lastname,phonenumber:phonenumber,cred:cred})
    console.log(cred.id);
    console.log(user.id);

    await session.commitTransaction();
    session.endSession();

    return res.redirect("/auth")
    // return res.status(201).json({ message: "User creation successful" });
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    console.error("Error during signup:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    } else if (error.name === "MongoServerError") {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Usermail already in use" });
      }
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(500).json({ message: "Oops, something went wrong" });
    }
  }
});

auth.post("/login", async (req, res) => {
  const { usermail, password } = req.body;
  if (!usermail || !password) {
    return res.status(400).json({ message: " Missing usermail or password" });
  }
  if (!isValidEmail(usermail) || !isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "invalid usermail password format" });
  }
  // we have valid usermail and password
  console.log(`usermail:${usermail},password:${password}`);
  try {
    const usercred = await Credentials.findOne({ usermail: usermail }).exec();
    if (usercred) {
      const isvalid = await bcrypt.compare(password, usercred.passwordhash);
      if (isvalid) {
        req.session.user = { usermail: usercred.usermail, uid: usercred.id };
        return res.redirect("/dashboard")
        return res.status(200).send({ message: "password match" });
      } else {
        console.log("failed login->", usercred.usermail);
        return res.status(200).send({ messege: "password incorrect" });
      }
    } else {
      console.log("failed login->", usermail);
      return res
        .status(200)
        .send({ message: "invalid username/password combination" });
    }
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res
        .status(500)
        .json({ message: "intern server error", error: toString(error) });
    }
    console.log(error);
  }

  res.status(500).send({ messege: "oops something went wrong", error: 500 });
});

auth.get("/", (req, res) => {

  res.sendFile(path.join(process.cwd(), "partals", "login.html"));
});
auth.get("/signup", (req, res) => {

  res.sendFile(path.join(process.cwd(), "partals", "signup.html"));
});

export default auth;
