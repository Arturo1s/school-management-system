import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const AdminDashboard: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [menuOption, setMenuOption] = useState<string>('Manage Students & Teachers');
    const [showAddStudentForm, setShowAddStudentForm] = useState<boolean>(false);
    const [showModifyStudentForm, setShowModifyStudentForm] = useState<boolean>(false);
    const [showDeleteStudentForm, setShowDeleteStudentForm] = useState<boolean>(false);
    const [showAddTeacherForm, setShowAddTeacherForm] = useState<boolean>(false);
    const [showModifyTeacherForm, setShowModifyTeacherForm] = useState<boolean>(false);
    const [showDeleteTeacherForm, setShowDeleteTeacherForm] = useState<boolean>(false);

    useEffect(() => {
        fetchStudents();
        fetchTeachers();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/admin/students');
            setStudents(response.data.rows);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/admin/teachers');
            setTeachers(response.data.rows);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleAddStudent = async (studentData: any) => {
        try {
            await axios.post('/admin/students', studentData);
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleModifyStudent = async (studentData: any) => {
        try {
            await axios.put('/admin/students', studentData);
            fetchStudents();
        } catch (error) {
            console.error('Error modifying student:', error);
        }
    };

    const handleDeleteStudent = async (studentData: any) => {
        try {
            await axios.delete('/admin/students', { data: studentData });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleAddTeacher = async (teacherData: any) => {
        try {
            await axios.post('/admin/teachers', teacherData);
            fetchTeachers();
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    const handleModifyTeacher = async (teacherData: any) => {
        try {
            await axios.put('/admin/teachers', teacherData);
            fetchTeachers();
        } catch (error) {
            console.error('Error modifying teacher:', error);
        }
    };

    const handleDeleteTeacher = async (teacherData: any) => {
        try {
            await axios.delete('/admin/teachers', { data: teacherData });
            fetchTeachers();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'student_id', headerName: 'Student ID', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'last_name', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'major', headerName: 'Major', width: 150 },
    ];

    const teacherColumns: GridColDef[] = [
        { field: 'teacher_id', headerName: 'Teacher ID', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'last_name', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'department', headerName: 'Department', width: 150 },
    ];

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <button onClick={() => setMenuOption('Manage Students & Teachers')}>Manage Students & Teachers</button>
                <button onClick={() => setMenuOption('Manage Admin & Users')}>Manage Admin & Users</button>
                <button onClick={() => setMenuOption('Manage Classes')}>Manage Classes</button>
                <button onClick={() => setMenuOption('View Reports')}>View Reports</button>
                <button onClick={() => setMenuOption('Manage Messages')}>Manage Messages</button>
                <button onClick={() => setMenuOption('Settings')}>Settings</button>
            </div>
            {menuOption === 'Manage Students & Teachers' && (
                <div>
                    <h2>Manage Students & Teachers</h2>
                    <button onClick={() => setShowAddStudentForm(true)}>Add Student</button>
                    <button onClick={() => setShowAddTeacherForm(true)}>Add Teacher</button>
                    {showAddStudentForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const studentData = Object.fromEntries(formData.entries());
                                handleAddStudent(studentData);
                                setShowAddStudentForm(false);
                            }}
                        >
                            <input name="first_name" placeholder="First Name" required />
                            <input name="last_name" placeholder="Last Name" required />
                            <input name="date_of_birth" placeholder="Date of Birth" required />
                            <input name="current_academic_year" placeholder="Academic Year" required />
                            <input name="email" placeholder="Email" required />
                            <input name="major" placeholder="Major" required />
                            <input name="enrollment_date" placeholder="Enrollment Date" required />
                            <input name="password" placeholder="Password" required />
                            <button type="submit">Add Student</button>
                        </form>
                    )}
                    {showAddTeacherForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const teacherData = Object.fromEntries(formData.entries());
                                handleAddTeacher(teacherData);
                                setShowAddTeacherForm(false);
                            }}
                        >
                            <input name="first_name" placeholder="First Name" required />
                            <input name="last_name" placeholder="Last Name" required />
                            <input name="date_of_birth" placeholder="Date of Birth" required />
                            <input name="email" placeholder="Email" required />
                            <input name="enrollment_date" placeholder="Enrollment Date" required />
                            <input name="department" placeholder="Department" required />
                            <input name="courses_taught" placeholder="Courses Taught" required />
                            <input name="password" placeholder="Password" required />
                            <button type="submit">Add Teacher</button>
                        </form>
                    )}
                    <DataGrid rows={students} columns={columns} />
                    <DataGrid rows={teachers} columns={teacherColumns} />
                    <button onClick={() => setShowModifyStudentForm(true)}>Modify Student</button>
                    <button onClick={() => setShowModifyTeacherForm(true)}>Modify Teacher</button>
                    <button onClick={() => setShowDeleteStudentForm(true)}>Delete Student</button>
                    <button onClick={() => setShowDeleteTeacherForm(true)}>Delete Teacher</button>
                    {showModifyStudentForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const studentData = Object.fromEntries(formData.entries());
                                handleModifyStudent(studentData);
                                setShowModifyStudentForm(false);
                            }}
                        >
                            <input name="student_id" placeholder="Student ID" required />
                            <input name="user_id" placeholder="User ID" required />
                            <input name="first_name" placeholder="First Name" required />
                            <input name="last_name" placeholder="Last Name" required />
                            <input name="date_of_birth" placeholder="Date of Birth" required />
                            <input name="current_academic_year" placeholder="Academic Year" required />
                            <input name="email" placeholder="Email" required />
                            <input name="major" placeholder="Major" required />
                            <input name="enrollment_date" placeholder="Enrollment Date" required />
                            <input name="password" placeholder="Password" />
                            <button type="submit">Modify Student</button>
                        </form>
                    )}
                    {showModifyTeacherForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const teacherData = Object.fromEntries(formData.entries());
                                handleModifyTeacher(teacherData);
                                setShowModifyTeacherForm(false);
                            }}
                        >
                            <input name="teacher_id" placeholder="Teacher ID" required />
                            <input name="user_id" placeholder="User ID" required />
                            <input name="first_name" placeholder="First Name" required />
                            <input name="last_name" placeholder="Last Name" required />
                            <input name="date_of_birth" placeholder="Date of Birth" required />
                            <input name="email" placeholder="Email" required />
                            <input name="enrollment_date" placeholder="Enrollment Date" required />
                            <input name="department" placeholder="Department" required />
                            <input name="courses_taught" placeholder="Courses Taught" required />
                            <input name="password" placeholder="Password" />
                            <button type="submit">Modify Teacher</button>
                        </form>
                    )}
                    {showDeleteStudentForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const studentData = Object.fromEntries(formData.entries());
                                handleDeleteStudent(studentData);
                                setShowDeleteStudentForm(false);
                            }}
                        >
                            <input name="student_id" placeholder="Student ID" required />
                            <input name="user_id" placeholder="User ID" required />
                            <input name="last_name" placeholder="Last Name" required />
                            <button type="submit">Delete Student</button>
                        </form>
                    )}
                    {showDeleteTeacherForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const teacherData = Object.fromEntries(formData.entries());
                                handleDeleteTeacher(teacherData);
                                setShowDeleteTeacherForm(false);
                            }}
                        >
                            <input name="teacher_id" placeholder="Teacher ID" required />
                            <input name="user_id" placeholder="User ID" required />
                            <input name="last_name" placeholder="Last Name" required />
                            <button type="submit">Delete Teacher</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
