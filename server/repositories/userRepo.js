import db from "../config/db.js"
import { User } from "../models/User.js"

export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id=?`
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err)
            } else if (!row){
                reject(null)
            } else {
                resolve(new User(row.id, row.email, row.full_name, row.created_at))
            }
        })
    })
}