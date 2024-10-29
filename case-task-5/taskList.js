import fs from "fs";
import chalk from "chalk"
import Task from "./task.js";
import validateTasks from "./validateTasks.js";

class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        console.log(chalk.green("Задача добавлена: ") + chalk.blue(task.description));
    }

    removeTask(index) {
        if (index < 0 || index >= this.tasks.length) {
            console.log(chalk.red("Неверный индекс задачи."));
            return;
        }
        const removedTask = this.tasks.splice(index, 1);
        console.log(chalk.green("Задача удалена: ") + chalk.blue(removedTask[0].description));
    }

    displayTasks() {
        if (this.tasks.length === 0) {
            console.log(chalk.yellow("Нет доступных задач."));
            return;
        }
        this.tasks.forEach((task, index) => {
            console.log(
                `${index + 1}. ${task.description} - ${task.completed ? chalk.green("Выполнена") : chalk.red("Не выполнена")}`
            );
        });
    }

    displayCompletedTasks() {
        const completedTasks = this.tasks.filter((task) => task.completed);
        if (completedTasks.length === 0) {
            console.log(chalk.yellow("Нет выполненных задач."));
            return;
        }
        completedTasks.forEach((task, index) => {
            console.log(chalk.green(`${index + 1}. ${task.description}`));
        });
    }

    async saveTasksToFile(filename) {
        try {
            const tasksToSave = this.tasks.map((task) => ({
                description: task.description,
                completed: task.completed
            }));

            const dataToSave = {
                "$schema": "./arraySchema.json",
                "tasks": tasksToSave
            };

            if (validateTasks(dataToSave)) {
                await fs.promises.writeFile(filename, JSON.stringify(dataToSave, null, 2), "utf8");
                return chalk.green("Задачи успешно сохранены в файл.");
            } else {
                return chalk.red("Данные не прошли валидацию и не были сохранены.");
            }
        } catch (error) {
            return chalk.red("Ошибка при сохранении задач в файл: " + error.message);
        }
    }

    async loadTasksFromFile(filename) {
        try {
            const data = await fs.promises.readFile(filename, "utf8");
            const loadedData = JSON.parse(data);
            console.log(chalk.bgGreen("Загруженные данные: "), loadedData);

            if (!Array.isArray(loadedData.tasks)) {
                throw new Error("Загруженные данные не содержат массив задач.");
            }

            if (validateTasks(loadedData)) {
                this.tasks = loadedData.tasks.map(task => new Task(task.description, task.completed));
                console.log(chalk.green("Задачи успешно загружены."));
            } else {
                console.log(chalk.red("Загруженные данные не прошли валидацию."));
                this.tasks = [];
            }
        } catch (error) {
            console.error(chalk.red("Ошибка при загрузке задач из файла: "), error.message);
            this.tasks = [];
        }
    }

    searchTasks(keyword) {
        const foundTasks = this.tasks.filter((task) =>
            task.description.includes(keyword)
        );
        if (foundTasks.length === 0) {
            console.log(chalk.yellow("Задачи не найдены."));
            return;
        }
        foundTasks.forEach((task, index) => {
            console.log(
                `${index + 1}. ${task.description} - ${task.completed ? chalk.green("Выполнена") : chalk.red("Не выполнена")}`
            );
        });
    }

    sortTasks() {
        this.tasks.sort((a, b) => a.completed - b.completed);
        console.log(chalk.green("Задачи отсортированы."));
    }
}

export default TaskList;
