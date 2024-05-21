import { Router } from "express";
import Rentals from "../../../Models/Rentals.js";
import Credentials from "../../../Models/credentials.js";

const createroute = Router();

// createroute.post("", async (req, res) => {
//     const {
//       addressl1,
//       city,
//       state,
//       rate,
//       isappartment,
//       propertytype,
//       disttoschool,
//       disttocollege,
//       disttometro,
//       notes,
//       id
//     } = req.body;
//     console.log(req.body);
//     if (
//       !addressl1 ||
//       !city ||
//       !state ||
//       !rate ||
//       !isappartment ||
//       !propertytype
//     ) {
//       return req.send(400);
//     }
//     try {
//       console.log("id->",id)
//       if (id) {
//         await Rentals.deleteOne({ id: id });
//       }
//       const { usermail, uid } = req.session.user;
//       const cred = await Credentials.findById(uid).populate().exec();
//       const prop=await Rentals.create({
//         addressl1: addressl1,
//         city: city,
//         state: state,
//         isappartment: isappartment,
//         disttoschool: disttoschool,
//         disttocollege: disttocollege,
//         disttometro: disttometro,
//         notes: notes,
//         owner: await Credentials.findById(uid),
//       });
//       console.log(prop);
//       return res.redirect("/dashboard");
//     } catch (error) {
//       return res.status(400);
//     }
//   });

createroute.get("", async (req, res) => {
  let formdata = {
    addressl1: "",
    city: "",
    state: "",
    rate: "",
    isappartment: "no",
    propertytype: "1bhk",
    disttoschool: "",
    disttocollege: "",
    disttometro: "",
    notes: "",
  };
  if (req.query.params) {
    try {
      const property = await Rentals.findById(req.query.params).exec();
      formdata = property.toJSON();
    } catch (error) {
      res.send(500);
    }
  }
  res.render("rentalform", { formdata: formdata });
});

createroute.post("", async (req, res) => {
  const {
    addressl1,
    city,
    state,
    rate,
    isappartment,
    propertytype,
    disttoschool,
    disttocollege,
    disttometro,
    notes,
    id,
  } = req.body;
  console.log(req.body);

  if (
    !addressl1 ||
    !city ||
    !state ||
    !rate ||
    !isappartment ||
    !propertytype
  ) {
    return req.send(400);
  }
  if (String(id)!='') {
    // edit form
    try {
      console.log("updating record",id);
      const rental = await Rentals.findById(id);
      const rentalupate = await rental.updateOne({
        addressl1: addressl1,
        city: city,
        state: state,
        isappartment: isappartment,
        disttoschool: disttoschool,
        disttocollege: disttocollege,
        disttometro: disttometro,
        notes: notes,
      });
      return res.redirect("/dashboard");
    } catch (error) {
      console.log("error:", error);

      return res.sendStatus(500);
    }
  }
  try {
    console.log("creating  record");
    const { usermail, uid } = req.session.user;
    const owner =await Credentials.findById(uid);
    const prop = await Rentals.create({
      addressl1: addressl1,
      city: city,
      state: state,
      isappartment: isappartment,
      disttoschool: disttoschool,
      disttocollege: disttocollege,
      disttometro: disttometro,
      notes: notes,
      owner: owner
    });
    console.log(prop);
    return res.redirect("/dashboard");
  } catch (error) {

    console.log("error:", error);

    return res.status(400);
  }
});

export default createroute;
