const fs = require("fs");
const Task = require("./task");

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        if (index < 0 || index >= this.tasks.length) {
            console.log("Invalid task index.");
            return;
        }
        this.tasks.splice(index, 1);
    }

    displayTasks() {
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
            return;
        }
        this.tasks.forEach((task, index) => {
            console.log(
                `${index + 1}. ${task.description} - ${task.completed ? "Completed" : "Incomplete"}`
            );
        });
    }

    displayCompletedTasks() {
        const completedTasks = this.tasks.filter((task) => task.completed);
        if (completedTasks.length === 0) {
            console.log("No completed tasks.");
            return;
        }
        completedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description}`);
        });
    }

    saveTasksToFile(filename) {
        try {
            const tasksToSave = this.tasks.map((task) => ({
                description: task.description,
                completed: task.completed
            }));

            const dataToSave = {
                "$schema": "./arraySchema.json",
                "tasks": tasksToSave
            };

            fs.writeFileSync(filename, JSON.stringify(dataToSave, null, 2), "utf8");
            console.log("Tasks saved to file successfully.");
        } catch (error) {
            console.error("Error saving tasks to file:", error);
        }
    }


    loadTasksFromFile(filename) {
        try {
            const data = fs.readFileSync(filename, "utf8");
            const loadedData = JSON.parse(data);

            if (!Array.isArray(loadedData.tasks)) {
                throw new Error("Loaded data does not contain an array of tasks.");
            }

            this.tasks = loadedData.tasks.map(task => new Task(task.description, task.completed));
            console.log("Tasks loaded successfully.");
        } catch (error) {
            console.error("Error loading tasks from file:", error);
            this.tasks = [];
        }
    }


    searchTasks(keyword) {
        const foundTasks = this.tasks.filter((task) =>
            task.description.includes(keyword)
        );
        if (foundTasks.length === 0) {
            console.log("No tasks found.");
            return;
        }
        foundTasks.forEach((task, index) => {
            console.log(
                `${index + 1}. ${task.description} - ${task.completed ? "Completed" : "Incomplete"}`
            );
        });
    }
}

module.exports = TaskList;
