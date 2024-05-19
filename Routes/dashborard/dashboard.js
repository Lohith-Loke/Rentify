import { Router } from "express";
import path from "path";
import { randomUUID } from "crypto";
const dashpath = Router();

dashpath.get("/", async (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).send({ messege: "unauthorized user" });
  }
  const { usermail, uid } = req.session.user;
  if (usermail && uid) {
    // todo
    res.sendFile(path.join(process.cwd(),"partals","dashbord.html"))
  } else {
    return res.status(401).redirect("/auth/");
  }
});

dashpath.post("/", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ messege: "unauthorized user" });
  }


});

export default dashpath;
