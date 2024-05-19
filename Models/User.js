import mongoose, { Model, Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  cred: { type: mongoose.Types.ObjectId, ref: "Credential" },
  isactive: { type: Boolean, default: true },
});

const Users = model("user", UserSchema);

export default Users;
