import express from "express";
import bodyParse from "body-parser";
import router from "./routes";

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use(router);

app.listen(3333, () => console.log("Running on port 3333"));
