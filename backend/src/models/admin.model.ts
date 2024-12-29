import { Pool } from 'pg';
import {DatabaseConnection} from '../database';

const pool: Pool = DatabaseConnection.getConnection();

export const addStudent = async (
    first_name: string,
    last_name: string,
    date_of_birth: string,
    current_academic_year: number,
    email: string,
    major: string,
    enrollment_date: string,
    password: string
): Promise<boolean> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const userResult = await client.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING user_id',
            [email, password, 'student']
        );
        const user_id = userResult.rows[0].user_id;

        await client.query(
            'INSERT INTO students (user_id, first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [user_id, first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, password]
        );

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error adding student:', err);
        return false;
    } finally {
        client.release();
    }
};

export const viewStudents = async (): Promise<{ rows: any[], columns: string[] }> => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM students');
        const rows = result.rows;
        const columns = result.fields.map(field => field.name);
        return { rows, columns };
    } catch (err) {
        console.error('Error fetching students:', err);
        return { rows: [], columns: [] };
    } finally {
        client.release();
    }
};

export const modifyStudent = async (
    student_id: number,
    user_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    current_academic_year: number,
    email: string,
    major: string,
    enrollment_date: string,
    password: string | null
): Promise<boolean> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const currentData = await client.query(
            'SELECT email, password FROM students WHERE student_id = $1',
            [student_id]
        );
        const currentEmail = currentData.rows[0].email;
        const currentPassword = currentData.rows[0].password;

        const newPassword = password || currentPassword;

        await client.query(
            'UPDATE students SET first_name = $1, last_name = $2, date_of_birth = $3, current_academic_year = $4, email = $5, major = $6, enrollment_date = $7, password = $8 WHERE student_id = $9',
            [first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, newPassword, student_id]
        );

        if (email !== currentEmail || (password && password !== currentPassword)) {
            await client.query(
                'UPDATE users SET email = $1, password = $2 WHERE user_id = $3',
                [email, newPassword, user_id]
            );
        }

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error modifying student:', err);
        return false;
    } finally {
        client.release();
    }
};

export const deleteStudent = async (
    student_id: number,
    user_id: number,
    last_name: string
): Promise<boolean> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(
            'DELETE FROM students WHERE student_id = $1 AND last_name = $2 RETURNING student_id',
            [student_id, last_name]
        );

        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return false;
        }

        await client.query('DELETE FROM users WHERE user_id = $1', [user_id]);

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error deleting student:', err);
        return false;
    } finally {
        client.release();
    }
};

export const addTeacher = async (
    first_name: string,
    last_name: string,
    date_of_birth: string,
    email: string,
    enrollment_date: string,
    department: string,
    courses_taught: string,
    password: string
): Promise<boolean> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const userResult = await client.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING user_id',
            [email, password, 'teacher']
        );
        const user_id = userResult.rows[0].user_id;

        await client.query(
            'INSERT INTO teachers (user_id, first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [user_id, first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password]
        );

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error adding teacher:', err);
        return false;
    } finally {
        client.release();
    }
};

export const viewTeachers = async (): Promise<{ rows: any[], columns: string[] }> => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM teachers');
        const rows = result.rows;
        const columns = result.fields.map(field => field.name);
        return { rows, columns };
    } catch (err) {
        console.error('Error fetching teachers:', err);
        return { rows: [], columns: [] };
    } finally {
        client.release();
    }
};

export const modifyTeacher = async (
    teacher_id: number,
    user_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    email: string,
    enrollment_date: string,
    department: string,
    courses_taught: string,
    password: string | null
): Promise<boolean> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const currentData = await client.query(
            'SELECT email, password FROM teachers WHERE teacher_id = $1',
            [teacher_id]
        );
        const currentEmail = currentData.rows[0].email;
        const currentPassword = currentData.rows[0].password;

        const newPassword = password || currentPassword;

        await client.query(
            'UPDATE teachers SET first_name = $1, last_name = $2, date_of_birth = $3, email = $4, enrollment_date = $5, department = $6, courses_taught = $7, password = $8 WHERE teacher_id = $9',
            [first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, newPassword, teacher_id]
        );

        if (email !== currentEmail || (password && password !== currentPassword)) {
            await client.query(
                'UPDATE users SET email = $1, password = $2 WHERE user_id = $3',
                [email, newPassword, user_id]
            );
        }

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error modifying teacher:', err);
        return false;
    } finally {
        client.release();
    }
};

export const deleteTeacher = async (
    teacher_id: number,
    user_id: number,
    last_name: string
): Promise<boolean> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(
            'DELETE FROM teachers WHERE teacher_id = $1 AND last_name = $2 RETURNING teacher_id',
            [teacher_id, last_name]
        );

        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return false;
        }

        await client.query('DELETE FROM users WHERE user_id = $1', [user_id]);

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error deleting teacher:', err);
        return false;
    } finally {
        client.release();
    }
};
