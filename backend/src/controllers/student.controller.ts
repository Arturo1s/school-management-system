import { Request, Response } from 'express';
import {
    getStudentPersonalInfo,
    getStudentIdByUserId,
    getStudentCourses,
    getGradeForCourse,
    getAttendanceForCourse
} from '../models/student.model';

export const ctrlLayerGetStudentInfo = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const studentInfo = await getStudentPersonalInfo(parseInt(user_id));
        if (studentInfo) {
            res.json(studentInfo);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlLayerGetStudentCourses = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const student_id = await getStudentIdByUserId(parseInt(user_id));
        if (!student_id) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const courses = await getStudentCourses(student_id);
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlLayerGetGradeForCourse = async (req: Request, res: Response) => {
    const { user_id, course_name } = req.params;

    try {
        const student_id = await getStudentIdByUserId(parseInt(user_id));
        if (!student_id) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const grade = await getGradeForCourse(student_id, course_name);
        if (grade) {
            res.json(grade);
        } else {
            res.status(404).json({ message: 'Grade not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlLayerGetAttendanceForCourse = async (req: Request, res: Response) => {
    const { user_id, course_name } = req.params;

    try {
        const student_id = await getStudentIdByUserId(parseInt(user_id));
        if (!student_id) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const attendance = await getAttendanceForCourse(student_id, course_name);
        if (attendance) {
            res.json(attendance);
        } else {
            res.status(404).json({ message: 'Attendance not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
