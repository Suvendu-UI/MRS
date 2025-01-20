import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const MovieSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    startTime: {
        type: String,
        require: true,
    },
    endTime: {
        type: String,
        require: true,
    },
    av: {
        type: Boolean,
        require: true,
        default: false,
    },
    day: {
        type: String,
        require: true,
    },
    month: {
        type: String,
        require: true,
    },
    year: {
        type: String,
        require: true,
    },
    seats: {
        type: Schema,
    },
})

const movie = mongoose.model('movie', MovieSchema);

export default movie;