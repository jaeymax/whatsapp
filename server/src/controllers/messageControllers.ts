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
        return res.sendStatus(201);
     }
     
}

const getMessages = async (req:Request, res:Response) =>{
    const {chatId} = req.body;

    const messages = await messageModel.find({chat:chatId});

    res.status(200).json(messages);
}



export {createMessage, getMessages};