import express from "express";
import bodyParser from "body-parser";
import rootRouter from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', rootRouter);

app.listen(3000);