"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User"); // Ensure you're importing your entities correctly
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost', // or use 'postgres' if connecting from another container
    port: 5432,
    username: 'admin', // Must match POSTGRES_USER
    password: 'password', // Must match POSTGRES_PASSWORD
    database: 'my_database', // Must match POSTGRES_DB
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
});
