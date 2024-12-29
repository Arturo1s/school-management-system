import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard: React.FC = () => {
    const [teacherInfo, setTeacherInfo] = useState<any | null>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [menuOption, setMenuOption] = useState<string>('Personal Information');

    useEffect(() => {
        fetchTeacherInfo();
        fetchTeacherCourses();
    }, []);

    const fetchTeacherInfo = async () => {
        try {
            const response = await axios.get('/teachers/1/info'); // Replace 1 with the actual user_id
            setTeacherInfo(response.data);
        } catch (error) {
            console.error('Error fetching teacher info:', error);
        }
    };

    const fetchTeacherCourses = async () => {
        try {
            const response = await axios.get('/teachers/1/courses'); // Replace 1 with the actual user_id
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching teacher courses:', error);
        }
    };

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <div>
                <button onClick={() => setMenuOption('Personal Information')}>Personal Information</button>
                <button onClick={() => setMenuOption('View Schedule')}>View Schedule</button>
                <button onClick={() => setMenuOption('View Classes & Assign Grades')}>View Classes & Assign Grades</button>
                <button onClick={() => setMenuOption('View Grades')}>View Grades</button>
                <button onClick={() => setMenuOption('Mark Attendance')}>Mark Attendance</button>
                <button onClick={() => setMenuOption('Settings')}>Settings</button>
            </div>
            {menuOption === 'Personal Information' && teacherInfo && (
                <div>
                    <h2>Personal Information</h2>
                    <p>Name: {teacherInfo.first_name} {teacherInfo.last_name}</p>
                    <p>Date of Birth: {teacherInfo.date_of_birth}</p>
                    <p>Email: {teacherInfo.email}</p>
                    <p>Enrollment Date: {teacherInfo.enrollment_date}</p>
                    <p>Department: {teacherInfo.department}</p>
                    <p>Courses Taught: {teacherInfo.courses_taught}</p>
                    <p>Password: {teacherInfo.password}</p>
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
                            <p>Day of Week: {course.day_of_week}</p>
                            <p>Start Time: {course.start_time}</p>
                            <p>End Time: {course.end_time}</p>
                            <p>Semester: {course.semester}</p>
                        </div>
                    ))}
                </div>
            )}
            {menuOption === 'View Classes & Assign Grades' && (
                <div>
                    <h2>View Classes & Assign Grades</h2>
                    {/* Implement class and grade assignment logic here */}
                </div>
            )}
            {menuOption === 'View Grades' && (
                <div>
                    <h2>View Grades</h2>
                    {/* Implement grade viewing logic here */}
                </div>
            )}
            {menuOption === 'Mark Attendance' && (
                <div>
                    <h2>Mark Attendance</h2>
                    {/* Implement attendance marking logic here */}
                </div>
            )}
        </div>
    );
};

export default TeacherDashboard;
