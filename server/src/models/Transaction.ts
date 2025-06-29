import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
user: { type: String, required: true },
date: { type: Date, required: true },
category: { type: String, required: true },
amount: { type: Number, required: true },
type: { type: String, enum: ['income', 'expense'], required: true },
status: { type: String, required: true }
});

export default mongoose.model('Transaction', transactionSchema);
