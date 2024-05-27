import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
import userRouter from './routes/user.routes.js';
import { app } from './app.js';

dotenv.config({
    path: "./.env"
});

connectDb().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });

    //  check for the error
    app.on("error", (err) => {
        console.log("Error: ", err);
        throw err;
    });
}).catch((error) => {
    console.log("Mongo connection failed ", error);
    throw error;
});

