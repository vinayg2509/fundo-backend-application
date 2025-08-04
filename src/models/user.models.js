import { model, Schema } from "mongoose";

const userSchema=new Schema(
   {
     firstName:{type:String,required:true,trim:true},
     secondName:{type:String,trim:true},
     email:{type:String,required:true,trim:true,unique:true},
     password:{type:String,required:true},
   },{
    timestamps:true
   }
)
export default model("User",userSchema)