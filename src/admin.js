import { Router } from "express";
import signUpRouter from './signup.js';
import loginRouter from "./login.js";

const adminRouter = Router();

adminRouter.use('/signup', signUpRouter);
adminRouter.use('/login', loginRouter);

export default adminRouter;