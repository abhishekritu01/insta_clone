import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

// cors is used to allow requests from different origins to access the resources
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true, // Allow credentials to be included in requests
    allowedHeaders: 'Content-Type,Authorization' // Specify allowed headers
}));

// Parse JSON requests
app.use(express.json({ limit: "30kb" }));

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

// Serve static files from the public folder
app.use(express.static("public"));

// Parse cookies from request headers
app.use(cookieParser());

// Import user routes
import userRouter from "./routes/user.routes.js";

// use of imported routes
app.use("/api/v1/user", userRouter);



export { app };
