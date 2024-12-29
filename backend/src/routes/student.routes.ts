import express from 'express';
import {
    ctrlLayerGetStudentInfo,
    ctrlLayerGetStudentCourses,
    ctrlLayerGetGradeForCourse,
    ctrlLayerGetAttendanceForCourse
} from '../controllers/student.controller';

const router = express.Router();

router.get('/:user_id/info', ctrlLayerGetStudentInfo);
router.get('/:user_id/courses', ctrlLayerGetStudentCourses);
router.get('/:user_id/courses/:course_name/grade', ctrlLayerGetGradeForCourse);
router.get('/:user_id/courses/:course_name/attendance', ctrlLayerGetAttendanceForCourse);

export default router;
