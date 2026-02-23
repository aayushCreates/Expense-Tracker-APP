import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import expenseRouter from './routes/expense.routes';

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expenses", expenseRouter);

console.log("process.env.PORT: ",process.env.PORT);

const port = process.env.PORT || 5001;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});