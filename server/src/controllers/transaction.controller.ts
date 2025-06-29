import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response) => {
try {
const filters: any = {};
const { category, status, type, minAmount, maxAmount } = req.query;

if (category) filters.category = category;
if (status) filters.status = status;
if (type) filters.type = type;
if (minAmount || maxAmount) {
filters.amount = {};
if (minAmount) filters.amount.$gte = Number(minAmount);
if (maxAmount) filters.amount.$lte = Number(maxAmount);
}

const transactions = await Transaction.find(filters).sort({ date: -1 });
res.json(transactions);
} catch (err) {
res.status(500).json({ message: 'Error fetching transactions', error: err });
}
};

export const getStats = async (req: Request, res: Response) => {
try {
const incomeAgg = await Transaction.aggregate([
{ $match: { type: 'income' } },
{ $group: { _id: null, total: { $sum: '$amount' } } }
]);

const expenseAgg = await Transaction.aggregate([
{ $match: { type: 'expense' } },
{ $group: { _id: null, total: { $sum: '$amount' } } }
]);

const income = incomeAgg[0]?.total || 0;
const expense = expenseAgg[0]?.total || 0;
const balance = income - expense;

res.json({ income, expense, balance });
} catch (err) {
res.status(500).json({ message: 'Error fetching stats', error: err });
}
};
