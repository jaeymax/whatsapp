import asyncHandler from "express-async-handler";
import {Request, Response} from 'express';
import messageModel from "../models/messageModel";

const createMessage = async (req:Request, res:Response) =>{
     const messageData = req.body;
     console.log(messageData);
     
     const message = await messageModel.create(messageData);

     if(!message){
        res.status(400);
        throw new Error('Invalid message data');
     }
     else{
        return res.status(201).json(message);
     }
     
}

const getMessages = async (req:Request, res:Response) =>{

    const messages = await messageModel.find({chat:req.query.chatId}).populate('to', '-password').populate('from', '-password');

    res.status(200).json(messages);
}



export {createMessage, getMessages};