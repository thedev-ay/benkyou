require('dotenv').config();
global.fetch = require('node-fetch');
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(logger('short'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use('/', indexRouter);

export default app;
