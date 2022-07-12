import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import chalk from "chalk";
import "./utils/setup.js";

import router from "./routers/index.js";
import handlerErrorMiddleware from "./middlewares/handlerErrorMiddleware.js";


const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(handlerErrorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(chalk.bold.cyanBright(`Server is listening on port ${port}!`));
})