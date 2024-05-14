import mongoose, { Schema, model } from "mongoose";

const folderstoreSchema = new Schema({
  
  foldername: { type: String, required: true },
  isaccess: { type: Boolean, default: true },
  children:[{type: mongoose.Types.ObjectId,ref:"folderstore"}],
  files:[
    {type:mongoose.Types.ObjectId,ref:"filestore"}
  ]
});

const Folderstore= model("folderstore",folderstoreSchema);

export default Folderstore;