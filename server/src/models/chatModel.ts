import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    isGroup:{
        type:Boolean,
        default:false,
    },
    users:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"userModel",
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messageModel"
    }
},{
    timestamps:true,
});


export default mongoose.model('chatModel', chatSchema);