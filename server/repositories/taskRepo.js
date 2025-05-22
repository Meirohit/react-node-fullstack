import db from "../config/db.js";
import { Task } from "../models/Task.js"

export const getTasksOfGoal = (goalId) => {
    return new Promise ((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE goal_id = ?'
        db.all(sql, [goalId], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                const tasks = rows.map(row => new Task(row.id, row.goal_id, row.title, row.estimated_time, row.actual_time, row.status, row.created_at));
                resolve(tasks)
            }
        })
    });
}