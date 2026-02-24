import { Request, Response, NextFunction } from "express";
import ExpenseServices from "../services/expense.service";

export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, amount, description, expenseDate } = req.body;
    if (!category || !amount || !expenseDate) {
      return res.status(400).json({
        success: false,
        message: "Enter the required fields",
      });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newExpense = await ExpenseServices.addNewExpense(req.user.id, {
      category,
      amount: parseFloat(amount),
      description,
      expenseDate,
    });

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (err) {
    console.error("Add expense Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in adding expense",
    });
  }
};

export const getAllExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const expenses = await ExpenseServices.getAllExpenses(req.user.id);

    return res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    console.error("All expenses Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in fetching expenses",
    });
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params["id"] as string;
    if (!req.user || !id) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const expense = await ExpenseServices.getExpenseById(req.user.id, id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    console.error("Single expense Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in fetching expense",
    });
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, category, amount, description, expenseDate } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Expense ID is required",
      });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updateData: any = {};
    if (category) updateData.category = category;
    if (amount) updateData.amount = parseFloat(amount);
    if (description !== undefined) updateData.description = description;
    if (expenseDate) updateData.expenseDate = expenseDate;

    const updatedExpense = await ExpenseServices.updateExpense(
      req.user.id,
      id,
      updateData
    );

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (err) {
    console.error("Update expense Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in updating expense",
    });
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Expense ID is required",
      });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await ExpenseServices.deleteExpense(req.user.id, id);

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    console.error("Delete expense Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in deleting expense",
    });
  }
};

export const getExpenseSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const summary = await ExpenseServices.getExpensesSummary(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Expense summary fetched successfully",
      data: summary,
    });
  } catch (err) {
    console.error("Expense summary Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in fetching expense summary",
    });
  }
};
