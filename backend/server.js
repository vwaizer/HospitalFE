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
    app.post('/inpatientTreatment', async (req, res) => {
        try{
            const { recordID } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select tm.treatment_id, tm.result, TO_CHAR(tm.start_date, 'dd-mm-yyyy'), TO_CHAR(tm.end_date, 'dd-mm-yyyy'), d.fname || ' ' || d.lname, m.name, u.dosage*m.current_price
                from treatment tm, treat t, employee d, treat_use_med u, medication m
                where tm.treatment_id = t.treatment_id and d.unique_code = t.doctor_id and tm.record_id = :recordID 
                and u.treatment_id = tm.treatment_id and m.unique_code = u.med_id`,
                {recordID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const treatments = result.rows
                console.log('Found treatment', treatments[0][0]);
                res.json({ inpatient_treatment : treatments });
            }
            else{
                console.error('Treatment not found', recordID); 
                res.status(401).json({ success: false, message: 'Treatment not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/outpatientRecord', async (req, res) => {
        try{
            const { patientId } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select r.record_id, r.op_id, r.total_fee 
                from outpatient_record r, outpatient o
                where o.id = r.op_id and o.id = :patientId`,
                {patientId}
            );
            await connection.close();
            if (result.rows.length > 0){
                const record = result.rows
                console.log('Found record', record[0]);
                res.json({ outpatient_record : record });
            }
            else{
                console.error('Record not found', patientId); 
                res.status(401).json({ success: false, message: 'Record not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/outpatientExamination', async (req, res) => {
        try{
            const { recordID } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select ex.exam_id, ex.result, TO_CHAR(ex.examinate_date, 'dd-mm-yyyy'), TO_CHAR(ex.next_ex, 'dd-mm-yyyy'), d.fname || ' ' || d.lname, m.name, u.dosage*m.current_price
                from examination ex, examine e, employee d, exam_use_med u, medication m
                where ex.exam_id = e.exam_id and d.unique_code = e.doctor_id and ex.record_id = :recordID
                and u.exam_id = ex.exam_id and m.unique_code = u.med_id`,
                {recordID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const examinations = result.rows
                console.log('Found examination', examinations[0][0]);
                res.json({ outpatient_examination : examinations });
            }
            else{
                console.error('Examination not found', recordID); 
                res.status(401).json({ success: false, message: 'Examination not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    //SEARCH ON DOCTORNAME
    app.post('/searchDoctor', async (req, res) => {
        try{
            const { doctorName } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `SELECT O.ID, O.FNAME, O.LNAME, O.PHONE_NO
                FROM OUTPATIENT O, EXAMINE E, EMPLOYEE D
                WHERE D.FNAME || ' ' || D.LNAME LIKE :doctorName
                AND E.DOCTOR_ID = D.UNIQUE_CODE AND E.OP_ID = O.ID
                UNION
                SELECT I.ID, I.FNAME, I.LNAME, I.PHONE_NO
                FROM INPATIENT I, TREAT T, EMPLOYEE D
                WHERE D.FNAME || ' ' || D.LNAME LIKE :doctorName
                AND T.DOCTOR_ID = D.UNIQUE_CODE AND T.IP_ID = I.ID`,
                {doctorName}
            );
            await connection.close();
            if (result.rows.length > 0){
                const patient = result.rows
                console.log('Found patients', patient[0]);
                res.json({ patientData: patient});
            }
            else{
                console.error('Patient not found', doctorName); 
                res.status(401).json({ success: false, message: 'Patient not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    //SEARCH RECORDS GIVEN DOCTOR NAME, PATIENT_ID
    app.post('/inpatientRecordDoc', async (req, res) => {
        try{
            const { patientId, doctorName } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select r.record_id, r.ip_id, r.admission_date, r.discharge_date, r.diagnosis, r.sick_room, n.fname || ' ' || n.lname as nurse_name, r.total_fee
                from inpatient_record r, inpatient i, employee n, employee d, treat t, treatment tm
                where i.id = r.ip_id and i.id = :patientId and n.unique_code = i.nurse_uc
                and d.unique_code = t.doctor_id and t.ip_id = r.ip_id
                and tm.treatment_id = t.treatment_id and tm.record_id = r.record_id
                and d.fname || ' ' || d.lname like :doctorName`,
                {patientId, doctorName}
            );
            await connection.close();
            if (result.rows.length > 0){
                const record = result.rows
                console.log('Found record', record[0][0]);
                res.json({ inpatient_record : record });
            }
            else{
                console.error('Record not found', patientId, doctorName); 
                res.status(401).json({ success: false, message: 'Record not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/outpatientRecordDoc', async (req, res) => {
        try{
            const { patientId, doctorName } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select r.record_id, r.op_id, r.total_fee, d.fname || ' ' || d.lname
                from outpatient_record r, outpatient o, examine e, employee d, examination ex
                where o.id = r.op_id and o.id = :patientId and
                e.doctor_id = d.unique_code and e.op_id = o.id
                and ex.exam_id = e.exam_id and ex.record_id = r.record_id
                and d.fname || ' ' || d.lname like :doctorName`,
                {patientId, doctorName}
            );
            await connection.close();
            if (result.rows.length > 0){
                const record = result.rows
                console.log('Found record', record[0][0]);
                res.json({ inpatient_record : record });
            }
            else{
                console.error('Record not found', patientId, doctorName); 
                res.status(401).json({ success: false, message: 'Record not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    //SEARCH TREATMENT/ EXAMINATION ON RECORD_ID, DOCTOR_NAME
    app.post('/inpatientTreatmentDoc', async (req, res) => {
        try{
            const { recordID, doctorName } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select tm.treatment_id, tm.result, TO_CHAR(tm.start_date, 'dd-mm-yyyy'), TO_CHAR(tm.end_date, 'dd-mm-yyyy'), d.fname || ' ' || d.lname, m.name, u.dosage*m.current_price
                from treatment tm, treat t, employee d, treat_use_med u, medication m
                where tm.treatment_id = t.treatment_id and d.unique_code = t.doctor_id and tm.record_id = :recordID 
                and u.treatment_id = tm.treatment_id and m.unique_code = u.med_id
                and d.fname || ' ' || d.lname like :doctorName`,
                {recordID, doctorName}
            );
            await connection.close();
            if (result.rows.length > 0){
                const treatments = result.rows
                console.log('Found treatment', treatments[0][0]);
                res.json({ inpatient_treatment : treatments });
            }
            else{
                console.error('Treatment not found', recordID, doctorName); 
                res.status(401).json({ success: false, message: 'Treatment not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/outpatientExaminationDoc', async (req, res) => {
        try{
            const { recordID, doctorName } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select ex.exam_id, ex.result, TO_CHAR(ex.examinate_date, 'dd-mm-yyyy'), TO_CHAR(ex.next_ex, 'dd-mm-yyyy'), d.fname || ' ' || d.lname, m.name, u.dosage*m.current_price
                from examination ex, examine e, employee d, exam_use_med u, medication m
                where ex.exam_id = e.exam_id and d.unique_code = e.doctor_id and ex.record_id = :recordID
                and u.exam_id = ex.exam_id and m.unique_code = u.med_id
                and d.fname || ' ' || d.lname like :doctorName`,
                {recordID, doctorName}
            );
            await connection.close();
            if (result.rows.length > 0){
                const examinations = result.rows
                console.log('Found examination', examinations[0][0]);
                res.json({ outpatient_examination : examinations });
            }
            else{
                console.error('Examination not found', recordID, doctorName); 
                res.status(401).json({ success: false, message: 'Examination not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    //ADD PATIENT
    app.post('/addPatient', async (req, res) => {
        try{
            const { id, ipcode, opcode, fname, lname, sex, address, dob, phone_no, nurse_uc } = req.body;
            const connection = await pool.getConnection();
            let result1, result2;
            if(ipcode){
                result1 = await connection.execute(
                    `INSERT INTO INPATIENT VALUES (:id, :ipcode, :fname, :lname, :sex, :address, TO_DATE(:dob, 'YYYY-MM-DD'), to_number(:phone_no), :nurse_uc)`,
                    { id, ipcode, fname, lname, sex, address, dob, phone_no, nurse_uc}
                );
            }
            if(opcode){
                result2 = await connection.execute(
                    `INSERT INTO OUTPATIENT VALUES (:id, :opcode, :fname, :lname, :sex, :address, TO_DATE(:dob, 'YYYY-MM-DD'), to_number(:phone_no))`,
                    {id, ipcode, fname, lname, sex, address, dob, phone_no}
                );
            }
            if ((result1?.rowsAffected === 1 || !ipcode) && (result2?.rowsAffected === 1 || !opcode)) {
                res.status(200).json({ message: 'Data added successfully to inpatient and/or outpatient' });
            } 
            else {
            res.status(500).json({ message: 'Failed to add data to inpatient and/or outpatient' });
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
}).catch(err => {
    console.error('Database connection error:', err);
});
