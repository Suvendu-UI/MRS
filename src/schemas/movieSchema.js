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
    timing: {
        type: [ [ [Number],[Number],[Number],[Number],[Number] ] ]
    },
    // startTime: {
    //     type: String,
    //     require: true,
    // },
    // endTime: {
    //     type: String,
    //     require: true,
    // },
    // av: {
    //     type: Boolean,
    //     require: true,
    //     default: false,
    // },
    // day: {
    //     type: String,
    //     require: true,
    // },
    // month: {
    //     type: String,
    //     require: true,
    // },
    // year: {
    //     type: String,
    //     require: true,
    // },
    // seats: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'seat',
    // },
    // numOfSeats: {
    //     type: Number,
    //     require: true,
    // }
})

const movie = mongoose.model('movie', MovieSchema);

export default movie;