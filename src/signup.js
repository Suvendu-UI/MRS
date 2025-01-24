import e from "express";
import user from "./schemas/userSchema.js";
import z from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";

const signUpRouter = e.Router();

signUpRouter.post("/", async function (req, res, next) {
  console.log("signup.js 1");

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const chooseFactor = req.body.chooseFactor;

  console.log("signup.js 2");

  const corusername = z.string().email().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const corfirstName = z.string().safeParse(firstName);
  const corlastName = z.string().safeParse(lastName);

  console.log("signup.js 3");

  if (!(corusername || corpassword || corfirstName || corlastName)) {
    return res.json({
      msg: "Incorrect credentials",
    });
  }

  console.log("signup.js 4");

  const foundUser = await user.findOne({
    username,
    password,
    firstName,
    lastName,
  });

  if (foundUser) {
    return res.json({
      msg: "User has already a account with this username and password",
    });
  }

  let user1 = await user.create({
    firstName,
    lastName,
    username,
    password,
  });

  console.log("signup.js 5");

  const token = jwt.sign(
    {
      username,
      password,
      firstName,
      lastName,
    },
    JWT_SECRET
  );

  console.log("signup.js 6");

  console.log("User created successfully");

  return res.json({
    msg: "profile created successfully",
    token: token,
  });

  next();
});

export default signUpRouter;
