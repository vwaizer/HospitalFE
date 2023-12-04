--2.1
--a. Increase Inpatient Fee to 10% for all the current inpatients who are admitted to
--hospital from 01/09/2020.
UPDATE INPATIENT_RECORD
SET TOTAL_FEE = 1.1*TOTAL_FEE
WHERE ADMISSION_DATE >= TO_DATE(TO_DATE('2020-09-01', 'YYYY-MM-DD'));
--Check:
SELECT * FROM INPATIENT_RECORD
--b. Select all the patients (outpatient & inpatient) of the doctor named ‘Nguyen Van 
--A’.
((SELECT O.ID, O.FNAME, O.OPCODE AS "OP/IP CODE", O.LNAME, O.GENDER, O.ADDRESS, O.DOB, O.PHONE_NO
FROM OUTPATIENT O, EXAMINE E, EMPLOYEE D
WHERE D.FNAME LIKE '%Nguyen' AND D.LNAME LIKE '%Van A%'
AND E.DOCTOR_ID = D.UNIQUE_CODE AND E.OP_ID = O.ID)
UNION
(SELECT I.ID, I.FNAME, I.IPCODE AS "OP/IP CODE", I.LNAME, I.GENDER, I.ADDRESS, I.DOB, I.PHONE_NO
FROM INPATIENT I, TREAT T, EMPLOYEE D
WHERE D.FNAME LIKE '%Nguyen%' AND D.LNAME LIKE '%Van A%'
AND T.DOCTOR_ID = D.UNIQUE_CODE AND T.IP_ID = I.ID));
--c. Write a function to calculate the total medication price a patient has to pay for 
--each treatment or examination (1 mark).
--Input: Patient ID
--Output: A list of payment of each treatment or examination
CREATE OR REPLACE FUNCTION total_med_price
(patient_id IN INPATIENT.ID%TYPE)
RETURN NUMBER 
AS total_price
BEGIN

END total_med_price;
--d. Write a procedure to sort the doctor in increasing number of patients he/she 
--takes care in a period of time (1 mark). 
--Input: Start date, End date
--Output: A list of sorting doctors. 