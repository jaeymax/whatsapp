import express, {Application, NextFunction, Request, Response} from 'express'
import {errorHandler, notFound} from './middlewares/errorHandler'
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';
import dotenv from 'dotenv'
import connectDB from './config/db'


const app:Application = express();
dotenv.config();

//connect to the database
connectDB(process.env.MONGO_URI as string);

//Middewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use(notFound);
app.use(errorHandler)


const PORT = process.env.PORT || 6000;


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
    
})




