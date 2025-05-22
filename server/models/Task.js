export class Task {
    constructor(id, goal_id, title, estimated_time, actual_time, status, created_at) {
        this.id = id;
        this.goal_id = goal_id;
        this.title = title;
        this.estimated_time = estimated_time;
        this.actual_time = actual_time;
        this.status = status;
        this.created_at = created_at;
    }
}