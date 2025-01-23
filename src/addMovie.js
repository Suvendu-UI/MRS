import express from "express";
import z from "zod";
import movie from "./schemas/movieSchema.js";


const app = express();

const addMovieRouter = express.Router();

addMovieRouter.post('/', async function(req, res, next){


    const objBody = req.body;
    

    const title =       (objBody.title).trim();
    const startTime =   (objBody.startTime).trim();
    const endTime =     (objBody.endTime).trim();
    const day =         (objBody.day).trim();
    const month =       (objBody.month).trim();
    const year =        (objBody.year).trim();
    const genre =       (objBody.genre).trim();
    const description = (objBody.description).trim();
    const av =          (objBody.av).trim();
    const location =    (objBody.location).trim();

    

    

    const cortitle =        z.string().safeParse(title);
    const corstartTime =    z.number().safeParse(startTime);
    const corendTime =      z.number().safeParse(endTime);
    const corday =          z.number().safeParse(day);
    const cormonth =        z.number().safeParse(month);
    const coryear =         z.number().safeParse(year);
    const corgenre =        z.string().safeParse(genre);
    const cordescription =  z.string().safeParse(description);
    const corav =           z.string().safeParse(av);
    const corlocation =     z.string().safeParse(location);

    

    if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav || corlocation)){
        return res.json({
            msg: "Incorrect choices filled/written"
        })
    }

    

    let foundMovie = await movie.find({
        title,
        description,
        genre
    })

console.log(foundMovie);

    if(!foundMovie[0]){

        const updated = await movie.create({
            title,
            description,
            genre,
            timing: [],
            location
        })

        foundMovie = await movie.find({
            title,
            description,
            genre
        })  
        console.log("3333")
        console.log(foundMovie)

        const date = new Date();
        if((startTime >= 0 && startTime <= 2400) && (endTime >= 0 && endTime <= 2400) && (endTime >= startTime)){
        if(year >= date.getFullYear()){
        if(month >= date.getMonth() + 1){
        if(day >= date.getDate()){
                                const created = await movie.updateOne({ _id: foundMovie[0]._id }, { $push: { timing : [startTime,endTime,year,month,day] } })
                                
                                if(created) {
                                    return res.json({
                                        msg: "Movie timings updated successfully"
                                    })
                                }
                    }
                }
            }    
        }

        return res.json({
            msg: "Movie created"
        })
    }



    // const queryArray = [startTime, endTime, year, month, day];
    
    // console.log((queryArray))

    // let found = movie.findOne({
    //     timing: {
    //         $all :{  queryArray  }
    //     }
    // })
    
    // if (found) {
    //     console.log("Array found!");
    // } else {
    //     console.log("Array not found.");
    // }

    // if(!found){
        const date = new Date();
        if((startTime >= 0 && startTime <= 2400) && (endTime >= 0 && endTime <= 2400) && (endTime >= startTime)){
        if(year >= date.getFullYear()){
        if(month >= date.getMonth() + 1){
        if(day >= date.getDate()){
                                const created = await movie.updateOne({ _id: foundMovie[0]._id }, { $push: { timing : [startTime,endTime,year,month,day] } })
                                
                                if(created) {
                                    return res.json({
                                        msg: "Movie timings updated successfully"
                                    })
                                }
                    }
                }
            }    
        }
    // }
    // else{
    //     return res.json({
    //         msg: "Already timing is present"
    //     })

    // }
    
    return res.json({
        msg: "Movie already there"
    })

})

export default addMovieRouter;