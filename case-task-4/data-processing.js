class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process(data = this.data) {
        console.log("Обработка данных...");
        return data.split(",").map((item) => {
            console.log("item: ", item);
            return Array.from(item.toUpperCase()).reverse().join("");
        });
    }

    sortBy(data = this.data) {
        return data.split(",").sort((a, b) => a.localeCompare(b));
    }
}

const realData = "Orange,Banana,Apple";
console.log(`Пример реальных данных: ${realData}`);
const dataProcessor = new DataProcessor(realData);

const fileInput = document.getElementById("fileInput");
console.log("fileInput: ", fileInput);

fileInput.addEventListener("change", async ({ target }) => {
    const file = target.files[0];
    const content = await readFileAsText(file);
    displayData("Данные из файла", content.split(", "));
});

const readFile = async (e, method) => {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const content = await readFileAsText(file);
    return dataProcessor[method](content);
};

const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => resolve(target.result);
        reader.readAsText(file);
    });
};

const dataForm = document.getElementById("dataForm");
const dataInput = document.getElementById("dataInput");
const sortButton = document.getElementById("sortData");
const processButton = document.getElementById("processData");

const displayData = (title, data) => {
    const displayElement = document.createElement("div");
    displayElement.insertAdjacentHTML(
        "beforeend",
        `<p><span style="font-weight: bold;">${title}: </span>${data.join(", ")}</p>`
    );
    document.body.appendChild(displayElement);
};

sortButton.addEventListener("click", async (event) => {
    const sortedContent = await readFile(event, "sortBy");
    displayData("Отсортированные данные", sortedContent);
});

processButton.addEventListener("click", async (event) => {
    const processedData = await readFile(event, "process");
    displayData("Обработанные данные", processedData);
});

dataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInput = dataInput.value;
    const dataToSave = userInput || "Пользователь не ввел данные.";

    const blob = new Blob([dataToSave], { type: "text/plain" });

    try {
        const url = URL.createObjectURL(blob);
        console.log(`URL: ${url}`);
        const link = document.createElement("a");
        link.download = "savedData.txt";
        link.href = url;
        link.click();
        dataInput.value = "";
    } catch (error) {
        console.error(`Ошибка при создании URL: ${error.message}`);
    }
});
