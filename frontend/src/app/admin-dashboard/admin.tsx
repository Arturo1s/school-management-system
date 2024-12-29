import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
    const [adminInfo, setAdminInfo] = useState<any | null>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [menuOption, setMenuOption] = useState<string>('Personal Information');

    useEffect(() => {
        fetchAdminInfo();
        fetchStudents();
        fetchTeachers();
    }, []);

    const fetchAdminInfo = async () => {
        try {
            const response = await axios.get('/admin/1/info'); // Replace 1 with the actual admin_id
            setAdminInfo(response.data);
        } catch (error) {
            console.error('Error fetching admin info:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/admin/students');
            if (Array.isArray(response.data)) {
                setStudents(response.data);
            } else {
                console.error('Error: Expected an array of students but got', response.data);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/admin/teachers');
            if (Array.isArray(response.data)) {
                setTeachers(response.data);
            } else {
                console.error('Error: Expected an array of teachers but got', response.data);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <button onClick={() => setMenuOption('Personal Information')}>Personal Information</button>
                <button onClick={() => setMenuOption('Manage Students')}>Manage Students</button>
                <button onClick={() => setMenuOption('Manage Teachers')}>Manage Teachers</button>
                <button onClick={() => setMenuOption('Settings')}>Settings</button>
            </div>
            {menuOption === 'Personal Information' && adminInfo && (
                <div>
                    <h2>Personal Information</h2>
                    <p>Admin ID: {adminInfo.admin_id}</p>
                    <p>First Name: {adminInfo.first_name}</p>
                    <p>Last Name: {adminInfo.last_name}</p>
                    <p>Email: {adminInfo.email}</p>
                    <p>Role: {adminInfo.role}</p>
                </div>
            )}
            {menuOption === 'Manage Students' && (
                <div>
                    <h2>Manage Students</h2>
                    {students.map((student: any) => (
                        <div key={student.student_id}>
                            <h3>{student.first_name} {student.last_name}</h3>
                            <p>Student ID: {student.student_id}</p>
                            <p>Email: {student.email}</p>
                            <p>Major: {student.major}</p>
                            <p>Enrollment Date: {student.enrollment_date}</p>
                        </div>
                    ))}
                </div>
            )}
            {menuOption === 'Manage Teachers' && (
                <div>
                    <h2>Manage Teachers</h2>
                    {teachers.map((teacher: any) => (
                        <div key={teacher.teacher_id}>
                            <h3>{teacher.first_name} {teacher.last_name}</h3>
                            <p>Teacher ID: {teacher.teacher_id}</p>
                            <p>Email: {teacher.email}</p>
                            <p>Department: {teacher.department}</p>
                            <p>Hire Date: {teacher.hire_date}</p>
                        </div>
                    ))}
                </div>
            )}
            {menuOption === 'Settings' && (
                <div>
                    <h2>Settings</h2>
                    {/* Implement settings logic here */}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
