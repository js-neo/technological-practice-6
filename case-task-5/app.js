const readline = require("readline");
const Task = require("./task");
const TaskList = require("./taskList");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const taskList = new TaskList();
taskList.loadTasksFromFile("tasks.json");

function showMenu() {
    console.log("\n1. Добавить задачу");
    console.log("2. Удалить задачу");
    console.log("3. Показать все задачи");
    console.log("4. Показать выполненные задачи");
    console.log("5. Сохранить задачи в файл");
    console.log("6. Поиск задач");
    console.log("7. Пометить задачу как выполненную");
    console.log("0. Выйти");
    rl.question("Выберите действие: ", handleMenuSelection);
}

function handleMenuSelection(option) {
    switch (option) {
        case "1":
            rl.question("Введите описание задачи: ", (description) => {
                const task = new Task(description);
                taskList.addTask(task);
                console.log("Задача добавлена.");
                showMenu();
            });
            break;
        case "2":
            rl.question("Введите номер задачи для удаления: ", (index) => {
                taskList.removeTask(parseInt(index) - 1);
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
            taskList.saveTasksToFile("tasks.json");
            showMenu();
            break;
        case "6":
            rl.question("Введите ключевое слово для поиска: ", (keyword) => {
                taskList.searchTasks(keyword);
                showMenu();
            });
            break;
        case '7':
            rl.question("Введите номер задачи для пометки как выполненной: ", (index) => {
                const taskIndex = parseInt(index) - 1;
                if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < taskList.tasks.length) {
                    try {
                        taskList.tasks[taskIndex].markAsCompleted();
                        console.log("Задача помечена как выполненная.");
                        console.log("taskList.tasks: ", taskList.tasks);
                        taskList.displayTasks(taskList.tasks);
                    } catch (error) {
                        console.error("Ошибка при пометке задачи:", error);
                    }
                } else {
                    console.log("Неверный номер задачи.");
                }
                showMenu();
            });
            break;

        case "0":
            rl.close();
            break;
        default:
            console.log("Неверный выбор. Попробуйте снова.");
            showMenu();
            break;
    }
}

showMenu();
