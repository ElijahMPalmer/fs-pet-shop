const fs = require('fs');
const http = require('http');

const DATA_PATH = 'pets.json'
const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && petRegExp.test(req.url)) {
        const index = req.url.match(petRegExp)[1];
        fs.readFile(DATA_PATH, "utf-8", (err, data) => {
            if (err) {
                req.statusCode = 500;
                res.end();
            } else {
                console.log(data, "data at index");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                const parsedData = JSON.parse(data);
                const dataIndex = parsedData[index];
                if (dataIndex) {
                    res.write(JSON.stringify(dataIndex));
                    res.end();
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write("Not Found");
                    res.end();
                }

            }

        })
    } else if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile(DATA_PATH, "utf-8", (err, data) => {
            if (err) {
                req.statusCode = 500;
                res.end();
            } else {
                console.log(data, "data");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(data)
                res.end();
            }

        })

    } else if (req.method === 'POST' && req.url === '/pets') {
        console.log("Creating new pet")
        fs.readFile(DATA_PATH, "utf-8", (err, data) => {
            if (err) {
                req.statusCode = 500;
                res.end();
            } else {
                console.log(data, "data");

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(data)
                res.end();
            }

        })
    } else if (req.method === 'GET') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.write("Not Found");
        res.end();
    }


})

server.listen(8080);
module.exports = server;