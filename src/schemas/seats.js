import mongoose from "mongoose";


const seatSchema = new mongoose.Schema({
    seatid: {
        type: [[mongoose.Schema.Types.ObjectId, [String]]],
    }
})

const seat = mongoose.model('seat', seatSchema);

export default seat;