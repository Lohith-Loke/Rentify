import { Model, Schema, model } from "mongoose";

const credentialSchema = new Schema({
  usermail: { type: String, required: true ,unique:true},
  passwordhash: { type: String, required: true },
  isactive: { type: Boolean, default: true },
});

const Credentials = model("Credential", credentialSchema);

export default Credentials;