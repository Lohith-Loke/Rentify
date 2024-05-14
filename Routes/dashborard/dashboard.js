import { Router } from "express";
import Folderstore from "../../Models/folderstore.js";
import Filestore from "../../Models/filesstore.js";
import path from "path";
const dashpath = Router();

dashpath.get("/", async (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).send({ messege: "unauthorized user" });
  }
  const { usermail, uid } = req.session.user;
  if (usermail && uid) {
    try {
      const foldername = await Folderstore.findOne({ foldername: uid });
      console.log(foldername.files);
      return res.status(200).send({ files: foldername.files });
    } catch (error) {
      console.log(error);
      return res.status(401).send({ files: foldername.files });
    }
  } else {
    return res.status(401).redirect("/auth/login");
  }
});

dashpath.post("/upload", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ messege: "unauthorized user" });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    console.log(req.files);
    return res.status(400).send({ messege: "No files were uploaded" });
  }
  console.log(req.files.samplefile);
  const { usermail, uid } = req.session.user;
  if (usermail && uid) {
    try {
      const foldername = await Folderstore.findOne({ foldername: uid });
      console.log(req.files.samplefile.name);

      const file = await Filestore.create({
        filename: req.files.samplefile.name,
        filesize: req.files.samplefile.size,
      });
      foldername.files.push(file);
      req.files.samplefile.mv(path.join(process.cwd(), "FILESTORE", uid,file.filename));
      return res.status(200).send({ messege:"upload comlete ",uploaded : foldername.files.at(-1).filename });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .send({ messege: "Error occured", files: req.files });
    }
  } else {
    return res.status(401).redirect("/auth/login");
  }
});

export default dashpath;
