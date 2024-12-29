import { DatabaseConnection } from '../database';
import bcrypt from 'bcrypt';

export const getUserByEmail = async (email: string) => {
    const pool = DatabaseConnection.getConnection();
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return password == hashedPassword;
};

