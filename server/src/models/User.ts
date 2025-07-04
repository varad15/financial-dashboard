import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
const user = this as any;
if (!user.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);
next();
});

const User = mongoose.model('User', userSchema);

export default User;  // ✅ This is what was likely missing
