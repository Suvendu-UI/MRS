import express from "express";
import z from "zod";
import movie from "./schemas/movieSchema.js";


const app = express();

const addMovieRouter = express.Router();

addMovieRouter.post('/', async function(req, res, next){

    console.log("addMovie.js 1")

    const title = req.body.title;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const genre = req.body.genre;
    const description = req.body.description;
    const av = req.body.av;
    const location = req.body.location;

    console.log("addMovie.js 2")

    const cortitle = z.string().safeParse(title);
    const corstartTime = z.number().safeParse(startTime);
    const corendTime = z.number().safeParse(endTime);
    const corday = z.number().safeParse(day);
    const cormonth = z.number().safeParse(month);
    const coryear = z.number().safeParse(year);
    const corgenre = z.string().safeParse(genre);
    const cordescription = z.string().safeParse(description);
    const corav = z.string().safeParse(av);
    const corlocation = z.string().safeParse(location);

    console.log("addMovie.js 3")

    if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav || corlocation)){
        return res.json({
            msg: "Incorrect choices filled/written"
        })
    }

    console.log("addMovie.js 4")

    const found = await movie.find({
        title,
        timing: {
            $in: [startTime, endTime, year, month, day]
        } ,
        location,
    })

    console.log("addMovie.js 5")

    console.log(found);

    console.log("kasjdfl;ajsdl;kfj");

    if(!found.timing){
        const date = new Date();
        if((startTime >= 0 && startTime <= 2400) && (endTime >= 0 && endTime <= 2400) && (endTime >= startTime)){
            if(year >= date.getFullYear()){
                if(month >= date.getMonth() + 1){
                    if(day >= date.getDate()){
                                const created  = await movie.insertMany({
                                    title,
                                    description,
                                    genre,
                                    $addToSet: {
                                        timing: [ startTime, endTime, year, month, day]
                                    },
                                    location
                                })
                                console.log("addMovie.js 88")
                                if(created) {
                                    return res.json({
                                        msg: "Movie created successfully"
                                    })
                                }
                    }
                }
            }    
        }
    }
    else{

        console.log("addMovie.js 9")

        const updated = await movie.updateOne(
            {_id: found.},
            {
                
                    $push: {
                    time: [startTime, endTime, year, month, day]
                    }
            }
        )



        console.log("addMovie.js 9")
    }


    console.log("addMovie.js 6")




    return res.json({
        msg: "Movie already there"
    })

})

export default addMovieRouter;