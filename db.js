const Database = require('better-sqlite3');
const db = new Database(process.env.NODE_ENV === 'test' ? ':memory:' : './db.sqlite');

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`).run();

module.exports = db;
