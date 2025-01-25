import movie from "../schemas/movieSchema.js";
import e from "express";
import loginRouter from "../auth/login.js";
import user from "../schemas/userSchema.js";
import z from "zod";
import { SchemaTypes } from "mongoose";
// import authenticationMiddleware from "./auth.js";

const app = e();

const reserveRouter = e.Router();
const deleteSeatRouter = e.Router();
const updateSeatRouter = e.Router();

reserveRouter.post("/", async function (req, res, next) {
  console.log("1");

  const obj = req.body;

  const username = obj.username;
  const password = obj.password;
  const title = obj.title;
  const startTime = obj.startTime;
  const endTime = obj.endTime;
  const day = obj.day;
  const month = obj.month;
  const year = obj.year;
  let seat = obj.seat;
  const location = obj.location;
  const ticketCost = obj.ticketCost;

  console.log("2");

  const corusername = z.string().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const cortitle = z.string().safeParse(title);
  const corstartTime = z.number().safeParse(startTime);
  const corendTime = z.number().safeParse(endTime);
  const corday = z.number().safeParse(day);
  const cormonth = z.number().safeParse(month);
  const coryear = z.number().safeParse(year);
  const corticketCost = z.number().safeParse(ticketCost);

  console.log("3");

  if (
    !(
      corday ||
      corendTime ||
      cormonth ||
      corpassword ||
      corseat ||
      corstartTime ||
      cortitle ||
      corusername ||
      coryear ||
      corticketCost
    )
  ) {
    return res.json({
      msg: "Input is incorrect",
    });
  }

  console.log("4");

  console.log("5");

  let foundMovie = await movie.find({
    title,
    location,
    timing: [startTime, endTime, year, month, day],
  });

  if (!foundMovie[0]) {
    return res.json({
      msg: "Movie is not yet created",
    });
  }

  const foundUser = await user.findOne({
    username,
    password,
  });

  console.log("6");

  if (!foundUser) {
    return res.json({
      msg: "User not registered",
    });
  }

  console.log("7");
  // seat = seat.filter(function(entry) { return entry.trim() != ''; });

  console.log("8");

  const updated = await movie.findOne({
    title,
    timing: [startTime, endTime, year, month, day],
    location,
  });

  if (updated) {
    if (!updated.seats) {
      updated.seats = {
        id: "",
        val: [],
      };
    }

    console.log("2222");
    console.log(updated);
    console.log("2222");

    const foundReservedUser = await movie.findOne({
      title,
      location,
      seats: {
        $elemMatch: {
          id: foundUser._id,
        },
      },
    });

    console.log("333");

    if (foundReservedUser) {
      return res.json({
        msg: "User has already reserved seats",
      });
    }

    console.log("4");

    updated.seats.push({
      id: foundUser._id,
      val: seat,
    });

    console.log("5");

    const sizeo = Number(seat.length);
    const tc = Number(ticketCost);

    console.log(sizeo);
    console.log(tc);

    const fU = await user.findOne({
      username,
      password,
    });

    let amount = sizeo * tc;

    fU.movieReservedByUser.push({
      movieDetails: updated,
      costOfTickets: amount,
    });

    console.log("6");

    await updated.save();
    await fU.save();

    console.log("Seats updated successfully:", updated);
  } else {
    console.log("Movie not found");
  }

  return res.json({
    msg: "Seats reserved",
  });
});

deleteSeatRouter.post("/", async function (req, res) {
  console.log("12");

  const obj = req.body;

  const username = obj.username;
  const password = obj.password;
  const title = obj.title;
  const startTime = obj.startTime;
  const endTime = obj.endTime;
  const day = obj.day;
  const month = obj.month;
  const year = obj.year;
  let seat = obj.seat;
  const location = obj.location;
  const ticketCost = obj.ticketCost;

  console.log("2");

  const corusername = z.string().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const cortitle = z.string().safeParse(title);
  const corstartTime = z.number().safeParse(startTime);
  const corendTime = z.number().safeParse(endTime);
  const corday = z.number().safeParse(day);
  const cormonth = z.number().safeParse(month);
  const coryear = z.number().safeParse(year);
  const corticketCost = z.number().safeParse(ticketCost);

  console.log("3");

  if (
    !(
      corday ||
      corendTime ||
      cormonth ||
      corpassword ||
      corseat ||
      corstartTime ||
      cortitle ||
      corusername ||
      coryear ||
      corticketCost
    )
  ) {
    return res.json({
      msg: "Input is incorrect",
    });
  }

  console.log("4");

  console.log("5");

  let foundMovie = await movie.findOne({
    title,
    location,
    timing: [startTime, endTime, year, month, day],
  });

  console.log(foundMovie);

  if (!foundMovie) {
    return res.json({
      msg: "Movie is not yet created",
    });
  }

  const foundUser = await user.findOne({
    username,
    password,
  });

  console.log("6");

  if (!foundUser) {
    return res.json({
      msg: "User not registered",
    });
  }

  console.log("7");

  let date = new Date();

  if (
    !(
      year >= date.getFullYear() &&
      month >= date.getMonth() + 1 &&
      day >= date.getDate()
    )
  ) {
    return res.json({
      msg: "Movie has already ended started",
    });
  }

  const foundReservedUser = await movie.findOne({
    title,
    location,
    seats: {
      $elemMatch: {
        id: foundUser._id,
      },
    },
  });

  console.log(foundReservedUser);

  if (!foundReservedUser) {
    return res.json({
      msg: "User has not booked",
    });
  }

  const deleteReservation = foundReservedUser.seats.pop({
    id: foundUser._id,
  });

  const updated = await movie.findOne({
    title,
    timing: [startTime, endTime, year, month, day],
    location,
  });

  foundUser.movieReservedByUser.pop({
    movieDetails: updated._id,
  });

  await foundReservedUser.save();
  await foundUser.save();

  console.log(foundReservedUser);

  if (!deleteReservation) {
    return res.json({
      msg: "deleted the user's reserved seats",
    });
  }

  console.log("10");
  return res.json({
    msg: "deleted the user's reserved seats",
  });
});

updateSeatRouter.post("/", async function (req, res) {
  console.log("12");

  const obj = req.body;

  const username = obj.username;
  const password = obj.password;
  const title = obj.title;
  const startTime = obj.startTime;
  const endTime = obj.endTime;
  const day = obj.day;
  const month = obj.month;
  const year = obj.year;
  let seat = obj.seat;
  const location = obj.location;
  const ticketCost = obj.ticketCost;

  console.log("2");

  const corusername = z.string().safeParse(username);
  const corpassword = z.string().safeParse(password);
  const cortitle = z.string().safeParse(title);
  const corstartTime = z.number().safeParse(startTime);
  const corendTime = z.number().safeParse(endTime);
  const corday = z.number().safeParse(day);
  const cormonth = z.number().safeParse(month);
  const coryear = z.number().safeParse(year);
  const corticketCost = z.number().safeParse(ticketCost);

  console.log("3");

  if (
    !(
      corday ||
      corendTime ||
      cormonth ||
      corpassword ||
      corseat ||
      corstartTime ||
      cortitle ||
      corusername ||
      coryear ||
      corticketCost
    )
  ) {
    return res.json({
      msg: "Input is incorrect",
    });
  }

  console.log("4");

  console.log("5");

  let foundMovie = await movie.findOne({
    title,
    location,
    timing: [startTime, endTime, year, month, day],
  });

  console.log(foundMovie);

  if (!foundMovie) {
    return res.json({
      msg: "Movie is not yet created",
    });
  }

  const foundUser = await user.findOne({
    username,
    password,
  });

  console.log("6");

  if (!foundUser) {
    return res.json({
      msg: "User not registered",
    });
  }

  console.log("7");

  const foundReservedUser = await movie.findOne({
    title,
    location,
    seats: {
      $elemMatch: {
        id: foundUser._id,
      },
    },
  });


  const updated = await movie.findOne({
    title,
    timing: [startTime, endTime, year, month, day],
    location,
  });

  if (!foundReservedUser) {
    return res.json({
      msg: "User has no reserved seats",
    });
  }

  const deleteReservation = foundReservedUser.seats.pop({
    id: foundUser._id,
  });

  const updateReservation = foundReservedUser.seats.push({
    id: foundUser._id,
    val: seat,
  });

  foundUser.movieReservedByUser.pop({
    movieDetails: updated._id,
  });

  const sizeo = Number(seat.length);
  const tc = Number(ticketCost);

  console.log(sizeo);
  console.log(tc);

  

  let amount = sizeo * tc;

  foundUser.movieReservedByUser.push({ movieDetails: updated._id, costOfTickets: amount});

  await foundReservedUser.save();
  await foundUser.save();
  await updated.save();

  if (deleteReservation && updateReservation) {
    return res.json({
      msg: "Updated the seats for user",
    });
  }

  return res.json({
    msg: "Sorry mission failed",
  });
});

export { reserveRouter, deleteSeatRouter, updateSeatRouter };