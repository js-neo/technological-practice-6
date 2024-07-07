const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const content = e.target.result;
        console.log("Данные из файла:", content);
        processData(content);
    };

    reader.readAsText(file);
});

function processData(data) {
    const sortedData = data.split("\n").sort((a, b) => b.localeCompare(a));
    console.log("Отсортированные данные:", sortedData);
}

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        console.log("Обработка данных...");
    }
}

const realData = "Apple\nBanana\nOrange";
console.log("Пример реальных данных:", realData);
processData(realData);

const userInput = prompt("Введите данные для сохранения в файл:");
const dataToSave = userInput || "Пользователь не ввел данные.";

const blob = new Blob([dataToSave], { type: "text/plain" });

try {
    const url = URL.createObjectURL(blob);
    console.log("URL: ", url);
    const link = document.createElement("a");
    link.download = "savedData.txt";
    link.href = url;
    link.click();
} catch (error) {
    console.error("Ошибка при создании URL:", error.message);
}
