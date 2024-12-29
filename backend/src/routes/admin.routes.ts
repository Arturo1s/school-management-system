import express from 'express';
import {
    ctrlAddStudent,
    ctrlViewStudents,
    ctrlModifyStudent,
    ctrlDeleteStudent,
    ctrlAddTeacher,
    ctrlViewTeachers,
    ctrlModifyTeacher,
    ctrlDeleteTeacher
} from '../controllers/admin.controller';

const router = express.Router();

router.post('/students', ctrlAddStudent);
router.get('/students', ctrlViewStudents);
router.put('/students', ctrlModifyStudent);
router.delete('/students', ctrlDeleteStudent);

router.post('/teachers', ctrlAddTeacher);
router.get('/teachers', ctrlViewTeachers);
router.put('/teachers', ctrlModifyTeacher);
router.delete('/teachers', ctrlDeleteTeacher);

export default router;
