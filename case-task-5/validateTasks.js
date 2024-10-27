const Ajv = require("ajv");
const fs = require("fs");

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync("arraySchema.json", "utf8"));

const data = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
    console.error("Data validation errors:", validate.errors);
} else {
    console.log("Data is valid.");
}
