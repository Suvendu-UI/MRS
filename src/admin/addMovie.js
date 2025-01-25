// {
// import express from "express";
// import z from "zod";
// import movie from "./schemas/movieSchema.js";

// const app = express();

// const addMovieRouter = express.Router();
// const removeMovieRouter = express.Router();
// const updateMovieRouter = express.Router();

// addMovieRouter.post('/addMovie', async function(req, res, next){

//     const objBody = req.body;

//     const title =       (objBody.title).trim();
//     const startTime =   (objBody.startTime).trim();
//     const endTime =     (objBody.endTime).trim();
//     const day =         (objBody.day).trim();
//     const month =       (objBody.month).trim();
//     const year =        (objBody.year).trim();
//     const genre =       (objBody.genre).trim();
//     const description = (objBody.description).trim();
//     const av =          (objBody.av).trim();
//     const location =    (objBody.location).trim();

//     const cortitle =        z.string().safeParse(title);
//     const corstartTime =    z.number().safeParse(startTime);
//     const corendTime =      z.number().safeParse(endTime);
//     const corday =          z.number().safeParse(day);
//     const cormonth =        z.number().safeParse(month);
//     const coryear =         z.number().safeParse(year);
//     const corgenre =        z.string().safeParse(genre);
//     const cordescription =  z.string().safeParse(description);
//     const corav =           z.string().safeParse(av);
//     const corlocation =     z.string().safeParse(location);

//     if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav || corlocation)){
//         return res.json({
//             msg: "Incorrect choices filled/written"
//         })
//     }

//     let foundMovie = await movie.find({
//         title,
//         description,
//         genre,
//         location,
//     })

// console.log(foundMovie);

//     if(!foundMovie[0]){

//         const updated = await movie.create({
//             title,
//             description,
//             genre,
//             timing: [],
//             location
//         })

//         foundMovie = await movie.find({
//             title,
//             description,
//             genre
//         })
//         console.log("3333")
//         console.log(foundMovie)

//         const date = new Date();
//         if((startTime >= 0 && startTime <= 2400) && (endTime >= 0 && endTime <= 2400) && (endTime >= startTime)){
//         if(year >= date.getFullYear()){
//         if(month >= date.getMonth() + 1){
//         if(day >= date.getDate()){
//                                 const created = await movie.updateOne({ _id: foundMovie[0]._id }, { $push: { timing : [startTime,endTime,year,month,day] } })

//                                 if(created) {
//                                     return res.json({
//                                         msg: "Movie timings updated successfully"
//                                     })
//                                 }
//                     }
//                 }
//             }
//         }

//         return res.json({
//             msg: "Movie created"
//         })
//     }

//     // const queryArray = [startTime, endTime, year, month, day];

//     // console.log((queryArray))

//     // let found = movie.findOne({
//     //     timing: {
//     //         $all :{  queryArray  }
//     //     }
//     // })

//     // if (found) {
//     //     console.log("Array found!");
//     // } else {
//     //     console.log("Array not found.");
//     // }

//     // if(!found){
//         const date = new Date();
//         if((startTime >= 0 && startTime <= 2400) && (endTime >= 0 && endTime <= 2400) && (endTime >= startTime)){
//         if(year >= date.getFullYear()){
//         if(month >= date.getMonth() + 1){
//         if(day >= date.getDate()){
//                                 const created = await movie.updateOne({ _id: foundMovie[0]._id }, { $push: { timing : [startTime,endTime,year,month,day] } })

//                                 if(created) {
//                                     return res.json({
//                                         msg: "Movie timings updated successfully"
//                                     })
//                                 }
//                     }
//                 }
//             }
//         }
//     // }
//     // else{
//     //     return res.json({
//     //         msg: "Already timing is present"
//     //     })

//     // }

//     return res.json({
//         msg: "Movie already there"
//     })

// })

// removeMovieRouter.get('/removeMovie', async function(req, res){
//     const objBody = req.body;

//     const title =       (objBody.title).trim();
//     const startTime =   (objBody.startTime).trim();
//     const endTime =     (objBody.endTime).trim();
//     const day =         (objBody.day).trim();
//     const month =       (objBody.month).trim();
//     const year =        (objBody.year).trim();
//     const genre =       (objBody.genre).trim();
//     const description = (objBody.description).trim();
//     const av =          (objBody.av).trim();
//     const location =    (objBody.location).trim();

//     const cortitle =        z.string().safeParse(title);
//     const corstartTime =    z.number().safeParse(startTime);
//     const corendTime =      z.number().safeParse(endTime);
//     const corday =          z.number().safeParse(day);
//     const cormonth =        z.number().safeParse(month);
//     const coryear =         z.number().safeParse(year);
//     const corgenre =        z.string().safeParse(genre);
//     const cordescription =  z.string().safeParse(description);
//     const corav =           z.string().safeParse(av);
//     const corlocation =     z.string().safeParse(location);

//     if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav || corlocation)){
//         return res.json({
//             msg: "Incorrect choices filled/written"
//         })
//     }

//     try {
//         let foundMovie = await movie.findOneAndDelete({
//             title,
//             description,
//             genre,
//             location,
//         })

//         return res.json({
//             msg: "removed the movie"
//         })
//     } catch (error) {
//         console.log("Error is in removeMovie", error)
//     }

//     console.log(foundMovie);

//     return res.json({
//         msg: "couldn't removed the movie"
//     })

// })

// updateMovieRouter.post('/updateMovie', async function(req, res, next){
//     const objBody = req.body;

//     const title =       (objBody.title).trim();
//     const startTime =   (objBody.startTime).trim();
//     const endTime =     (objBody.endTime).trim();
//     const day =         (objBody.day).trim();
//     const month =       (objBody.month).trim();
//     const year =        (objBody.year).trim();
//     const genre =       (objBody.genre).trim();
//     const description = (objBody.description).trim();
//     const av =          (objBody.av).trim();
//     const location =    (objBody.location).trim();

//     const cortitle =        z.string().safeParse(title);
//     const corstartTime =    z.number().safeParse(startTime);
//     const corendTime =      z.number().safeParse(endTime);
//     const corday =          z.number().safeParse(day);
//     const cormonth =        z.number().safeParse(month);
//     const coryear =         z.number().safeParse(year);
//     const corgenre =        z.string().safeParse(genre);
//     const cordescription =  z.string().safeParse(description);
//     const corav =           z.string().safeParse(av);
//     const corlocation =     z.string().safeParse(location);

//     if(!(corday || corendTime || cormonth || cortitle || corstartTime || coryear || corgenre || cordescription || corav || corlocation)){
//         return res.json({
//             msg: "Incorrect choices filled/written"
//         })
//     }

//     try {
//         const done = await movie.findOneAndUpdate(
//             {
//                 title,
//                 genre,
//                 description
//             },
//             {
//                 title : "Titanic Part 2"
//             }
//         )

//         return res.json({
//             msg: "Done changes"
//         })
//     } catch (error) {
//         console.log(error)
//     }

//     return res.json({
//         msg: "couldn't done changes"
//     })

// })

// export  { addMovieRouter, removeMovieRouter, updateMovieRouter };

// }

import express from "express";
import z from "zod";
import movie from "../schemas/movieSchema.js";

const app = express();

const addMovieRouter = express.Router();
const removeMovieRouter = express.Router();
const updateMovieRouter = express.Router();

addMovieRouter.post("/", async function (req, res, next) {
  console.log("1");

  const objBody = req.body;

  const title = objBody.title.trim();
  const startTime = objBody.startTime.trim();
  const endTime = objBody.endTime.trim();
  const day = objBody.day.trim();
  const month = objBody.month.trim();
  const year = objBody.year.trim();
  const genre = objBody.genre.trim();
  const description = objBody.description.trim();
  const location = objBody.location.trim();
  const ticketCost = objBody.ticketCost;

  console.log("2");

  const cortitle = z.string().safeParse(title);
  const corstartTime = z.number().safeParse(startTime);
  const corendTime = z.number().safeParse(endTime);
  const corday = z.number().safeParse(day);
  const cormonth = z.number().safeParse(month);
  const coryear = z.number().safeParse(year);
  const corgenre = z.string().safeParse(genre);
  const cordescription = z.string().safeParse(description);
  const corlocation = z.string().safeParse(location);
  const corticketCost = z.string().safeParse(ticketCost);

  console.log("3");

  if (
    !(
      corday ||
      corendTime ||
      cormonth ||
      cortitle ||
      corstartTime ||
      coryear ||
      corgenre ||
      cordescription ||
      corlocation ||
      corticketCost
    )
  ) {
    return res.json({
      msg: "Incorrect choices filled/written",
    });
  }

  console.log("4");

  let foundMovie = await movie.find({
    title,
    description,
    genre,
    location,
    timing: [startTime, endTime, year, month, day],
  });

  console.log("5");

  console.log(typeof foundMovie);

  if (!foundMovie[0]) {
    console.log("3333");
    const date = new Date();
    if (
      startTime >= 0 &&
      startTime <= 2400 &&
      endTime >= 0 &&
      endTime <= 2400 &&
      endTime >= startTime
    ) {
      if (year >= date.getFullYear()) {
        if (month >= date.getMonth() + 1) {
          if (day >= date.getDate()) {
            try {
              const updated = await movie.create({
                title,
                description,
                genre,
                timing: [startTime, endTime, year, month, day],
                location,
                seats: [],
                ticketCost
              });

              return res.json({
                msg: "Movie got created",
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }

    return res.json({
      msg: "Due to some issue it couldn't be created",
    });
  }

  return res.json({
    msg: "Movie already there",
  });
});

removeMovieRouter.post("/", async function (req, res) {
  const objBody = req.body;

  const title = objBody.title.trim();
  const startTime = objBody.startTime.trim();
  const endTime = objBody.endTime.trim();
  const day = objBody.day.trim();
  const month = objBody.month.trim();
  const year = objBody.year.trim();
  const genre = objBody.genre.trim();
  const description = objBody.description.trim();
  
  const location = objBody.location.trim();

  const cortitle = z.string().safeParse(title);
  const corstartTime = z.number().safeParse(startTime);
  const corendTime = z.number().safeParse(endTime);
  const corday = z.number().safeParse(day);
  const cormonth = z.number().safeParse(month);
  const coryear = z.number().safeParse(year);
  const corgenre = z.string().safeParse(genre);
  const cordescription = z.string().safeParse(description);
  
  const corlocation = z.string().safeParse(location);

  if (
    !(
      corday ||
      corendTime ||
      cormonth ||
      cortitle ||
      corstartTime ||
      coryear ||
      corgenre ||
      cordescription ||
  
      corlocation
    )
  ) {
    return res.json({
      msg: "Incorrect choices filled/written",
    });
  }

  let foundMovie = await movie.find({
    title,
    description,
    genre,
    location,
    timing: [startTime, endTime, year, month, day],
  });

  if (!foundMovie[0]) {
    return res.json({
      msg: "Movie is not yet created",
    });
  }

  try {
    let foundMovie = await movie.findOneAndDelete({
      title,
      description,
      genre,
      timing: [startTime, endTime, year, month, day],
      location,
    });

    return res.json({
      msg: "removed the movie",
    });
  } catch (error) {
    console.log("Error is in removeMovie", error);
  }

  console.log(foundMovie);

  return res.json({
    msg: "couldn't removed the movie",
  });
});

updateMovieRouter.post("/", async function (req, res, next) {
  const objBody = req.body;

  const title = objBody.title.trim();
  const startTime = objBody.startTime.trim();
  const endTime = objBody.endTime.trim();
  const day = objBody.day.trim();
  const month = objBody.month.trim();
  const year = objBody.year.trim();
  const genre = objBody.genre.trim();
  const description = objBody.description.trim();
  
  const location = objBody.location.trim();

  const cortitle = z.string().safeParse(title);
  const corstartTime = z.number().safeParse(startTime);
  const corendTime = z.number().safeParse(endTime);
  const corday = z.number().safeParse(day);
  const cormonth = z.number().safeParse(month);
  const coryear = z.number().safeParse(year);
  const corgenre = z.string().safeParse(genre);
  const cordescription = z.string().safeParse(description);
  
  const corlocation = z.string().safeParse(location);

  if (
    !(
      corday ||
      corendTime ||
      cormonth ||
      cortitle ||
      corstartTime ||
      coryear ||
      corgenre ||
      cordescription ||
      corlocation
    )
  ) {
    return res.json({
      msg: "Incorrect choices filled/written",
    });
  }

  let foundMovie = await movie.find({
    title,
    description,
    genre,
    location,
    timing: [startTime, endTime, year, month, day],
  });

  if (!foundMovie[0]) {
    return res.json({
      msg: "Movie is not yet created",
    });
  }

  try {
    const done = await movie.findOneAndUpdate(
      {
        title,
        genre,
        description,
        timing: [startTime, endTime, year, month, day],
      },
      {
        title: "Titanic Part 21",
      }
    );

    return res.json({
      msg: "Done changes",
    });
  } catch (error) {
    console.log(error);
  }

  return res.json({
    msg: "couldn't done changes",
  });
});

export { addMovieRouter, removeMovieRouter, updateMovieRouter };
