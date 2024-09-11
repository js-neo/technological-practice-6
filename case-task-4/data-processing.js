import { Histogram } from "./histograms.js";

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process(data = this.data) {
        try {
            console.log("Обработка данных...");
            if (!data) {
                throw new Error("Отсутствуют данные для обработки.");
            }
            return data.split(",").map((item) => {
                return Array.from(item.toUpperCase()).reverse().join("");
            });
        } catch (error) {
            console.error(`Ошибка при обработке данных: ${error.message}`);
            return [];
        }
    }

    sortBy(data = this.data) {
        try {
            console.log("Сортировка данных...");
            if (!data) {
                throw new Error("Отсутствуют данные для сортировки.");
            }
            return data
                .replace(/[.,!? ]/g, "")
                .split("")
                .sort((a, b) => a.localeCompare(b));
        } catch (error) {
            console.error(`Ошибка при сортировке данных: ${error.message}`);
            return [];
        }
    }

    getHistogram(data = this.data) {
        try {
            console.log("Создание гистограммы данных...");
            if (!data) {
                throw new Error("Отсутствуют данные для создания гистограммы.");
            }
            const histogram = new Histogram();
            histogram.add(data);
            return histogram.generateHistogramStrings();
        } catch (error) {
            console.error(
                `Ошибка при создании гистограммы данных: ${error.message}`
            );
            return [];
        }
    }
}

const dataForm = document.getElementById("dataForm");
const dataInput = document.getElementById("dataInput");
const outputDiv = document.getElementById("output");
const saveButton = dataForm.querySelector("button[type='submit']");
const sortButton = document.getElementById("sortData");
const processButton = document.getElementById("processData");
const histogramButton = document.getElementById("histogramData");

const displayData = (title, data, label = "info") => {
    const displayElement = document.createElement("div");
    displayElement.id = label;
    displayElement.insertAdjacentHTML(
        "beforeend",
        `<p><span style="font-weight: bold;">${title}: </span>${data.join(", ")}</p>`
    );
    outputDiv.appendChild(displayElement);
};

const realData = "Orange, Banana, Apple";
console.log(`Пример реальных данных: ${realData}`);
displayData("Пример реальных данных", realData.split(", "), "init");
const dataProcessor = new DataProcessor(realData);

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", async ({ target }) => {
    outputDiv.textContent = "";
    const file = target.files[0];
    const content = await readFileAsText(file);
    displayData("Данные из файла", content.split(", "));
});

const readFile = async (e, method) => {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const initialInfo = document.getElementById("init");
    const file = fileInput.files[0];
    const content = file && (await readFileAsText(file));
    if (!content && !initialInfo)
        displayData("Пример реальных данных", realData.split(", "), "init");
    return content ? dataProcessor[method](content) : dataProcessor[method]();
};

const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => resolve(target.result);
        reader.readAsText(file);
    });
};

sortButton.addEventListener("click", async (event) => {
    const sortedContent = await readFile(event, "sortBy");
    displayData("Отсортированные данные", sortedContent);
});

processButton.addEventListener("click", async (event) => {
    const processedData = await readFile(event, "process");
    displayData("Обработанные данные", processedData);
});
histogramButton.addEventListener("click", async (event) => {
    const histogramContent = await readFile(event, "getHistogram");
    const content = histogramContent.reduce((result, item) => {
        result += `<p>${item}</p>`;
        return result;
    }, "<h4>Гистограмма данных: </h4>");
    outputDiv.insertAdjacentHTML("beforeend", content);
});

dataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    outputDiv.textContent = "";
    displayData("Пример реальных данных", realData.split(", "), "init");

    const userInput = dataInput.value;
    const dataToSave = userInput || "Пользователь не ввел данные.";

    const blob = new Blob([dataToSave], { type: "text/plain" });

    try {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "savedData.txt";
        link.href = url;
        link.click();
        dataInput.value = "";
    } catch (error) {
        console.error(`Ошибка при создании URL: ${error.message}`);
    }
});
