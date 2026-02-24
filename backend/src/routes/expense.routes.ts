import { Router } from "express";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  getExpenseById,
  getExpenseSummary,
  updateExpense,
} from "../controllers/expense.controller";

const expenseRouter = Router();

expenseRouter.get("/", isUserLoggedIn, getAllExpenses);
expenseRouter.get("/summary", isUserLoggedIn, getExpenseSummary);
expenseRouter.get("/:id", isUserLoggedIn, getExpenseById);
expenseRouter.post("/", isUserLoggedIn, addExpense);
expenseRouter.patch("/edit", isUserLoggedIn, updateExpense);
expenseRouter.delete("/remove", isUserLoggedIn, deleteExpense);

export default expenseRouter;
