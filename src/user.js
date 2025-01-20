import  { Router } from "express";

import signUpRouter from './signup.js';
import loginRouter from "./login.js";

const userRouter = Router();

userRouter.use('/signup', signUpRouter);
userRouter.use('/login', loginRouter);

export default userRouter;