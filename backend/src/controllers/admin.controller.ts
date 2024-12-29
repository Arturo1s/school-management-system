import { Request, Response } from 'express';
import {
    addStudent,
    viewStudents,
    modifyStudent,
    deleteStudent,
    addTeacher,
    viewTeachers,
    modifyTeacher,
    deleteTeacher
} from '../models/admin.model';

export const ctrlAddStudent = async (req: Request, res: Response) => {
    const {
        first_name,
        last_name,
        date_of_birth,
        current_academic_year,
        email,
        major,
        enrollment_date,
        password
    } = req.body;

    try {
        const success = await addStudent(
            first_name,
            last_name,
            date_of_birth,
            current_academic_year,
            email,
            major,
            enrollment_date,
            password
        );
        if (success) {
            res.status(201).json({ message: 'Student added successfully' });
        } else {
            res.status(500).json({ message: 'Failed to add student' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlViewStudents = async (req: Request, res: Response) => {
    try {
        const { rows, columns } = await viewStudents();
        res.json({ rows, columns });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlModifyStudent = async (req: Request, res: Response) => {
    const {
        student_id,
        user_id,
        first_name,
        last_name,
        date_of_birth,
        current_academic_year,
        email,
        major,
        enrollment_date,
        password
    } = req.body;

    try {
        const success = await modifyStudent(
            student_id,
            user_id,
            first_name,
            last_name,
            date_of_birth,
            current_academic_year,
            email,
            major,
            enrollment_date,
            password
        );
        if (success) {
            res.json({ message: 'Student modified successfully' });
        } else {
            res.status(500).json({ message: 'Failed to modify student' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlDeleteStudent = async (req: Request, res: Response) => {
    const { student_id, user_id, last_name } = req.body;

    try {
        const success = await deleteStudent(student_id, user_id, last_name);
        if (success) {
            res.json({ message: 'Student deleted successfully' });
        } else {
            res.status(500).json({ message: 'Failed to delete student' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlAddTeacher = async (req: Request, res: Response) => {
    const {
        first_name,
        last_name,
        date_of_birth,
        email,
        enrollment_date,
        department,
        courses_taught,
        password
    } = req.body;

    try {
        const success = await addTeacher(
            first_name,
            last_name,
            date_of_birth,
            email,
            enrollment_date,
            department,
            courses_taught,
            password
        );
        if (success) {
            res.status(201).json({ message: 'Teacher added successfully' });
        } else {
            res.status(500).json({ message: 'Failed to add teacher' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlViewTeachers = async (req: Request, res: Response) => {
    try {
        const { rows, columns } = await viewTeachers();
        res.json({ rows, columns });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlModifyTeacher = async (req: Request, res: Response) => {
    const {
        teacher_id,
        user_id,
        first_name,
        last_name,
        date_of_birth,
        email,
        enrollment_date,
        department,
        courses_taught,
        password
    } = req.body;

    try {
        const success = await modifyTeacher(
            teacher_id,
            user_id,
            first_name,
            last_name,
            date_of_birth,
            email,
            enrollment_date,
            department,
            courses_taught,
            password
        );
        if (success) {
            res.json({ message: 'Teacher modified successfully' });
        } else {
            res.status(500).json({ message: 'Failed to modify teacher' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlDeleteTeacher = async (req: Request, res: Response) => {
    const { teacher_id, user_id, last_name } = req.body;

    try {
        const success = await deleteTeacher(teacher_id, user_id, last_name);
        if (success) {
            res.json({ message: 'Teacher deleted successfully' });
        } else {
            res.status(500).json({ message: 'Failed to delete teacher' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
