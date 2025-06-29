// @ts-ignore
import { Parser } from 'json2csv';
import Transaction from '../models/Transaction';
import { Request, Response } from 'express';

export const exportTransactions = async (req: Request, res: Response) => {
try {
const { fields } = req.body;

const transactions = await Transaction.find({}).lean();

const parser = new Parser({ fields });
const csv = parser.parse(transactions);

res.header('Content-Type', 'text/csv');
res.attachment('transactions.csv');
res.send(csv);
} catch (err) {
res.status(500).json({ message: 'Failed to export CSV', error: err });
}
};
