import db from "../config/db.js";
import { Answer } from "../models/Answer.js"

export const getAnswersForQuestion = (questionId) => {
    return new Promise ((resolve, reject) => {
        const sql = 'SELECT * FROM answers WHERE questionId = ?'
        db.all(sql, [questionId], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                const answers = rows.map(row => new Answer(row.id, row.text, row.author, row.date, row.questionId));
                resolve(answers)
            }
        })
    });
}