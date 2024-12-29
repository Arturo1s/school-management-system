import express from 'express';
import {
    ctrlRetrieveTeacherInfo,
    ctrlLayerGetTeacherCourses,
    ctrlLayerGetStudentsInClass,
    ctrlAssignGradesToStudents,
    ctrlLayerGetClassGrades,
    ctrlSaveAttendance
} from '../controllers/teacher.controller';

const router = express.Router();

router.get('/:user_id/info', ctrlRetrieveTeacherInfo);
router.get('/:user_id/courses', ctrlLayerGetTeacherCourses);
router.get('/classes/:class_name/students', ctrlLayerGetStudentsInClass);
router.post('/:user_id/classes/:class_name/grades', ctrlAssignGradesToStudents);
router.get('/:user_id/classes/:class_name/grades', ctrlLayerGetClassGrades);
router.post('/:user_id/classes/:class_name/attendance', ctrlSaveAttendance);

export default router;
