// import mongoose, { model } from 'mongoose';
// const { Schema } = mongoose;

// const MovieSchema = new Schema({
//     title: {
//         type: String,
//         require: true,
//     },
//     description: {
//         type: String,
//         require: true,
//     },
//     genre: {
//         type: String,
//         require: true,
//     },
//     timing: {
//         type: [[Number]],
//         validate: {
//             validator: function (v) {
//                 return Array.isArray(v) && v.every(arr => Array.isArray(arr) && arr.length <= 5);
//             },
//             message: "Each element in 'timing' must be an array of exactly 4 numbers."
//         },
//         required: true
//     },
//     location: {
//         type: String,
//         require: true
//     },
//     seats: {
//         type: Schema.Types.ObjectId,
//         ref: 'seat',
//         require: true
//     },
//     ticketCost: {
//         type: Number,
//         require: true
//     }
// })

// const movie = mongoose.model('movie', MovieSchema);

// export default movie;


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
        type: [Number],
        required: true
    },
    location: {
        type: String,
        require: true
    },
    seats:{
        type: [
            Schema({
            id: String,
            val: {
                type: [String],
                require: true
            }
        })
    ]
    },
    ticketCost: {
        type: Number,
        require: true
    },
    revenue: {
        type: Number,
        require: true
    }
})

const movie = mongoose.model('movie', MovieSchema);

export default movie;