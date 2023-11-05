import {Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import chatModel from '../models/chatModel';


const getChats = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
      const chats = await chatModel.find({users:{$elemMatch:{$eq:req.user?._id}}}).populate('users', '-password');
      res.status(200).json(chats);
});

const getChat = asyncHandler(async (req:Request, res:Response, next:NextFunction)=>{
     const chatId = req.params.id;
     let chat = await chatModel.findOne({_id:chatId});

     if(!chat){
        res.status(400);
        throw new Error('Chat not found');
     }

     chat = await chat.populate('users', '-password');

     res.status(200).json(chat);
})

const createChat = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
    const {userId} = req.body;
    if(!userId){
        res.status(400);
        throw new Error('user id required');
    }

    let chat = await chatModel.findOne({isGroup:false,$and:[
        {users:{$elemMatch:{$eq:req.user?._id}}},
        {users:{$elemMatch:{$eq:userId}}},
    ]});
    /*.populate('users', '-password').populate('lastMessage');*/

    if(chat){
        chat = await chat.populate('users', '-password');
        res.status(200).json(chat);
    }
    else{
       const chatData = {isGroup:false, users:[req.user?._id, userId]}
       chat = await chatModel.create(chatData);
       chat = await chat.populate('users', '-password');
       res.status(201).json(chat); 
    }

});

export {getChats, getChat, createChat};