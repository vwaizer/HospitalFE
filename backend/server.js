const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 3001;

oracledb.createPool({
    user: 'asm312',
    password: 'vi312',
    connectString: 'localhost:1521/XE'
}).then(pool=>{
    app.listen(PORT, () => {
        console.log('Server is running on port 3001');
    });
    app.post('/login', async (req, res) => {
        try{
            const {username, password } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                'SELECT * FROM USERS WHERE USERNAME = :username AND PASSWORD =:password',
                { username, password}
            );
            await connection.close();
            if (result.rows.length > 0){
                console.log('Login successful for:', username);
                res.json({ success: true});
            }
            else{
                console.error('Invalid credentials for:', username); 
                res.status(401).json({ success: false, message: 'Username or Password is wrong'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/searchID', async (req, res) => {
        try{
            const { patientID, patientName } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `SELECT id, fname, lname, phone_no, address from INPATIENT WHERE id = :patientID  
                union SELECT id, fname, lname, phone_no, address from OUTPATIENT WHERE id = :patientID `,
                {patientID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const patient = result.rows[0]
                console.log('Found patient', patient[0]);
                res.json({ patientData: patient});
            }
            else{
                console.error('Patient not found', patientID, patientName); 
                res.status(401).json({ success: false, message: 'Patient not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/inpatientRecord', async (req, res) => {
        try{
            const { patientId } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select r.record_id, r.ip_id, TO_CHAR(r.admission_date, 'dd-mm-yyyy'), TO_CHAR(r.discharge_date, 'dd-mm-yyyy'), r.diagnosis, r.sick_room, n.fname || ' ' || n.lname as nurse_name, r.total_fee 
                from inpatient_record r, inpatient i, employee n
                where i.id = r.ip_id and i.id = :patientId and n.unique_code = i.nurse_uc`,
                {patientId}
            );
            await connection.close();
            if (result.rows.length > 0){
                const record = result.rows
                console.log('Found record', record[0][0]);
                res.json({ inpatient_record : record });
            }
            else{
                console.error('Record not found', patientID); 
                res.status(401).json({ success: false, message: 'Record not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
}).catch(err => {
    console.error('Database connection error:', err);
});
