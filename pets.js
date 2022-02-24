const subcommand = process.argv[2];
const fs = require('fs');


function readFile(index) {
    fs.readFile('./pets.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        try {
            const pet = JSON.parse(jsonString)
            const length = pet.length;
            if (index > length - 1 || index < 0) {
                console.log('INVALID INDEX: Pet does not exist');
            } else if (index <= length - 1 && index >= 0) {
                console.log(pet[index])
            } else {
                console.log(pet);
                return pet;
            }
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}

function writeToFile(age, kind, name) {
    if (age === undefined || kind === undefined || name === undefined) {
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1);
    }
    const pet = {
        age: age,
        kind: kind,
        name: name
    }
    const currValues = fs.readFileSync('./pets.json', 'utf-8');
    const currValuesArr = JSON.parse(currValues);
    currValuesArr.push(pet);
    const stringPets = JSON.stringify(currValuesArr);
    fs.writeFile('./pets.json', stringPets, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log(pet);
        }
    })

}

function updateFile(index, age, kind, name) {
    const currValues = fs.readFileSync('./pets.json', 'utf-8');
    const currValuesArr = JSON.parse(currValues);
    if (age === undefined || kind === undefined || name === undefined) {
        console.error('Usage: node pets.js update INDEX AGE KIND NAME');
        process.exit(1);
    }
    currValuesArr[index].age = age;
    currValuesArr[index].kind = kind;
    currValuesArr[index].name = name;

    const stringCurrVal = JSON.stringify(currValuesArr);

    fs.writeFile('./pets.json', stringCurrVal, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Updated Successfully');
        }
    })
}

function destroyFile(index) {
    const currValues = fs.readFileSync('./pets.json', 'utf-8');
    const currValuesArr = JSON.parse(currValues);

    currValuesArr.splice(index, 1);

    const stringCurrVal = JSON.stringify(currValuesArr);

    fs.writeFile('./pets.json', stringCurrVal, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Updated Successfully');
        }
    })
}

switch (subcommand) {
    case 'read':
        const index = process.argv[3];
        readFile(index);
        break;
    case 'create':
        const age = Number(process.argv[3]);
        const kind = process.argv[4];
        const name = process.argv[5];
        writeToFile(age, kind, name);
        break;
    case 'update':
        const i = process.argv[3];
        const a = Number(process.argv[4]);
        const k = process.argv[5];
        const n = process.argv[6];
        updateFile(i, a, k, n)
        break;
    case 'destroy':
        const f = process.argv[3];
        destroyFile(f);
        break;
    default:
        console.error('Usage: node pets.js [read | create | update | destroy]');
        process.exit(1);
}