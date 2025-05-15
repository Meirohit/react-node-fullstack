import sqlite from 'sqlite3';

const db = new sqlite.Database('db.sqlite', (err) => {
  if (err) throw err;
  console.log('Connected to SQLite database');
});

db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      author TEXT,
      date TEXT
    );
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      author TEXT,
      date TEXT,
      questionId INTEGER NOT NULL,
      FOREIGN KEY(questionId) REFERENCES questions(id) ON DELETE CASCADE
    );
  `);

export default db;