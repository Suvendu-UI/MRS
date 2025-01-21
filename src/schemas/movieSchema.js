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
        type: 
            [
                Number,
                Number,
                Number,
                Number,
                Number
            ]
    },
    location: {
        type: String,
        require: true
    },
    seats: {
        type: Schema.Types.ObjectId,
        ref: 'seats',
        require: true
    }
})

const movie = mongoose.model('movie', MovieSchema);

export default movie;