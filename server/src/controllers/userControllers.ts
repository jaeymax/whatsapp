import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
import User from "../models/userModel";
import jwt from 'jsonwebtoken'
import asyncHandler = require("express-async-handler");

//method post

let users = [
    {
     "name":"randomForrest",
     "email":"random@gmail.com",
     "password":"forest"
    },
    {
     "name":"kobby",
     "email":"kyiremcleartus@gmail.com",
     "password":"runaway"
    },
    {
     "name":"kingsley",
     "email":"pappoekingsley@gmail.com",
     "password":"goat"
    },
    {
     "name":"jaeymax",
     "email":"azagojunior@gmail.com",
     "password":"prototype"
    },
    {
      "name":"livingstone",
      "email":"mark@gmail.com",
      "password":"alkastone"  
    },
    {
        "name":"mawuli",
        "email":"morgan@gmail.com",
        "password":"morgan"
    },
]

const registerUser =asyncHandler(async(req:Request, res:Response) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }
     
    let user = await User.findOne({email});

    if(user){
        res.status(409);
        throw new Error('User already exist');
    }

    user = await User.create({name,email,password});

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid User data');
    }
});

const loginUser = asyncHandler(async(req:Request, res:Response) =>{
    const {email, password} = req.body;
     
    if(!email || !password){
        res.status(400);
        throw new Error("Please enter email and password");
    }

    const user = await User.findOne({email});
   
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user._id,
             name:user.name,
             email:user.email,
             token:generateToken(user._id)
        })   
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const getUsers = asyncHandler(async (req:Request, res:Response) =>{
    const filter = req.query.name?{name:{$regex:req.query.name,$options:"i"}}:{}
    const users = await User.find(filter).find({_id:{$ne:req.user._id}}).select('-password');

    res.status(200).json(users);
})

const generateToken = (id:any) =>{
    return jwt.sign({userId:id}, process.env.SECRET as string, {expiresIn:"30d"});
}

const getUser = (req:Request, res:Response) =>{
    res.status(200).json(req.user);
}

export {registerUser, loginUser, getUser, getUsers};
