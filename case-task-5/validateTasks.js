import Ajv from "ajv";
import fs from "fs";

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync("arraySchema.json", "utf8"));

const validateTasks = (data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.error("Ошибки валидации данных:", validate.errors);
        return false;
    } else {
        console.log("Данные корректны.");
        return true;
    }
};

export default validateTasks;
