import express from "express";
import z from "zod";
import movie from "./schemas/movieSchema.js";


const app = express();

const addMovieRouter = express.Router();

addMovieRouter.post('/', async function(req, res, next){

    

    const title = req.body.title;
    const startTime = (req.body.startTime).trim();
    const endTime = (req.body.endTime).trim();
    const day = (req.body.day).trim();
    const month = (req.body.month).trim();
    const year = (req.body.year).trim();
    const genre = (req.body.genre).trim();
    const description = (req.body.description).trim();
    const av = (req.body.av).trim();
    const location = (req.body.location).trim();

    

    

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

    

    if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav || corlocation)){
        return res.json({
            msg: "Incorrect choices filled/written"
        })
    }

    

    const foundMovie = await movie.find({
        title,
        description,
        genre
    })


    
    console.log(foundMovie)
    
    
    console.log(typeof(foundMovie))
    


    if(!foundMovie[0]){

        console.log("addMovie.js 9")

        const updated = await movie.create({
            title,
            description,
            genre,
            timing: [],
            location
        })

        return res.json({
            msg: "Movie created"
        })
    }

    let found;

    console.log(foundMovie[0].timing)

    const queryArray = [startTime, endTime, year, month, day];


    found = movie.findOne({
        timing: {
            $elemMatch: { $eq: queryArray }
        }
    })
    
    console.log(!found)

    if(!found){
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
    }
    else{
        return res.json({
            msg: "Already timing is present"
        })
    }
    
    return res.json({
        msg: "Movie already there"
    })

})

export default addMovieRouter;