import { Histogram } from "./histograms.js";

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    checkData(data) {
        if (!data) {
            throw new Error("Отсутствуют данные для обработки.");
        }
    }

    handleError(action, error) {
        console.error(`Ошибка при ${action} данных: ${error.message}`);
        return [];
    }

    process(data = this.data) {
        try {
            console.log("Обработка данных...");
            this.checkData(data);
            return data
                .split(",")
                .map((item) => [...item.toUpperCase()].reverse().join(""));
        } catch (error) {
            return this.handleError("обработке", error);
        }
    }

    sortBy(data = this.data) {
        try {
            console.log("Сортировка данных...");
            this.checkData(data);
            return data
                .replace(/[.,!? ]/g, "")
                .split("")
                .sort((a, b) => a.localeCompare(b));
        } catch (error) {
            return this.handleError("сортировке", error);
        }
    }

    filteredBy(data = this.data, filter) {
        try {
            console.log("Фильтрация данных...");
            this.checkData(data);
            if (!filter) {
                throw new Error("Фильтр не задан");
            }
            const escapeRegExp = (str) =>
                str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const escapedSubstring = escapeRegExp(filter);
            const regex = new RegExp(escapedSubstring, "gi");
            return [data.replace(regex, "").trim()];
        } catch (error) {
            return this.handleError("фильтрации", error);
        }
    }

    getHistogram(data = this.data) {
        try {
            console.log("Создание гистограммы данных...");
            this.checkData(data);
            const histogram = new Histogram();
            histogram.add(data);
            return histogram.generateHistogramStrings();
        } catch (error) {
            return this.handleError("создании гистограммы", error);
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
const dataSubstring = document.getElementById("dataSubstring");
const substringInput = document.getElementById("substringInput");
const showText = document.getElementById("showText");
const filterButton = document.getElementById("filterButton");

let stringToRemove = null;

showText.textContent = `${stringToRemove ? stringToRemove : "Не введена подстрока для фильтрации данных"}`;

const displayDataProcessing = (method, content) => {
    let title = "";

    switch (method) {
        case "process":
            title = "Обработанные данные";
            break;
        case "getHistogram":
            title = "Гистограмма данных";
            break;
        case "sortBy":
            title = "Отсортированные данные";
            break;
        case "filteredBy":
            title = "Отфильтрованные данные";
            break;
        default:
            title = "Неизвестный метод";
            break;
    }

    if (method === "getHistogram") {
        const histogramContent = content.reduce((result, item) => {
            result += `<p>${item}</p>`;
            return result;
        }, `<h4>${title}: </h4>`);
        outputDiv.insertAdjacentHTML("beforeend", histogramContent);
    } else {
        displayData(title, content);
    }
};

const displayData = (title, data, label = "info") => {
    const displayElement = document.createElement("div");
    displayElement.id = label;
    displayElement.insertAdjacentHTML(
        "beforeend",
        `<p><span style="font-weight: bold;">${title}: </span>${data.join(", ")}</p>`
    );
    outputDiv.appendChild(displayElement);
};

const handleDataEvent = async (event, method) => {
    const content = await readFile(event, method);
    displayDataProcessing(method, content);
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
    const content = file ? await readFileAsText(file) : null;
    if (!content && !initialInfo)
        displayData("Пример реальных данных", realData.split(", "), "init");
    const args =
        method === "filteredBy"
            ? [content || undefined, stringToRemove]
            : [content];

    return dataProcessor[method](...args);
};

const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => resolve(target.result);
        reader.readAsText(file);
    });
};

sortButton.addEventListener("click", (event) =>
    handleDataEvent(event, "sortBy")
);
processButton.addEventListener("click", (event) =>
    handleDataEvent(event, "process")
);
histogramButton.addEventListener("click", (event) =>
    handleDataEvent(event, "getHistogram")
);
filterButton.addEventListener("click", (event) =>
    handleDataEvent(event, "filteredBy")
);

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

dataSubstring.addEventListener("submit", (event) => {
    event.preventDefault();
    stringToRemove = substringInput.value;
    console.log("stringToRemove: ", stringToRemove);
    showText.textContent = `${stringToRemove ? stringToRemove : "Не введена подстрока для фильтрации данных"}`;
    substringInput.value = "";
});
