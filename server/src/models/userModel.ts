import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { NextFunction } from "express";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a name field']
    },
    email:{
        type:String,
        required:[true, 'Please add an email field']
    },
    image_url:{
        type:String,
        default:'https:xsgames.co/randomusers/avatar.php?g=male'
    },
    password:{
        type:String,
        required:[true, 'Please add a password field']
    }
});


UserSchema.pre('save', async function(next){
     if(!this.isModified('password')){
         next();
     }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.matchPassword = async function(password:string) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model('userModel', UserSchema);