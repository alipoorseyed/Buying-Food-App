import express from "express";
import mysql2 from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hedie231182',
    database: 'db-project'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);
});

db.query('CALL GetManagerById(?)', [1], (err, results) => {
    if (err) {
        console.error('Error executing stored procedure: ' + err.stack);
        return;
    }

    console.log('User Details:', results[0]);  
});



app.post("/signUp/Manager", (req, res) =>{
    const {name, familyName, email, password, phoneNumber} = req.body;
  
    db.execute('CALL AddManager(?,?,?,?,?)', [name, familyName, email, password, phoneNumber], (err, result) => {
        if (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ message: 'Error saving user', error: err });
        } else {
        res.status(201).json({
            Managerid: result.insertId,
            ManagerName: name,
            ManagerFamilyName: familyName,
            ManagerEmail: email,
            ManagerPassword: password,
            ManagerPhoneNumber: phoneNumber,
        });
        }
    });

});


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});