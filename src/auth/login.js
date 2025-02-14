import e from "express";
import user from "../schemas/userSchema.js";
import z from "zod";

import searchRouter from "../user/search.js";
import {
  addMovieRouter,
  removeMovieRouter,
  updateMovieRouter,
} from "../admin/addMovie.js";
import {
  deleteSeatRouter,
  reserveRouter,
  updateSeatRouter,
} from "../user/reserve.js";
import { seeMovieRouter } from "../user/seeMovie.js";

const app = e();
const loginRouter = e.Router();

loginRouter.post("/", async function (req, res, next) {
  console.log("login.js 1");

  const username = req.body.username;
  const password = req.body.password;

  console.log("login.js 2");

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);

  console.log("login.js 3");

  if (!(corusername || corpassword)) {
    return res.json({
      msg: "Incorrect credentials",
    });
  }

  console.log("login.js 4");

  const found = await user.findOne({
    username,
    password,
  });

  console.log("login.js 5");

  if (!found) {
    return res.json({
      msg: "User has not sign-up",
    });
  }

  console.log("login.js 6");

  console.log("User logged in successfully");

  return res.json({
    msg: "User logged in",
  });
});

loginRouter.use("/addMovie", addMovieRouter);
loginRouter.use("/searchMovie", searchRouter);
loginRouter.use("/doReserve", reserveRouter);
loginRouter.use("/removeMovie", removeMovieRouter);
loginRouter.use("/deleteReserve", deleteSeatRouter);
loginRouter.use("/updateReserve", updateSeatRouter);
loginRouter.use("/updateMovie", updateMovieRouter);
loginRouter.use("/seeMovieReserved", seeMovieRouter);

export default loginRouter;
