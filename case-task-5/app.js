import readline from "readline";
import Task from "./task.js";
import TaskList from "./taskList.js";
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const taskList = new TaskList();
(async () => {
    await taskList.loadTasksFromFile("tasks.json");
    showMenu();
})();

function showMenu() {
    console.log("\n" + chalk.blue("1. Добавить задачу"));
    console.log(chalk.blue("2. Удалить задачу"));
    console.log(chalk.blue("3. Показать все задачи"));
    console.log(chalk.blue("4. Показать выполненные задачи"));
    console.log(chalk.blue("5. Сохранить задачи в файл"));
    console.log(chalk.blue("6. Поиск задач"));
    console.log(chalk.blue("7. Пометить задачу как выполненную"));
    console.log(chalk.blue("8. Сортировать задачи"));
    console.log(chalk.blue("0. Выйти"));
    rl.question(chalk.yellow("Выберите действие: "), handleMenuSelection);
}

function handleMenuSelection(option) {
    switch (option) {
        case "1":
            rl.question(chalk.yellow("Введите описание задачи: "), (description) => {
                const task = new Task(description);
                taskList.addTask(task);
                console.log(chalk.green("Задача добавлена."));
                showMenu();
            });
            break;
        case "2":
            rl.question(chalk.yellow("Введите номер задачи для удаления: "), (index) => {
                const taskIndex = parseInt(index) - 1;
                if (!isNaN(taskIndex)) {
                    taskList.removeTask(taskIndex);
                } else {
                    console.log(chalk.red("Неверный ввод. Пожалуйста, введите число."));
                }
                showMenu();
            });
            break;
        case "3":
            taskList.displayTasks();
            showMenu();
            break;
        case "4":
            taskList.displayCompletedTasks();
            showMenu();
            break;
        case "5":
            (async () => {
                const message = await taskList.saveTasksToFile("tasks.json");
                console.log("message: ", message);
                showMenu();
            })();
            break;
        case "6":
            rl.question(chalk.yellow("Введите ключевое слово для поиска: "), (keyword) => {
                taskList.searchTasks(keyword);
                showMenu();
            });
            break;
        case '7':
            rl.question(chalk.yellow("Введите номер задачи для пометки как выполненной: "), (index) => {
                const taskIndex = parseInt(index) - 1;
                if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < taskList.tasks.length) {
                    taskList.tasks[taskIndex].markAsCompleted();
                    console.log(chalk.green("Задача помечена как выполненная."));
                } else {
                    console.log(chalk.red("Неверный номер задачи."));
                }
                showMenu();
            });
            break;
        case '8':
            taskList.sortTasks();
            showMenu();
            break;
        case "0":
            rl.close();
            break;
        default:
            console.log(chalk.red("Неверный выбор. Попробуйте снова."));
            showMenu();
            break;
    }
}

