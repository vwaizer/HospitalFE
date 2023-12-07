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
import { usePatient } from "../../context/PatientInfoContext.jsx";






async function getData() {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
}

export default function TableContent({rows, ...rest}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const {setPatientInfo} = usePatient();

  function onClickFunc(row){
    setPatientInfo({
      patientID: row.id,
      patientFName: row.fName,
      patientLName: row.lName,
      patientPhoneNumber: row.phoneNumber,
      patientAddress: row.address,
      patientGender: row.gender,
      patientBirthDate: row.dob,
      patientIpCode: row.ipCode,
      patientOpCode: row.opCode,
    });
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }
  
  return (
    <TableContainer component={Paper} style={{background: 'var(--m-3-sys-light-surface, #FFF8F6)', maxHeight: '700px'}}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Last Name</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>First Name&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Phone Number&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}>Address&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow
              key={row.id}
              hover={true}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.fName}</TableCell>
              <TableCell align="right">{row.lName}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="center" sx={{width: 24, height: 24}}>
              <Link to="/Home/Report" onClick={() => onClickFunc(row)}> 
                <ArrowRightIcon/>
              </Link>
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