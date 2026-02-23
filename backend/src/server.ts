import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.routes';

const app = express();
dotenv.config();

cors({
    origin: "http://localhost:3000"
});

app.use("/api/v1/auth", authRouter);


const port = process.env.PORT;
app.listen(port, ()=> {

});