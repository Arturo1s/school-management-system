import { Request, Response } from 'express';
import { getUserByEmail, verifyPassword } from '../models/auth.model';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Received login request with email:', email, 'and password:', password);
    try {
        const user = await getUserByEmail(email);
        if (user && await verifyPassword(password, user.password)) {
            console.log('Login successful for user:', user.email);
            res.status(200).json({ role: user.role });
        } else {
            console.log('Invalid email or password', await verifyPassword(password, user.password),user.password);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

