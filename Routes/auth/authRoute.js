import express from "express";
import Credentials from "../../Models/credentials.js";
import isValidEmail from "../../Models/validators/Emailvaliditor.js"
import isValidPassword from "../../Models/validators/Passwordvaidator.js"

import bcrypt from "bcrypt";

const auth = express.Router();
auth.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ message: "invalid email password format" });
  }
  // we have valid email and password
  console.log(`email:${email},password:${password}`);
  try {
    const passwordhash = await bcrypt.hash(
      password,
      Number(process.env.saltRounds)
    );
    await Credentials.create({
      usermail: email,
      passwordhash: passwordhash,
    });
    return res.status(300).json({ message: "created user" });
  } catch (error) {
    if (error.name == "MongoServerError") {
      if (error.code == 11000) {
        return res.status(400).json({ message: "email alredy in use" });
      }
      return res
        .status(500)
        .json({ message: "intern server error ", error: toString(error) });
    }
    console.log(error);
  }

  res.status(500).send({ messege: "oops something went wrong", error: 500 });
});

auth.get("/", (req, res) => {
  res.send("auth  page working ");
});

export default auth;