const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "affecteo"
});

connection.connect((err) => {
    if(err){
        return console.log(err)
    }
    console.log('Connected to Mysql server')
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extend: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = `SELECT * FROM Lieu`;

    connection.query(sqlGet, (error, result) => {
        console.log(error)
        console.log(result)
        if (error) return res.status(400).json({status:'fail',message:error.message})
        res.status(200).json(result);
    });
});

// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO materiel (num_materiel, designation, etat, quantite) VALUES ('MAT003', 'SOURIS', 'Bon', 19)";
//     db.query(sqlInsert, (error, result) => {
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello Express");
//     })
// })

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})