import db from '../config/db.js'
import { Question } from '../models/Question.js'

export const getAllQuestions = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM questions', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const questions = rows.map(row => new Question(row.id, row.text, row.author, row.date));
                resolve(questions);
            }
        });
    });
}

export const getQuestionById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM questions WHERE id=?'
        db.get(sql, [id], (err, row) => {
            if (err){
                reject(err);
            } else if (!row) {
                resolve(null);
            } else {
                resolve(new Question(row.id, row.text, row.author, row.date));
            }
        })
    })
}


export const createQuestion = (question) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO questions (text, author, date) VALUES (?, ?, ?)';
        db.run(sql, [question.text, question.author, question.date], function(err) {
            if (err) {
                reject(err)
            } else {
                resolve({ ...question, id: this.lastID })
            }
        })
    })
}

export const deleteQuestion = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = 'DELETE from questions WHERE id = ?'
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err)
            } else if (this.changes === 0){
                resolve({
                    success: false,
                    message: "Question was not deleted"
                })
            } else {
                resolve({
                    success: true,
                    message: "Question was deleted successfully",
                    changes: this.changes
                })
            }
        })
    })
}
