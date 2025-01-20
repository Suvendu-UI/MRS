import express from "express";
import z from "zod";
import movie from "./schemas/movieSchema.js";
import 


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
    const corstartTime = z.string().safeParse(startTime);
    const corendTime = z.string().safeParse(endTime);
    const corday = z.string().safeParse(day);
    const cormonth = z.string().safeParse(month);
    const coryear = z.string().safeParse(year);
    const corgenre = z.string().safeParse(genre);
    const cordescription = z.string().safeParse(description);
    const corav = z.string().safeParse(av);

    if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav)){
        return res.json({
            msg: "Incorrect choices filled/written"
        })
    }

    const found = await movie.findOne({
        title,
        startTime,
        endTime,
        day,
        month,
        year
    })

    if(!found){
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

    return res.json({
        msg: "Movie already there"
    })

})

export default addMovieRouter;