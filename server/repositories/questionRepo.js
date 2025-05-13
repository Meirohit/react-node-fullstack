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
