import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Link} from 'react-router-dom';
import { 
    Typography,
    Container, 
    Box, 
    Stack,
    TextField,
    Button,
  } from "@mui/material";
import Detail from './InPatientDetail';
import { usePatient } from "../../context/PatientInfoContext.jsx";

function createData(recordID, ipCode, dateOfAddmission, dischargeDate, diagnosis, sickRoom, nurse, totalFee) {
  return { recordID, ipCode, dateOfAddmission, dischargeDate, diagnosis, sickRoom, nurse, totalFee };
}


// This data will need to include
// Record ID
// IP Code (inpatient table)
// Date of addmission
// Discharge date
// Diagnosis
// Sick room 
// Nurse 
// Total fee
// OTHER THAN IP CODE ALL OTHER DATA WILL BE FROM INPATIENT RECORD TABLE

async function getData(patientID) {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
  try {
    const response = await fetch('/inpatientRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientID }),
    });
    if(response.ok){
      const data = await response.json();
      if (data && data.inpatient_record && data.inpatient_record.length > 0) {
        // maper function
        return data.inpatient_record.map(record => 
          createData(record[0], record[1], record[2], record[3], record[4], record[5], record[6], record[7])
          );
      }
      return null;
    }
    else{
      console.error('Server response not OK:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Fetch data error:', error);
    return null; 
  }
}

export default function TableInPatient({showTreatment, setShowTreatment, setRecordTreatmentShow, ...rest}) {

  //ROW DATA ADJUST AND QUERY IT TO CREATE DATA FOR TABLE
  const [rows, setRows] = useState([]);
  const [showDetail,setShowDetail]= [showTreatment, setShowTreatment]; 
  const { patientInfo } = usePatient();
  const { patientID } = patientInfo;

  const onClickFunc=(recordID)=>{
    setShowDetail(!showDetail);
    setRecordTreatmentShow(recordID);
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  // This function will run once when the component is mounted
  useEffect(() => {
    getData(patientID).then((data) => {
      if(data === null){
        setRows([]);
      }else{
        setRows(data);
      }
    });
  }, []);
  
  return (
    <>
    <TableContainer component={Paper} {...rest} style={{background: 'var(--m-3-sys-light-surface, #FFF8F6)'}} >
      <Table stickyHeader sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" style={{fontWeight:"bold"}}>Record ID</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>IP Code&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Date of addmission&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Discharge date&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Diagnosis&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Sick room&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Nurse&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Total fee&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow
              key={row.recordID}
              hover={true}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.recordID}
              </TableCell>
              <TableCell align="right">{row.ipCode}</TableCell>
              <TableCell align="right">{row.dateOfAddmission}</TableCell>

              <TableCell align="right">{row.dischargeDate}</TableCell>
              <TableCell align="right">{row.diagnosis}</TableCell>
              <TableCell align="right">{row.sickRoom}</TableCell>
              <TableCell align="right">{row.nurse}</TableCell>
              <TableCell align="right">{row.totalFee}</TableCell>
              <TableCell align="center" sx={{width: 24, height: 24}}>
              <Button variant="contained" onClick={() => onClickFunc(row.recordID)} style={{ backgroundColor: "var(--m-3-sys-light-surface-container-high, #F3E5E3)", color: "red" }}>
              Show detail
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[0, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       
        
    </TableContainer>
    {/* {showDetail && <Detail data = {detail}/>} */}
    </>
    
  );
}