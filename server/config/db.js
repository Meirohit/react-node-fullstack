import sqlite from 'sqlite3';

const db = new sqlite.Database('db.sqlite', (err) => {
  if (err) throw err;
  console.log('Connected to SQLite database');
});

db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      author TEXT,
      date TEXT
    );
  `);

export default db;