import mongoose from "mongoose";

const connectDB = async (uri:string) =>{

    try{
        const conn = await mongoose.connect(uri);
        console.log(`Connected to ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }

}

export default connectDB;