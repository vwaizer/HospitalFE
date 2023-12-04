const express = require('express');
const oracledb = require('oracledb');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const connAttr = {
    "user": "hr",
    "password": "hr",
    "connectString": "localhost:1521/XE"
};

app.get('/users', async (req, res) => {
    try {
        const conn = await oracledb.getConnection(connAttr);
        const data = await conn.execute(`SELECT * FROM USERS`);
        res.send(data.rows);

        await conn.close();
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
});

app.get('/inpatients', async (req, res) => {
    try {
        const conn = await oracledb.getConnection(connAttr);
        const data = await conn.execute(`SELECT IPCODE, FNAME, LNAME, GENDER, PHONE_NO FROM INPATIENT`);
        res.send(data.rows);

        await conn.close();
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
});

app.get('/outpatients', async (req, res) => {
    try {
        const conn = await oracledb.getConnection(connAttr);
        const data = await conn.execute(`SELECT OPCODE, FNAME, LNAME, GENDER, PHONE_NO FROM OUTPATIENT`);
        res.send(data.rows);

        await conn.close();
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
});

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const connection = await oracledb.getConnection(connAttr);

        const result = await connection.execute('SELECT PASSWORD FROM USERS WHERE USERNAME = :username', [username]);

        // res.send(result);

        if (result.rows.length === 0) {
            return res.status(401).json({message: 'User not found'});
        }

        const userPassword = result.rows[0][0];
        //
        // const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        //

        const isLogin = (userPassword === password);

        console.log(isLogin);

        if (!isLogin) {
            return res.status(401).json(isLogin);
        }

        await connection.close();

        return res.status(200).json(isLogin);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }

});


const PORT = 8000;

app.listen(PORT, () => {

    console.log('Server is running on port ' + PORT);

});