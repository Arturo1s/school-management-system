import { Pool } from 'pg';
import {DatabaseConnection} from '../database';

const pool: Pool = DatabaseConnection.getConnection();

export const getStudentPersonalInfo = async (user_id: number): Promise<any | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM students WHERE user_id = $1',
            [user_id]
        );
        return result.rows[0] || null;
    } catch (err) {
        console.error('Error fetching student personal info:', err);
        return null;
    } finally {
        client.release();
    }
};

export const getStudentIdByUserId = async (user_id: number): Promise<number | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT student_id FROM students WHERE user_id = $1',
            [user_id]
        );
        return result.rows[0]?.student_id || null;
    } catch (err) {
        console.error('Error fetching student ID:', err);
        return null;
    } finally {
        client.release();
    }
};

export const getStudentCourses = async (student_id: number): Promise<any[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT
        c.course_name,
        c.description,
        c.credit_hours,
        t.first_name || ' ' || t.last_name AS teacher_name,
        c.day_of_week,
        c.start_time,
        c.end_time,
        c.semester
      FROM
        student_courses sc
      INNER JOIN
        courses c ON sc.course_id = c.course_id
      INNER JOIN
        teachers t ON c.teacher_id = t.teacher_id
      WHERE
        sc.student_id = $1`,
            [student_id]
        );
        return result.rows;
    } catch (err) {
        console.error('Error fetching student courses:', err);
        return [];
    } finally {
        client.release();
    }
};

export const getGradeForCourse = async (student_id: number, course_name: string): Promise<any | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT
        g.grade,
        t.first_name || ' ' || t.last_name AS teacher_name,
        c.credit_hours,
        c.semester
      FROM
        grades g
      INNER JOIN
        courses c ON g.course_id = c.course_id
      INNER JOIN
        teachers t ON g.teacher_id = t.teacher_id
      WHERE
        g.student_id = $1 AND c.course_name = $2`,
            [student_id, course_name]
        );
        return result.rows[0] || null;
    } catch (err) {
        console.error('Error fetching grade for course:', err);
        return null;
    } finally {
        client.release();
    }
};

export const getAttendanceForCourse = async (student_id: number, course_name: string): Promise<any | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT
        a.is_present,
        a.marked_at
      FROM
        attendance a
      INNER JOIN
        courses c ON a.course_id = c.course_id
      WHERE
        a.student_id = $1 AND c.course_name = $2`,
            [student_id, course_name]
        );
        return result.rows[0] || null;
    } catch (err) {
        console.error('Error fetching attendance for course:', err);
        return null;
    } finally {
        client.release();
    }
};
