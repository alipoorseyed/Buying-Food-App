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

db.query('CALL GetCustomerById(?)', [1], (err, results) => {
    if (err) {
        console.error('Error executing stored procedure: ' + err.stack);
        return;
    }

    console.log('User Details:', results[0]);
});


app.post("/Login/Manager", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL LoginManager(?, ?)', [email, password], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ message: 'Error during login', error: err });
        }

        const manager = result[0][0]; 
        if (manager) {
            res.status(200).json({
                message: 'Login successful',
                ManagerId: manager.ManagerId,
                ManagerName: manager.ManagerName,
                ManagerFamilyName: manager.ManagerFamilyName,
                ManagerEmail: manager.ManagerEmail,
                ManagerPhoneNumber: manager.ManagerPhoneNumber,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});


app.post("/SignUp/Manager", (req, res) =>{
    const {name, familyName, email, password, phoneNumber} = req.body;

    if (!name || !familyName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

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
                    ManagerId: result[0][0].Id
                });
            }
        });
    });
});


app.post("/SignUp/Customer", (req, res) =>{
    const {name, familyName, email, password, phoneNumber, address, city} = req.body;

    if (!name || !familyName || !email || !password || !phoneNumber || !address || !city) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL SignupCustomerCheck(?)', [email], (err, result) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ message: 'Error checking email', error: err });
        }

        const emailExists = result[0][0]?.EmailExists || 0; 

        if (emailExists > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        db.execute('CALL AddCustomer(?,?,?,?,?,?,?)', [name, familyName, email, password, phoneNumber, address, city], (err, result) => {
            if (err) {
                console.error('Error inserting Customer:', err);
                res.status(500).json({ message: 'Error saving Customer', error: err });
            } else {
                res.status(201).json({
                    CustomerId: result[0][0].Id
                });
            }
        });
    });
});


app.post("/LogIn/Customer", (req, res) =>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL LoginCustomer(?, ?)', [email, password], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ message: 'Error during login', error: err });
        }

        const customer = result[0][0]; 
        if (customer) {
            res.status(200).json({
                message: 'Login successful',
                CustomerId: customer.CustomerId
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});


app.post("/LogIn/Admin", (req, res) =>{
    const {userName, password} = req.body

    if(userName == 'admin' && password == "admin"){
        res.status(201).json({ message: 'Login successfull'})
    }
});


app.post("/AddRestaurant", (req, res) =>{
    const {managerId, name, address, city, limitBuy, deliveryFee, profilePicture} = req.body;

    if (!managerId || !name || !address || !city || !limitBuy || !deliveryFee || !profilePicture) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    db.execute('CALL AddRestaurant(?,?,?,?,?,?,?)', [managerId, name, address, city, limitBuy, deliveryFee, profilePicture], (err, result) => {
        if (err) {
            console.error('Error inserting restaurant:', err);
            res.status(500).json({ message: 'Error saving restaurant', error: err });
        } else {
            res.status(201).json({
                RestaurantId: result[0][0].Id
            });
        }
    });
});


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});