import e from "express";
import z from "zod";
import user from "../schemas/userSchema.js";
import movie from "../schemas/movieSchema.js";

const app = e();
const seeMovieRouter = e.Router();

seeMovieRouter.post("/", async function (req, res) {
  console.log("signup.js 1");

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;

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

  if (!foundUser) {
    return res.json({
      msg: "User has not yet made the account",
    });
  }

  const movieReserved = foundUser.movieReservedByUser;

  const allReservedMovies = [];

  for (let i = 0; i < movieReserved.length; i++) {
    const movie11 = await movie.findOne({
      _id: movieReserved[i]._id,
    });
    allReservedMovies.push(movie11);
  }

  return res.json({
    msg: "Found the movie list",
    allReservedMovies,
  });
});

export { seeMovieRouter };
