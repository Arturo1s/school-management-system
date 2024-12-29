import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './app/admin-dashboard/admin';
import StudentDashboard from './app/student-dashboard/student';
import TeacherDashboard from './app/teacher-dashboard/teacher';
import Login from './app/login/Login';

const App: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);

    const handleLogin = (role: string) => {
        setRole(role);
    };

    return (
        <div>
            {role ? (
                <Routes>
                    {role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
                    {role === 'student' && <Route path="/students" element={<StudentDashboard />} />}
                    {role === 'teacher' && <Route path="/teachers" element={<TeacherDashboard />} />}
                    <Route path="*" element={<Navigate to={role === 'admin' ? '/admin' : role === 'student' ? '/students' : '/teachers'} />} />
                </Routes>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;


