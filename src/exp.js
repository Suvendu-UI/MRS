import e from "express";
import zod from "zod";
import mongoose, { mongo } from "mongoose";

const us = new mongoose.Schema({
    arr: {
        type: [String],
        require: true
    }
})


const movie = new mongoose.model('movie', us);

movie.create({
    arr: ['Hello']
})


console.log(movie.arr);