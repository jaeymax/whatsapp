import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/userModel";
import asyncHandler from "express-async-handler";


const authMiddleware = asyncHandler(async (req:Request, res:Response, next:NextFunction)=>{
    
    
    if(req.headers?.authorization && req.headers.authorization?.startsWith('Bearer')){
       const token = req.headers.authorization.split(' ')[1]
       const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload ;
       if(decoded){
        const user = await User.findOne({_id:decoded.userId}).select('-password');
        req.user = user;
        next();
       }
       else{
            res.status(401);
           throw new Error('Not authorized invalid token');

       }

    }
    else{
        res.status(401);
        throw new Error('Not authorized no token');
    }
});


export default authMiddleware;