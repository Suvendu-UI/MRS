import express from "express";
import z from "zod";
import movie from "./schemas/movieSchema.js";


const app = express();

const addMovieRouter = express.Router();

addMovieRouter.post('/', async function(req, res, next){
    const title = req.body.title;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const genre = req.body.genre;
    const description = req.body.description;
    const av = req.body.av;

    const cortitle = z.string().safeParse(title);
    const corstartTime = z.number().safeParse(startTime);
    const corendTime = z.number().safeParse(endTime);
    const corday = z.number().safeParse(day);
    const cormonth = z.number().safeParse(month);
    const coryear = z.number().safeParse(year);
    const corgenre = z.string().safeParse(genre);
    const cordescription = z.string().safeParse(description);
    const corav = z.string().safeParse(av);

    if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav)){
        return res.json({
            msg: "Incorrect choices filled/written"
        })
    }

    const found = await movie.find({
        title,
        
    })

    if(!found){
        const date = new Date();
        if((startTime >= 0 && startTime <= 2400) && (endTime >= 0 && endTime <= 2400) && (endTime >= startTime)){
            if(year >= date.getFullYear()){
                if(month >= date.getMonth() + 1){
                    if(day >= date.getDate()){
                        const created  = await movie.create({
                            title,
                            description,
                            genre,
                            startTime,
                            endTime,
                            av,
                            day,
                            month,
                            year,
                        })

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

    return res.json({
        msg: "Movie already there"
    })

})

export default addMovieRouter;