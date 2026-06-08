"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.initDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3_1.default.Database(dbPath);
const initDB = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          full_name TEXT NOT NULL,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          designation TEXT NOT NULL,
          status TEXT NOT NULL,
          email TEXT,
          profile_picture TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, async (err) => {
                if (err) {
                    console.error('Error creating users table:', err);
                    reject(err);
                }
                else {
                    console.log('Users table ready.');
                    // Safely add columns to existing table
                    db.run("ALTER TABLE users ADD COLUMN email TEXT", () => { });
                    db.run("ALTER TABLE users ADD COLUMN profile_picture TEXT", () => { });
                    await seedAdminUser();
                    resolve();
                }
            });
        });
    });
};
exports.initDB = initDB;
const seedAdminUser = () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', ['admin'], async (err, row) => {
            if (err) {
                reject(err);
            }
            else if (!row) {
                const id = (0, uuid_1.v4)();
                const salt = await bcryptjs_1.default.genSalt(10);
                const hashedPassword = await bcryptjs_1.default.hash('admin', salt);
                db.run('INSERT INTO users (id, full_name, username, password_hash, designation, status) VALUES (?, ?, ?, ?, ?, ?)', [id, 'Administrator', 'admin', hashedPassword, 'Administrator', 'Active'], (err) => {
                    if (err) {
                        console.error('Error seeding admin user:', err);
                        reject(err);
                    }
                    else {
                        console.log('Admin user seeded successfully. Username: admin, Password: admin');
                        resolve();
                    }
                });
            }
            else {
                resolve(); // Admin already exists
            }
        });
    });
};
const getDB = () => db;
exports.getDB = getDB;
