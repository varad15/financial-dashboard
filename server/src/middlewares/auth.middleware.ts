import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
return res.status(401).json({ message: 'No token provided' });
}

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET!);
(req as any).user = decoded;
next();
} catch (err) {
res.status(403).json({ message: 'Invalid or expired token' });
}
};
