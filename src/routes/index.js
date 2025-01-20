import express from 'express';
import mongoose from 'mongoose';

import userRouter from '../user.js';
import adminRouter from '../admin.js';


const rootRouter = express.Router();

try 
{
    await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8').then(console.log("MongoDB connected"));  
} 
catch (error) 
{
    console.log(error);
}


rootRouter.use('/user', userRouter)
rootRouter.use('/admin', adminRouter)

export default rootRouter;