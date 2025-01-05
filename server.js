import express from "express"
import mysql2 from "mysql2"

const app = express();
const port = 3000;

console.log("hello")
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hedie231182',
    database: 'db-project'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

const userId = 1;

connection.query('CALL GetManagerById(?)', [userId], (err, results) => {
    if (err) {
        console.error('Error executing stored procedure: ' + err.stack);
        return;
    }

    console.log('User Details:', results[0]);  
});


connection.end();


app.listen(port, () =>{
    console.log(`LIstening on port ${port}`);
});