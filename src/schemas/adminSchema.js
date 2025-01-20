import mongoose, { model } from 'mongoose';
import { string } from 'zod';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    day: {
        type: Number,
        require: true
    },
    month: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
})

const user = mongoose.model('user', UserSchema);

export default user;