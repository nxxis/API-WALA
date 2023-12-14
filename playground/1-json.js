const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();

const data = JSON.parse(dataJSON);
data.name = 'Sudip';
data.age = 25;

const dataStringify = JSON.stringify(data);

fs.writeFileSync('1-json.json', dataStringify);