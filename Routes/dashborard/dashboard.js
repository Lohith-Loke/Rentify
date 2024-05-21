import { Router } from "express";
import path from "path";
import Rentals from "../../Models/Rentals.js";
import Users from "../../Models/User.js";
import Credentials from "../../Models/credentials.js";
import createroute from "./create/create.js";
const dashpath = Router();

const authinication = (req, res, next) => {
  if (!req.session.user) {
    console.log("unaurtized uses redirected");
    return res.redirect("/auth");
  }
  next();
};

dashpath.use(authinication);

dashpath.get("/", async (req, res) => {
  const { usermail, uid } = req.session.user;

  if (req.query) {
    const { query, id } = req.query;
    if (id) {
      const property = await Rentals.findById(req.query.id).exec();
      const ownercred = await Credentials.findById(property.owner).exec();
      const owner = await Users.findById(ownercred.user).exec();
      if (ownercred.id == uid) {
        return res.redirect(`dashboard/create/?params=${property.id}`);
      }
      return res.render("property", { property: property, owner: owner });
    }
    if (query) {
      const serchbycity = await Rentals.find({ city: query });
      return res.render("dashbord", { properties: serchbycity });
    }
  }
  if (usermail && uid) {
    const properties = await Rentals.find();
    return res.render("dashbord", { properties, isowner: false });
  } else {
    return res.redirect("/auth");
  }
});

dashpath.use("/create", createroute);
export default dashpath;
