const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());


app.get('/pets', function(req, res) {
    fs.readFile('./pets.json', 'utf8', (err, jsonString) => {
        if (err) {
            res.setHeader
            console.log("File read failed:", err)
            return
        }
        res.setHeader('Content-Type', 'application/json').status(200).send(jsonString);
    })
})

app.get('/pets/:index', function(req, res) {
    fs.readFile('./pets.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        const parsedJSON = JSON.parse(jsonString);
        if (parsedJSON[req.params.index]) {
            res.setHeader('Content-Type', 'application/json').status(200).json(parsedJSON[req.params.index]);
        } else {
            res.setHeader('Content-Type', 'text/plain').status(404).send('Not a valid index');
        }

    })
})

app.post('/pets', function(req, res) {
    fs.readFile('./pets.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        const parsedJSON = JSON.parse(jsonString);
        const newPet = (req.body);
        parsedJSON.push(newPet);
        fs.writeFile('./pets.json', JSON.stringify(parsedJSON), (err) => {
            if (err) {
                console.error('File Write Failed:', err);
            } else {
                console.log(newPet, " Was added!");
                res.send(newPet);
            }
        })

    })
})

app.listen(8080, function() {
    console.log('Server is running')
})