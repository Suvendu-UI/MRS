import authenticationMiddleware from "../auth/auth.js";
import movie from "../schemas/movieSchema.js";
import e from "express";
import z from "zod";
import user from "../schemas/userSchema.js";

const app = e();

const searchRouter = e.Router();

searchRouter.post("/", async function (req, res, next) {
  console.log("search.js 1");

  const title = req.body.title;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const genre = req.body.genre;
  const username = req.body.username;
  const password = req.body.password;
  const description = req.body.description;

  console.log("search.js 2");

  const cortitle = z.string().safeParse(title);
  const corstartTime = z.string().safeParse(startTime);
  const corendTime = z.string().safeParse(endTime);
  const corday = z.string().safeParse(day);
  const cormonth = z.string().safeParse(month);
  const coryear = z.string().safeParse(year);
  const corgenre = z.string().safeParse(genre);
  const corusername = z.string().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const cordescription = z.string().safeParse(description);

  console.log("search.js 3");

  if (!(cortitle || corgenre || corusername || corpassword || cordescription)) {
    return res.json({
      msg: "Incorrect choices filled/written",
    });
  }

  console.log("search.js 4");

  const foundUser = await user.findOne({
    username,
    password,
  });

  if (!foundUser) {
    res.json({
      msg: "User has no account in the website",
    });
  }

  const found = await movie.findOne({
    title,
    genre,
    description,
    timing: [startTime, endTime, year, month, day],
  });

  console.log("search.js 5");

  if (!found) {
    return res.json({
      msg: "Movie not available",
    });
  }

  console.log("search.js 6");

  // console.log(foundUser);
  // const arr = found.seats;
  // arr.push(foundUser._id);
  // console.log(arr);
  return res.json({
    msg: "Movie found",
    found,
  });
});

export default searchRouter;
