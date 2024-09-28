"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// src/database.ts
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'admin', // PostgreSQL username
    host: 'localhost', // PostgreSQL host
    database: 'my_database', // PostgreSQL database name
    password: 'password', // PostgreSQL password
    port: 5432, // Default PostgreSQL port as a number, not a string
});
