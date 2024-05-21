import mongoose, { Schema, model } from "mongoose";

const rentalSchema = new Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "Credential",require:true },
  addressl1: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  isappartment: { type: String, required: true },
  propertytype: { type: String },
  disttoschool: { type: String },
  disttocollege: { type: String },
  disttometro: { type: String },
  notes: { type: String },
});

const Rentals = model("rental", rentalSchema);

export default Rentals;