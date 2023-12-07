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
  user: 'TREERSPEAKING',
  password: 'Clash123',
  connectString: 'localhost:1521/ORCLPDB',
  multipleStatements: false
}).then(pool => {
  app.listen(PORT, () => {
    console.log('Server is running on port 3001');
  });
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const connection = await pool.getConnection();
      const lettersNumbersAndSpacePattern = /^[A-Za-z0-9\s]+$/;

      if (!username.match(lettersNumbersAndSpacePattern)) {
        console.error('Only letters, numbers, and spaces are allowed, no special characters!');
        return res.status(402).json({ err: 'Only letters, numbers, and spaces are allowed, no special characters!' });
      }

      const result = await connection.execute(
        'SELECT * FROM USERS WHERE USERNAME = :username AND PASSWORD =:password',
        { username, password }
      );
      await connection.close();
      if (result.rows.length > 0) {
        console.log('Login successful for:', username);
        res.json({ success: true });
      }
      else {
        console.error('Invalid credentials for:', username);
        res.status(401).json({ success: false, message: 'Username or Password is wrong' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  app.post('/searchID', async (req, res) => {
    try {
      const { patientID, patientName } = req.body;
      const connection = await pool.getConnection();
      const result = await connection.execute(
        `
        select distinct id, ip, op, fname, lname, phone_no, address, dob, gender from
        ( SELECT i.id, i.ipcode AS ip, 
        case when id in (select id from outpatient) then (select opcode from outpatient o where o.id = i.id) else null end as op, 
        i.fname, i.lname, i.phone_no, i.address, i.dob, i.gender
        FROM inpatient i
        UNION ALL
        SELECT o.id, 
        case when id in (select id from inpatient) then (select ipcode from inpatient i where i.id = o.id) else null end as ip, 
        o.opcode AS op, o.fname, o.lname, o.phone_no, o.address, o.dob, o.gender
        FROM outpatient o )
        where id = :patientID OR (:patientName IS NOT NULL AND fname || ' ' || lname like '%' || :patientName || '%')
        `,
        { patientID, patientName }
      );
      await connection.close();
      console.log(result);
      if (result.rows.length > 0) {
        const patient = result
        console.log('Found patient', patient);
        res.json({ patientData: patient });
      }
      else {
        console.error('Patient not found', patientID, patientName);
        res.status(401).json({ success: false, message: 'Patient not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  app.post('/inpatientRecord', async (req, res) => {
    try {
      const { patientID } = req.body;
      const connection = await pool.getConnection();
      const result = await connection.execute(
        `select r.record_id, r.ip_id, TO_CHAR(r.admission_date, 'dd-mm-yyyy'), TO_CHAR(r.discharge_date, 'dd-mm-yyyy'), r.diagnosis, r.sick_room, n.fname || ' ' || n.lname as nurse_name, r.total_fee 
                from inpatient_record r, inpatient i, employee n
                where i.id = r.ip_id and i.id = :patientID and n.unique_code = i.nurse_uc`,
        { patientID }
      );
      await connection.close();
      if (result.rows.length > 0) {
        const record = result.rows
        console.log('Found record', record[0][0]);
        res.json({ inpatient_record: record });
      }
      else {
        console.error('Record not found', patientID);
        res.status(401).json({ success: false, message: 'Record not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  app.post('/inpatientTreatment', async (req, res) => {
    try {
      const { recordID } = req.body;
      const connection = await pool.getConnection();
      const result = await connection.execute(
        `select tm.treatment_id, tm.result, TO_CHAR(tm.start_date, 'dd-mm-yyyy'), TO_CHAR(tm.end_date, 'dd-mm-yyyy'), d.fname || ' ' || d.lname, m.name, u.dosage,u.dosage*m.current_price, fee
                from treatment tm, treat t, employee d, treat_use_med u, medication m
                where tm.treatment_id = t.treatment_id and d.unique_code = t.doctor_id and tm.record_id = :recordID 
                and u.treatment_id = tm.treatment_id and m.unique_code = u.med_id`,
        { recordID }
      );
      await connection.close();
      if (result.rows.length > 0) {
        const treatments = result.rows
        console.log('Found treatment', treatments);
        res.json({ inpatient_treatment: treatments });
      }
      else {
        console.error('Treatment not found', recordID);
        res.status(401).json({ success: false, message: 'Treatment not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  app.post('/outpatientRecord', async (req, res) => {
    try {
      const { patientID } = req.body;
      const connection = await pool.getConnection();
      const result = await connection.execute(
        `select r.record_id, r.op_id, r.total_fee 
                from outpatient_record r, outpatient o
                where o.id = r.op_id and o.id = :patientID`,
        { patientID }
      );
      await connection.close();
      if (result.rows.length > 0) {
        const record = result.rows
        console.log('Found record', record[0]);
        res.json({ outpatient_record: record });
      }
      else {
        console.error('Record not found', patientID);
        res.status(401).json({ success: false, message: 'Record not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  app.post('/outpatientExamination', async (req, res) => {
    try {
      const { recordID } = req.body;
      const connection = await pool.getConnection();
      const result = await connection.execute(
        `select ex.exam_id, ex.result, TO_CHAR(ex.examinate_date, 'dd-mm-yyyy'), TO_CHAR(ex.next_ex, 'dd-mm-yyyy'), ex.diagnosis, d.fname || ' ' || d.lname, m.name, u.dosage ,u.dosage*m.current_price, fee
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
                `SELECT DISTINCT  doctor_id, id, ip, op, fname, lname, phone_no, address, dob, gender  FROM
                (SELECT i.id, i.ipcode AS ip, 
                CASE WHEN id IN (SELECT id FROM outpatient) THEN (SELECT opcode FROM outpatient o WHERE o.id = i.id) ELSE NULL END AS op, 
                i.fname, i.lname, i.phone_no, i.address, i.dob, i.gender, d.unique_code as doctor_id
                FROM inpatient i, employee d, treat t
                WHERE t.doctor_id = d.unique_code AND t.ip_id = i.id AND d.fname || ' ' || d.lname LIKE '%'||:doctorName||'%'
                UNION ALL
                SELECT o.id, 
                CASE WHEN id IN (SELECT id FROM inpatient) THEN (SELECT ipcode FROM inpatient i WHERE i.id = o.id) ELSE NULL END AS ip, 
                o.opcode AS op, o.fname, o.lname, o.phone_no, o.address, o.dob, o.gender, d.unique_code as doctor_id
                FROM outpatient o , employee d, examine e
                WHERE e.doctor_id = d.unique_code AND e.op_id = o.id AND d.fname || ' ' || d.lname LIKE '%'||:doctorName||'%')`,
                {doctorName}
            );
            await connection.close();
            if (result.rows.length > 0){
                const patient = result.rows
                console.log(result.rows);
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
            const { patientID, doctorID } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select r.record_id, r.ip_id, TO_CHAR(r.admission_date, 'dd-mm-yyyy'), r.discharge_date, r.diagnosis, r.sick_room, n.fname || ' ' || n.lname as nurse_name, r.total_fee
                from inpatient_record r, inpatient i, employee n, employee d, treat t, treatment tm
                where i.id = r.ip_id and i.id = :patientID and n.unique_code = i.nurse_uc
                and d.unique_code = t.doctor_id and t.ip_id = r.ip_id
                and tm.treatment_id = t.treatment_id and tm.record_id = r.record_id
                and d.unique_code = :doctorID`,
                {patientID, doctorID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const record = result.rows
                console.log('Found record', record[0][0]);
                res.json({ inpatient_record : record });
            }
            else{
                console.error('Record not found', patientID, doctorID); 
                res.status(401).json({ success: false, message: 'Record not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/outpatientRecordDoc', async (req, res) => {
        try{
            const { patientID, doctorID } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select r.record_id, r.op_id, r.total_fee, d.fname || ' ' || d.lname
                from outpatient_record r, outpatient o, examine e, employee d, examination ex
                where o.id = r.op_id and o.id = :patientID and
                e.doctor_id = d.unique_code and e.op_id = o.id
                and ex.exam_id = e.exam_id and ex.record_id = r.record_id
                and d.unique_code = :doctorID`,
                {patientID, doctorID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const record = result.rows
                console.log('Found record', record[0][0]);
                res.json({ outpatient_record : record });
            }
            else{
                console.error('Record not found', patientID, doctorID); 
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
            const { recordID, doctorID } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select tm.treatment_id, tm.result, TO_CHAR(tm.start_date, 'dd-mm-yyyy'), TO_CHAR(tm.end_date, 'dd-mm-yyyy'), d.fname || ' ' || d.lname, m.name, u.dosage, u.dosage*m.current_price, fee
                from treatment tm, treat t, employee d, treat_use_med u, medication m
                where tm.treatment_id = t.treatment_id and d.unique_code = t.doctor_id and tm.record_id = :recordID 
                and u.treatment_id = tm.treatment_id and m.unique_code = u.med_id
                and d.unique_code = :doctorID`,
                {recordID, doctorID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const treatments = result.rows
                console.log('Found treatment', treatments[0][0]);
                res.json({ inpatient_treatment : treatments });
            }
            else{
                console.error('Treatment not found', recordID, doctorID); 
                res.status(401).json({ success: false, message: 'Treatment not found'});
            }
        } catch (error){
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });
    app.post('/outpatientExaminationDoc', async (req, res) => {
        try{
            const { recordID, doctorID } = req.body;
            const connection = await pool.getConnection();
            const result = await connection.execute(
                `select ex.exam_id, ex.result, TO_CHAR(ex.examinate_date, 'dd-mm-yyyy'), TO_CHAR(ex.next_ex, 'dd-mm-yyyy'), ex.diagnosis, d.fname || ' ' || d.lname, m.name, u.dosage, u.dosage*m.current_price, fee
                from examination ex, examine e, employee d, exam_use_med u, medication m
                where ex.exam_id = e.exam_id and d.unique_code = e.doctor_id and ex.record_id = :recordID
                and u.exam_id = ex.exam_id and m.unique_code = u.med_id
                and d.unique_code = :doctorID`,
                {recordID, doctorID}
            );
            await connection.close();
            if (result.rows.length > 0){
                const examinations = result.rows
                console.log('Found examination', examinations[0][0]);
                res.json({ outpatient_examination : examinations });
            }
            else{
                console.error('Examination not found', recordID, doctorID); 
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
            const options = { autoCommit: true };
            let result1, result2;
            if(ipcode){
                result1 = await connection.execute(
                    `INSERT INTO INPATIENT VALUES (:id, :ipcode, :fname, :lname, :sex, :address, TO_DATE(:dob, 'YYYY-MM-DD'), to_number(:phone_no), :nurse_uc)`,
                    { id, ipcode, fname, lname, sex, address, dob, phone_no, nurse_uc}, options
                );
            }
            if(opcode){
                result2 = await connection.execute(
                    `INSERT INTO OUTPATIENT VALUES (:id, :opcode, :fname, :lname, :sex, :address, TO_DATE(:dob, 'YYYY-MM-DD'), to_number(:phone_no))`,
                    {id, opcode, fname, lname, sex, address, dob, phone_no}, options
                );
            }
            await connection.close();
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
