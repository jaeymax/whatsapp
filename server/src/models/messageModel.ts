import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   from:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userModel"
   }, 
   to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userModel"    
   },
   body:{
    type:String,
   },
   chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"chatModel"
   }

},{
    timestamps:true,
});


export default mongoose.model('messageModel', messageSchema);