import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './app/admin-dashboard/Admin';
import StudentDashboard from './app/student-dashboard/Student';
import TeacherDashboard from './app/teacher-dashboard/Teacher';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
