import { Router } from "express";
import signUpRouter from '../auth/signup.js';
import loginRouter from "../auth/login.js";

const adminRouter = Router();

adminRouter.use('/signup', signUpRouter);
adminRouter.use('/login', loginRouter);

export default adminRouter;