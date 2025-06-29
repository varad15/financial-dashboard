import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Transaction from '../models/Transaction';


const run = async () => {
await mongoose.connect(process.env.MONGO_URI!);

await Transaction.deleteMany({});

await Transaction.insertMany([
{
user: 'john@example.com',
date: new Date('2025-06-20'),
category: 'Salary',
amount: 5000,
type: 'income',
status: 'completed'
},
{
user: 'john@example.com',
date: new Date('2025-06-21'),
category: 'Groceries',
amount: 800,
type: 'expense',
status: 'completed'
},
{
user: 'john@example.com',
date: new Date('2025-06-22'),
category: 'Investment',
amount: 2000,
type: 'income',
status: 'pending'
},
{
user: 'john@example.com',
date: new Date('2025-06-23'),
category: 'Rent',
amount: 1200,
type: 'expense',
status: 'completed'
}
]);

console.log('✅ Sample transactions inserted!');
process.exit();
};

run();
