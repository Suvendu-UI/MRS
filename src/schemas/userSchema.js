import mongoose, { model } from 'mongoose';
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
    movieReservedByUser: {
        type: [
                new Schema({
                movieDetails: {
                    type: Schema.Types.ObjectId,
                    ref: 'movie'
                },
                costOfTickets: {
                    type: Number,
                    require: true
                }
            })
        ]
    },
    choose: {
        type: Number,
        require: false
    }
})

const user = mongoose.model('user', UserSchema);

export default user;