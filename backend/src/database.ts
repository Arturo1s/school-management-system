import { Pool } from 'pg';

class DatabaseConnection {
    private static _instance: Pool | null = null;

    static getConnection(): Pool {
        if (!DatabaseConnection._instance) {
            DatabaseConnection._instance = new Pool({
                user: 'school',
                host: 'localhost',
                database: 'school_management',
                password: 'school',
                port: 5432,
            });
        }
        return DatabaseConnection._instance;
    }

    static closeConnection(): void {
        if (DatabaseConnection._instance) {
            DatabaseConnection._instance.end();
            DatabaseConnection._instance = null;
        }
    }
}

const connectDB = async () => {
    try {
        const pool = DatabaseConnection.getConnection();
        await pool.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

export { DatabaseConnection, connectDB };

