const express = require('express');
const app = express();
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
    database: 'petshop',
});

app.use(express.json());
app.use(express.static("public"));


app.get('/pets', function(req, res) {
    pool.query('SELECT * FROM pets;', (err, result) => {
        res.send(result.rows);
    })
})


app.get('/pets/:pet_id', function(req, res) {
    const id = parseInt(req.params.pet_id);
    pool.query('SELECT * FROM pets WHERE id = $1;', [id], (err, result) => {
        res.send(result.rows[0]);
    })

})

app.post('/pets', function(req, res) {
    const { age, name, kind } = req.body;
    pool.query("INSERT INTO pets(age, name, kind) VALUES ($1, $2, $3) RETURNING *;", [age, name, kind], (err, result) => {
        res.send(result.rows[0]);
    })
})

app.patch('/pets/:pet_id', (req, res) => {
    const id = req.params.pet_id
    const { age, name, kind } = req.body;
    const query = `UPDATE pets SET 
    age = COALESCE($1, age), 
    name = COALESCE($2, name), 
    kind = COALESCE($3, kind) 
    WHERE id = $4
    RETURNING *`;
    pool.query(query, [age, name, kind, id], (err, result) => {
        res.send(result.rows[0])
    });
})

// app.delete('/pets/:index', (req, res) => {
//     const index = req.params.index;
//     fs.readFile('pets.json', 'UTF-8', (err, data) => {
//         const parsedData = JSON.parse(data);
//         parsedData.splice(index, 1);
//         fs.writeFile('./pets.json', JSON.stringify(parsedData), (err) => {
//             if (err) {
//                 console.error('File Write Failed:', err);
//             } else {
//                 console.log("Pet was deleted");
//                 res.send(parsedData)
//             }
//         })


//     })
// })

app.delete('/pets/:pet_id', (req, res) => {
    const id = req.params.pet_id
    pool.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id], (err, result) => {
        res.send(result.rows[0]);
    })
})


app.listen(8080, function() {
    console.log('Server is running');
})