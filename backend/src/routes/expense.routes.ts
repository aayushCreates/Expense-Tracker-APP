import { Router } from "express";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import {
  addTransaction,
  allTransactions,
  deleteTransaction,
  transaction,
  updateTransaction,
} from "../controllers/expense.controller";

const expenseRouter = Router();

expenseRouter.get("/", isUserLoggedIn, allTransactions);
expenseRouter.get("/:id", isUserLoggedIn, transaction);
expenseRouter.post("/", isUserLoggedIn, addTransaction);
expenseRouter.patch("/edit", isUserLoggedIn, updateTransaction);
expenseRouter.delete("/remove", isUserLoggedIn, deleteTransaction);

export default expenseRouter;
