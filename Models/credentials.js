import { Model, Schema,model } from "mongoose";

const credentialSchema =new Schema({
    usermail:{type:String,required:true},
    passwordhash: String,
    salt:String,
    isactive:Boolean
});

const Credentials = model("Credential",credentialSchema);

export default Credentials;