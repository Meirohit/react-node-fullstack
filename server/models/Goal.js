export class Goal {
    constructor(id, user_id, title, description, estimated_time, created_at){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.estimated_time = estimated_time;
        this.created_at = created_at;
    }
}