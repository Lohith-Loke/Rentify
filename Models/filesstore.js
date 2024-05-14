import { Schema, model } from "mongoose";

const filestoreSchema = new Schema({
  filename: { type: String, required: true },
  filesize: { type: Number, required: true },
  isaccess: { type: Boolean, default: true },
});
const Filestore= model("filestore",filestoreSchema);

export default Filestore;