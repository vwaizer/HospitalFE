import { useState, useEffect } from 'react';
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
import { usePatient } from "../../context/PatientInfoContext.jsx";

function createData(recordId, opCode, dateStart, dateEnd, totalFee) {
  return { recordId, opCode, dateStart, dateEnd, totalFee };
}



// this data will include 
// Record ID 
// OP Code (from out patient table)
// Date start 
// Date end 
// Total fee 
// OTHER THAN OP CODE ALL OTHER DATA WILL BE FROM OUTPATIENT RECORD TABLE (OUT PATIENT RECORD TABLE IS NOT PRESENT IN THE REALTIONAL SCHEMA DUE JUST CREATED)

async function getData(patientId) {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
}

export default function TableOutPatient({showExamine, setShowExamine, setRecordExamineShow}) {
  //ROW DATA ADJUST AND QUERY IT TO CREATE DATA FOR TABLE
  const [rows, setRows] = useState([
    createData(1, 'OP001', '2022-01-01', '2022-01-05', 1000),
    createData(2, 'OP002', '2022-02-01', '2022-02-05', 1500),
    createData(3, 'OP003', '2022-03-01', '2022-03-05', 2000),
    // Add more rows as needed
  ]);
  const [showDetail,setShowDetail]= [showExamine, setShowExamine];
  const {patientID} = usePatient();
    const onClickFunc=(recordId)=>{
        setShowDetail(!showDetail);
        setRecordExamineShow(recordId);
    }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    console.log(+event.target.value);
    console.log(event.target.value);
    setPage(0);
  }
  
  useEffect(() => {
    // getData(patientId).then((data) => {
    //   setRows(data);
    // });
    console.log('retreieve outpatient record data');
  }, []);

  return (
    <TableContainer component={Paper} style={{background: 'var(--m-3-sys-light-surface, #FFF8F6)'}}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Record ID</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>OP code&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Date start&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Date end&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Total fee&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <TableRow
              key={row.recordId}
              hover={true}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.recordId}
              </TableCell>
              <TableCell align="right">{row.opCode}</TableCell>
              <TableCell align="right">{row.dateStart}</TableCell>
              <TableCell align="right">{row.dateEnd}</TableCell>
              <TableCell align="right">{row.totalFee}</TableCell>
              <TableCell align="center" sx={{width: 24, height: 24}}>
              <Button variant="contained" onClick={() => onClickFunc(row.recordId)} style={{ backgroundColor: "var(--m-3-sys-light-surface-container-high, #F3E5E3)", color: "red" }}>
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
    
  );
}