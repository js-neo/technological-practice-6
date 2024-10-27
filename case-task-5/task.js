class Task {
    constructor(description, completed = false) {
        this.description = description;
        this.completed = completed;
    }

    markAsCompleted() {
        this.completed = true;
    }
}

module.exports = Task;
