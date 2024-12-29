import { Request, Response } from 'express';
import {
    retrieveTeacherInfo,
    getTeacherIdByUserId,
    getCoursesByTeacherId,
    getStudentsByClassName,
    getCourseIdByClassNameAndTeacher,
    insertOrUpdateGrade,
    getClassGrades,
    recordAttendance
} from '../models/teacher.model';

export const ctrlRetrieveTeacherInfo = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const teacherInfo = await retrieveTeacherInfo(parseInt(user_id));
        if (teacherInfo) {
            res.json(teacherInfo);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlLayerGetTeacherCourses = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const teacher_id = await getTeacherIdByUserId(parseInt(user_id));
        if (!teacher_id) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const courses = await getCoursesByTeacherId(teacher_id);
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlLayerGetStudentsInClass = async (req: Request, res: Response) => {
    const { class_name } = req.params;

    try {
        const students = await getStudentsByClassName(class_name);
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlAssignGradesToStudents = async (req: Request, res: Response) => {
    const { user_id, class_name } = req.params;
    const student_grades: { [key: string]: string } = req.body;

    try {
        const teacher_id = await getTeacherIdByUserId(parseInt(user_id));
        if (!teacher_id) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const course_id = await getCourseIdByClassNameAndTeacher(class_name, teacher_id);
        if (!course_id) {
            return res.status(404).json({ message: 'Course not found' });
        }

        for (const [student_id, grade] of Object.entries(student_grades)) {
            if (grade.trim()) {
                await insertOrUpdateGrade(parseInt(student_id), course_id, teacher_id, grade);
            }
        }

        res.json({ message: 'Grades assigned successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlLayerGetClassGrades = async (req: Request, res: Response) => {
    const { user_id, class_name } = req.params;

    try {
        const teacher_id = await getTeacherIdByUserId(parseInt(user_id));
        if (!teacher_id) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const course_id = await getCourseIdByClassNameAndTeacher(class_name, teacher_id);
        if (!course_id) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const grades = await getClassGrades(course_id);
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const ctrlSaveAttendance = async (req: Request, res: Response) => {
    const { user_id, class_name } = req.params;
    const attendance_records: { [key: string]: boolean } = req.body;

    try {
        const teacher_id = await getTeacherIdByUserId(parseInt(user_id));
        if (!teacher_id) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const course_id = await getCourseIdByClassNameAndTeacher(class_name, teacher_id);
        if (!course_id) {
            return res.status(404).json({ message: 'Course not found' });
        }

        for (const [student_id, is_present] of Object.entries(attendance_records)) {
            await recordAttendance(parseInt(student_id), course_id, teacher_id, is_present);
        }

        res.json({ message: 'Attendance recorded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
