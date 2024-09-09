class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        console.log("Обработка данных...");
        const processedData = this.data
            .split(",")
            .map((item) => Array.from(item).reverse().join("").toUpperCase());
        console.log(`Обработанные данные: ${processedData.join(", ")}`);

        const processedElement = document.createElement("div");
        processedElement.insertAdjacentHTML(
            "beforeend",
            `<p><span style="font-weight: bold;">Обработанные данные: </span>${processedData.join(", ")}</p>`
        );
        document.body.appendChild(processedElement);
    }
    processData(data = this.data) {
        const sortedData = data.split(",").sort((a, b) => a.localeCompare(b));

        const resultElement = document.createElement("div");
        resultElement.insertAdjacentHTML(
            "beforeend",
            `<p><span style="font-weight: bold;">Исходные данные: </span>${this.data}</p>`
        );
        resultElement.insertAdjacentHTML(
            "beforeend",
            `<p><span style="font-weight: bold;">Отсортированные данные: </span>${sortedData.join(", ")}</p>`
        );
        document.body.appendChild(resultElement);
    }
}

const realData = "Orange,Banana,Apple";
console.log(`Пример реальных данных: ${realData}`);
const dataProcessor = new DataProcessor(realData);

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", async ({ target }) => {
    const file = target.files[0];
    const content = await readFileAsText(file);
    console.log(`Данные из файла: ${content}`);
    dataProcessor.processData(content);
});

const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => resolve(target.result);
        reader.readAsText(file);
    });
};

dataProcessor.process();
dataProcessor.processData();

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
