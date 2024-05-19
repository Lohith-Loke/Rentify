import mongoose, { Schema, model } from "mongoose";

const rentalSchema = new Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  addressl1: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  property: { type: String },
});
