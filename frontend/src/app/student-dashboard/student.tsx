import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard: React.FC = () => {
    const [studentInfo, setStudentInfo] = useState<any | null>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [menuOption, setMenuOption] = useState<string>('Personal Information');

    useEffect(() => {
        fetchStudentInfo();
        fetchStudentCourses();
    }, []);

    const fetchStudentInfo = async () => {
        try {
            const response = await axios.get('/students/1/info'); // Replace 1 with the actual user_id
            setStudentInfo(response.data);
        } catch (error) {
            console.error('Error fetching student info:', error);
        }
    };

    const fetchStudentCourses = async () => {
        try {
            const response = await axios.get('/students/1/courses'); // Replace 1 with the actual user_id
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching student courses:', error);
        }
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            <div>
                <button onClick={() => setMenuOption('Personal Information')}>Personal Information</button>
                <button onClick={() => setMenuOption('View Schedule')}>View Schedule</button>
                <button onClick={() => setMenuOption('View Grades')}>View Grades</button>
                <button onClick={() => setMenuOption('View Attendance')}>View Attendance</button>
                <button onClick={() => setMenuOption('Settings')}>Settings</button>
            </div>
            {menuOption === 'Personal Information' && studentInfo && (
                <div>
                    <h2>Personal Information</h2>
                    <p>Student ID: {studentInfo.student_id}</p>
                    <p>First Name: {studentInfo.first_name}</p>
                    <p>Last Name: {studentInfo.last_name}</p>
                    <p>Date of Birth: {studentInfo.date_of_birth}</p>
                    <p>Current Academic Year: {studentInfo.current_academic_year}</p>
                    <p>Email: {studentInfo.email}</p>
                    <p>Major: {studentInfo.major}</p>
                    <p>Enrollment Date: {studentInfo.enrollment_date}</p>
                    <p>Password: {studentInfo.password}</p>
                </div>
            )}
            {menuOption === 'View Schedule' && (
                <div>
                    <h2>View Schedule</h2>
                    {courses.map((course: any) => (
                        <div key={course.course_id}>
                            <h3>{course.course_name}</h3>
                            <p>Description: {course.description}</p>
                            <p>Credit Hours: {course.credit_hours}</p>
                            <p>Teacher: {course.teacher_name}</p>
                            <p>Day of Week: {course.day_of_week}</p>
                            <p>Start Time: {course.start_time}</p>
                            <p>End Time: {course.end_time}</p>
                            <p>Semester: {course.semester}</p>
                        </div>
                    ))}
                </div>
            )}
            {menuOption === 'View Grades' && (
                <div>
                    <h2>View Grades</h2>
                    {/* Implement grade viewing logic here */}
                </div>
            )}
            {menuOption === 'View Attendance' && (
                <div>
                    <h2>View Attendance</h2>
                    {/* Implement attendance viewing logic here */}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
