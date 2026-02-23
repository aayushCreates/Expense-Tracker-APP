import { Category } from "@prisma/client";
import prisma from "../config/prisma";

interface ExpenseType {
  category: Category;
  amount: number;
  description?: string;
  expenseDate: string;
}

export default class ExpenseServices {
  static async addNewExpense(userId: string, data: ExpenseType) {
    const newExpense = await prisma.expense.create({
      data: {
        category: data.category,
        amount: data.amount,
        description: data.description ?? null,
        expenseDate: new Date(data.expenseDate),
        userId,
      },
    });

    return newExpense;
  }

  static async getAllExpenses(userId: string) {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { expenseDate: "desc" },
    });

    return expenses;
  }

  static async getExpenseById(userId: string, expenseId: string) {
    const expense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId,
      },
    });

    return expense;
  }

  static async updateExpense(
    userId: string,
    expenseId: string,
    data: ExpenseType
  ) {
    const updateData: any = {};
    
    if (data.category) updateData.category = data.category;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.description !== undefined) updateData.description = data.description ?? null;
    if (data.expenseDate) updateData.expenseDate = new Date(data.expenseDate);

    const updatedExpense = await prisma.expense.update({
      where: {
        id: expenseId,
        userId,
      },
      data: updateData,
    });

    return updatedExpense;
  }

  static async deleteExpense(userId: string, expenseId: string) {
    const deletedExpense = await prisma.expense.delete({
      where: {
        id: expenseId,
        userId,
      },
    });

    return deletedExpense;
  }
}
