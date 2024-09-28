// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User'; // Ensure you're importing your entities correctly

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',          // or use 'postgres' if connecting from another container
    port: 5432,
    username: 'admin',          // Must match POSTGRES_USER
    password: 'password',       // Must match POSTGRES_PASSWORD
    database: 'my_database',    // Must match POSTGRES_DB
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
});
