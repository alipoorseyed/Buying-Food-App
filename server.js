import express, { response } from "express";
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
                console.error('Error inserting Manager:', err);
                res.status(500).json({ message: 'Error saving Manager', error: err });
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


app.post("/AddCustomer", (req, res) =>{
    const {name, familyName, email, password, phoneNumber, address, city} = req.body;

    if (!name || !familyName || !email || !password || !phoneNumber || !address || !city) {
        return res.status(400).json({ message: 'All fields are required' });
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


app.post("/AddAddress", (req, res) =>{
    const {CustomerId, AddressCity, Address} = req.body;

    if (!CustomerId|| !AddressCity || !Address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL AddAddress(?,?,?)', [CustomerId, AddressCity, Address], (err, result) => {
        if (err) {
            console.error('Error inserting Address:', err);
            res.status(500).json({ message: 'Error saving Address', error: err });
        } else {
            res.status(201).json({
                AddressId: result[0][0].Id
            });
        }
    });
});


app.post("/AddManager", (req, res) =>{
    const {name, familyName, email, password, phoneNumber} = req.body;

    if (!name || !familyName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL AddManager(?,?,?,?,?)', [name, familyName, email, password, phoneNumber], (err, result) => {
        if (err) {
            console.error('Error inserting Manager:', err);
            res.status(500).json({ message: 'Error saving Manager', error: err });
        } else {
            res.status(201).json({
                ManagerId: result[0][0].Id
            });
        }
    });
});


app.post("/AddItem", (req, res) =>{
    const {RestaurantId, ItemName, ItemPrice} = req.body;

    if (!RestaurantId || !ItemName || !ItemPrice) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL AddItem(?,?,?)', [RestaurantId, ItemName, ItemPrice], (err, result) => {
        if (err) {
            console.error('Error inserting Item:', err);
            res.status(500).json({ message: 'Error saving Item', error: err });
        } else {
            res.status(201).json({
                ItemId: result[0][0].Id
            });
        }
    });
});


app.post("/AddSchedule", (req, res) =>{
    const {RestaurantId, ItemName, ItemPrice} = req.body;

    if (!RestaurantId || !ItemName || !ItemPrice) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL AddSchedule(?,?,?)', [RestaurantId, ItemName, ItemPrice], (err, result) => {
        if (err) {
            console.error('Error inserting Schedule:', err);
            res.status(500).json({ message: 'Error saving Schedule', error: err });
        } else {
            res.status(201).json({
                ScheduleId: result[0][0].Id
            });
        }
    });
});


app.post("/UpdateCustomer", (req, res) =>{
    const {id, name, familyName, email, password, phoneNumber, address, city} = req.body;

    if (!id || !name || !familyName || !email || !password || !phoneNumber || !address || !city) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL UpdateCustomer(?,?,?,?,?,?,?,?)', [id, name, familyName, email, password, phoneNumber, address, city], (err, result) => {
        if (err) {
            console.error('Error updating Customer:', err);
            res.status(500).json({ message: 'Error updating Customer', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/UpdateManager", (req, res) =>{
    const {id, name, familyName, email, password, phoneNumber} = req.body;

    if (!id || !name || !familyName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL UpdateManager(?,?,?,?,?,?)', [id, name, familyName, email, password, phoneNumber], (err, result) => {
        if (err) {
            console.error('Error Updating Manager:', err);
            res.status(500).json({ message: 'Error Updating Manager', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/UpdateRestaurant", (req,res) =>{
    const {id, managerId, name, address, city, limitBuy, deliveryFee, profilePicture} = req.body;

    if (!id || !managerId || !name || !address || !city || !limitBuy || !deliveryFee || !profilePicture) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    db.execute('CALL UpdateRestaurant(?,?,?,?,?,?,?,?)', [id, managerId, name, address, city, limitBuy, deliveryFee, profilePicture], (err, result) => {
        if (err) {
            console.error('Error Updating restaurant:', err);
            res.status(500).json({ message: 'Error Updating restaurant', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/UpdateAddress", (req, res) =>{
    const {id, CustomerId, AddressCity, Address} = req.body;

    if (!id || !CustomerId|| !AddressCity || !Address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL UpdateAddress(?,?,?,?)', [id, CustomerId, AddressCity, Address], (err, result) => {
        if (err) {
            console.error('Error Updating Address:', err);
            res.status(500).json({ message: 'Error Updating Address', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/UpdateItem", (req, res) =>{
    const {id, RestaurantId, ItemName, ItemPrice} = req.body;

    if (!id || !RestaurantId || !ItemName || !ItemPrice) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL UpdateItem(?,?,?,?)', [id, RestaurantId, ItemName, ItemPrice], (err, result) => {
        if (err) {
            console.error('Error Updating Item:', err);
            res.status(500).json({ message: 'Error Updating Item', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/UpdateSchedule", (req, res) =>{
    const {id, RestaurantId, ItemName, ItemPrice} = req.body;

    if (!id || !RestaurantId || !ItemName || !ItemPrice) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL UpdateSchedule(?,?,?)', [id, ItemName, ItemPrice], (err, result) => {
        if (err) {
            console.error('Error inserting Schedule:', err);
            res.status(500).json({ message: 'Error saving Schedule', error: err });
        } else {
            res.status(201).json({
                ScheduleId: result[0][0].Id
            });
        }
    });
});


app.post("/DeleteCustomer", (req, res) =>{
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL DeleteCustomer(?)', [id], (err, result) => {
        if (err) {
            console.error('Error Deleting Customer:', err);
            res.status(500).json({ message: 'Error Deleting Customer', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/DeleteManager", (req, res) =>{
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL DeleteManager(?)', [id], (err, result) => {
        if (err) {
            console.error('Error Deleting Manager:', err);
            res.status(500).json({ message: 'Error Deleting Manager', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/DeleteRestaurant", (req,res) =>{
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    db.execute('CALL DeleteRestaurant(?)', [id], (err, result) => {
        if (err) {
            console.error('Error Deleting restaurant:', err);
            res.status(500).json({ message: 'Error Deleting restaurant', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/DeleteAddress", (req, res) =>{
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL DeleteAddress(?)', [id], (err, result) => {
        if (err) {
            console.error('Error Deleting Address:', err);
            res.status(500).json({ message: 'Error Deleting Address', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/DeleteItem", (req, res) =>{
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL DeleteItem(?)', [id], (err, result) => {
        if (err) {
            console.error('Error Deleting Item:', err);
            res.status(500).json({ message: 'Error Deleting Item', error: err });
        } else {
            res.status(201).json({
                result
            });
        }
    });
});


app.post("/DeleteSchedule", (req, res) =>{
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.execute('CALL DeleteSchedule(?,?,?)', [id], (err, result) => {
        if (err) {
            console.error('Error Deleting Schedule:', err);
            res.status(500).json({ message: 'Error Deleting Schedule', error: err });
        } else {
            res.status(201).json({
                ScheduleId: result[0][0].Id
            });
        }
    });
});


app.get("/AllRestaurants", (req, res) =>{

    db.execute('CALL SelectAllRestaurant()', (err, results) => {
        if (err) {
            console.error('Error getting restaurants:', err);
            return res.status(500).json({ message: 'Error getting restaurants', error: err });
        }
        res.status(200).json(results[0]);
    });
});


app.get("/GetItemsOFResturant", (req, res) =>{
    const restaurantId = req.body;

    db.execute('CALL GetItemsOfRestaurant(?)', [restaurantId], (err, results) => {
        if (err) {
            console.error('Error getting items for restaurant:', err);
            return res.status(500).json({ message: 'Error getting items', error: err });
        }
        res.status(200).json(results[0]);
    });
});


app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});