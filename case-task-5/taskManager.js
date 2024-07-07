const fs = require("fs");

class Task {
    constructor(description, completed = false) {
        this.description = description;
        this.completed = completed;
    }

    markAsCompleted() {
        this.completed = true;
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    displayTasks() {
        this.tasks.forEach((task, index) => {
            console.log(
                `${index + 1}. ${task.description} - ${task.completed ? "Completed" : "Incomplete"}`
            );
        });
    }

    displayCompletedTasks() {
        const completedTasks = this.tasks.filter((task) => task.completed);
        completedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description}`);
        });
    }

    saveTasksToFile(filename) {
        fs.writeFileSync(filename, JSON.stringify(this.tasks), "utf8");
        console.log("Tasks saved to file successfully.");
    }

    loadTasksFromFile(filename) {
        const data = fs.readFileSync(filename, "utf8");
        this.tasks = JSON.parse(data);
        console.log("Tasks loaded from file successfully.");
    }
}

const task1 = new Task("Complete task management app");
const task2 = new Task("Learn JavaScript");

const taskList = new TaskList();
taskList.addTask(task1);
taskList.addTask(task2);

taskList.displayTasks();
taskList.removeTask(1);
taskList.displayTasks();

task1.markAsCompleted();
taskList.displayCompletedTasks();

taskList.saveTasksToFile("tasks.json");
taskList.loadTasksFromFile("tasks.json");
taskList.displayTasks();
