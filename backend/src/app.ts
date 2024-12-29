import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './database';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admins', adminRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

// Database Connection and Start Server
sequelize.sync({ force: false }).then(() => {
    console.log('Database connected successfully!');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error: any) => console.error('DB Connection Failed:', error));