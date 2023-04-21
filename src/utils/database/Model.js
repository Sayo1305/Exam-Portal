import mongoose from "mongoose";
const schema = mongoose.Schema;
mongoose.Promise = global.Promise;


const UserSchema = new schema({
      name : {
            type : String,
            required : true,
      },
      email : {
            type : String,
            required : true,
      },
      password : {
            type : String,
            required : true,
      },
      image : {
            type : String,
            required : true,
      }, 
      numberoftest : {
            type : Number,
            default : 0,
      },
      token2 :{
            type : String,
            required : true,
      },
      islogin : {
            type : Boolean,
            default : false,
      },
      timestamp: {
            type: String,
            default: Date.now(),
      },
});


export default mongoose.models.User || mongoose.model("User" , UserSchema);