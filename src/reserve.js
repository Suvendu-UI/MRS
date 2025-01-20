import movie from "./schemas/movieSchema.js";
import e from "express";
import loginRouter from "./login.js";
import user from "./schemas/userSchema.js";
import authenticationMiddleware from "./auth.js";
import seat from "./schemas/seats.js";

const app = e();

const reserveRouter = e.Router();

reserveRouter.use('/manage',authenticationMiddleware,async function(req, res, next){
    const obj = req.body;

    const username = obj.username;
    const password = obj.password;
    const title = obj.title;
    const startTime = obj.startTime;
    const endTime = obj.endTime;
    const day = obj.day;
    const month = obj.month;
    const year = obj.year;
    const numOfSeats = obj.numOfSeats;

    const foundMovie = await movie.findOne({
        title,
        startTime,
        endTime,
        day,
        month,
        year
    })

    const foundUser = await user.findOne({
        username,
        password
    })

    if(!foundUser){
        return res.json({
            msg: "User not registered"
        })
    }

    if(!foundMovie){
        return res.json({
            msg: "Movie not available"
        })
    }

    if(foundMovie.av === true){
        const foundRs = foundMovie.seats.find(foundUser._id)
        if(!foundRs){
            foundMovie.seats.push(foundUser._id)
            res.json({
                msg: " Seat is booked"
            })
        }
    }
})