import e from "express";
import user from "./userSchema";
import movie from "./movieSchema";
import mongoose from "mongoose";


const seatSchema = new mongoose.Schema({
    seatid: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },
    numOfSeats: {
        type: Number,
        require: true,
    }
})

const seat = mongoose.model('seat', seatSchema);

export default seat;