import  { Router } from "express";

import signUpRouter from '../auth/signup.js';
import loginRouter from "../auth/login.js";

const userRouter = Router();

userRouter.use('/signup', signUpRouter);
userRouter.use('/login', loginRouter);

export default userRouter;