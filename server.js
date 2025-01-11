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



app.post("/SignUp/Manager", (req, res) =>{
    const {name, familyName, email, password, phoneNumber} = req.body;

    db.execute('CALL SignupManagerCheck(?)', [email], (err, result) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ message: 'Error checking email', error: err });
        }

        const emailExists = result[0][0]?.EmailExists || 0; 

        if (emailExists > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

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
});


app.post("/LogIn/Admin", (req, res) =>{
    const {userName, password} = req.body

    if(userName == 'admin' && password == "admin"){
        res.status(201).json({ message: 'Login successfull'})
    }
});


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});