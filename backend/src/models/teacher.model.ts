import { Pool } from 'pg';
import {DatabaseConnection} from '../database';

const pool: Pool = DatabaseConnection.getConnection();

export const retrieveTeacherInfo = async (user_id: number): Promise<any | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM teachers WHERE user_id = $1',
            [user_id]
        );
        return result.rows[0] || null;
    } catch (err) {
        console.error('Error fetching teacher info:', err);
        return null;
    } finally {
        client.release();
    }
};

export const getTeacherIdByUserId = async (user_id: number): Promise<number | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT teacher_id FROM teachers WHERE user_id = $1',
            [user_id]
        );
        return result.rows[0]?.teacher_id || null;
    } catch (err) {
        console.error('Error fetching teacher ID:', err);
        return null;
    } finally {
        client.release();
    }
};

export const getCoursesByTeacherId = async (teacher_id: number): Promise<any[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM courses WHERE teacher_id = $1',
            [teacher_id]
        );
        return result.rows;
    } catch (err) {
        console.error('Error fetching courses by teacher ID:', err);
        return [];
    } finally {
        client.release();
    }
};

export const getStudentsByClassName = async (class_name: string): Promise<any[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT
        students.student_id,
        students.first_name,
        students.last_name
      FROM
        students
      INNER JOIN
        student_courses ON students.student_id = student_courses.student_id
      INNER JOIN
        courses ON student_courses.course_id = courses.course_id
      WHERE
        courses.course_name = $1`,
            [class_name]
        );
        return result.rows;
    } catch (err) {
        console.error('Error fetching students by class name:', err);
        return [];
    } finally {
        client.release();
    }
};

export const getCourseIdByClassNameAndTeacher = async (class_name: string, teacher_id: number): Promise<number | null> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT course_id FROM courses WHERE course_name = $1 AND teacher_id = $2',
            [class_name, teacher_id]
        );
        return result.rows[0]?.course_id || null;
    } catch (err) {
        console.error('Error fetching course ID:', err);
        return null;
    } finally {
        client.release();
    }
};

export const insertOrUpdateGrade = async (student_id: number, course_id: number, teacher_id: number, grade: string): Promise<void> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const checkResult = await client.query(
            'SELECT grade_id FROM grades WHERE student_id = $1 AND course_id = $2 AND teacher_id = $3',
            [student_id, course_id, teacher_id]
        );

        if (checkResult.rows.length > 0) {
            await client.query(
                'UPDATE grades SET grade = $1, assigned_at = CURRENT_TIMESTAMP WHERE grade_id = $2',
                [grade, checkResult.rows[0].grade_id]
            );
        } else {
            await client.query(
                'INSERT INTO grades (student_id, course_id, teacher_id, grade) VALUES ($1, $2, $3, $4)',
                [student_id, course_id, teacher_id, grade]
            );
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting or updating grade:', err);
    } finally {
        client.release();
    }
};

export const getClassGrades = async (course_id: number): Promise<any[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT
        s.student_id,
        s.first_name,
        s.last_name,
        g.grade
      FROM
        grades g
      INNER JOIN
        students s ON g.student_id = s.student_id
      WHERE
        g.course_id = $1`,
            [course_id]
        );
        return result.rows;
    } catch (err) {
        console.error('Error fetching class grades:', err);
        return [];
    } finally {
        client.release();
    }
};

export const recordAttendance = async (student_id: number, course_id: number, teacher_id: number, is_present: boolean): Promise<void> => {
    const client = await pool.connect();
    try {
        await client.query(
            `MERGE INTO attendance a
      USING (SELECT $1 AS student_id, $2 AS course_id, $3 AS teacher_id FROM dual) b
      ON (a.student_id = b.student_id AND a.course_id = b.course_id)
      WHEN MATCHED THEN
        UPDATE SET is_present = $4, marked_at = CURRENT_TIMESTAMP
      WHEN NOT MATCHED THEN
        INSERT (student_id, course_id, teacher_id, is_present, marked_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
            [student_id, course_id, teacher_id, is_present]
        );
    } catch (err) {
        console.error('Error recording attendance:', err);
    } finally {
        client.release();
    }
};
