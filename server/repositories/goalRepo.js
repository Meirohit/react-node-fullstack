import db from '../config/db.js'
import { Goal } from '../models/Goal.js'

export const getAllGoals = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM goals', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const goals = rows.map(row => new Goal(row.id, row.user_id, row.title, row.description, row.estimated_time, row.created_at));
                resolve(goals);
            }
        });
    });
}

export const getGoalById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM goals WHERE id=?'
        db.get(sql, [id], (err, row) => {
            if (err){
                reject(err);
            } else if (!row) {
                resolve(null);
            } else {
                resolve(new Goal(row.id, row.user_id, row.title, row.description, row.estimated_time, row.created_at));
            }
        })
    })
}


export const createGoal = (goal) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO goals (user_id, title, description, estimated_time) VALUES (?, ?, ?, ?)';
        db.run(sql, [goal.user_id, goal.title, goal.description, goal.estimated_time], function(err) {
            if (err) {
                reject(err)
            } else {
                resolve({ ...goal, id: this.lastID })
            }
        })
    })
}

export const deleteGoal = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = 'DELETE from goals WHERE id = ?'
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err)
            } else if (this.changes === 0){
                resolve({
                    success: false,
                    message: "Goal was not deleted"
                })
            } else {
                resolve({
                    success: true,
                    message: "Goal was deleted successfully",
                    changes: this.changes
                })
            }
        })
    })
}

export const editGoal = (id, title, description, estimated_time) => {
    return new Promise ((resolve, reject) => {
        const sql = 'UPDATE goals SET title = ?, description = ?, estimated_time = ? WHERE id = ?';
        db.run(sql, [title, description, estimated_time, id], function (err) {
            if (err) {
                reject (err)
            } else {
                resolve({id: id, title: title, description: description, estimated_time: estimated_time})
            }
        })
    })
}
