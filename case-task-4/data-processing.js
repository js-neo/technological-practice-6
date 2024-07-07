const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", async ({ target }) => {
    const file = target.files[0];
    const content = await readFileAsText(file);
    console.log(`Данные из файла: ${content}`);
    processData(content);
});

const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => resolve(target.result);
        reader.readAsText(file);
    });
};

const processData = (data) => {
    const sortedData = data.split("\n").sort((a, b) => b.localeCompare(a));
    console.log(`Отсортированные данные: ${sortedData}`);
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        console.log("Обработка данных...");
    }
}

const realData = "Apple\nBanana\nOrange";
console.log(`Пример реальных данных: ${realData}`);
processData(realData);

const userInput = prompt("Введите данные для сохранения в файл:");
const dataToSave = userInput || "Пользователь не ввел данные.";

const blob = new Blob([dataToSave], { type: "text/plain" });

try {
    const url = URL.createObjectURL(blob);
    console.log(`URL: ${url}`);
    const link = document.createElement("a");
    link.download = "savedData.txt";
    link.href = url;
    link.click();
} catch (error) {
    console.error(`Ошибка при создании URL: ${error.message}`);
}
