import mongoose from "mongoose";

export default async function mongodbconnect (){
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGDBURL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      }).catch((err) => console.log(err)).then(()=>{console.log("connected to DB")});
}