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
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Stack,
  TextField,
  Button,
  Checkbox
} from "@mui/material";
import Detail from './OutPaitientDetail';

function totalFeeCalculation(treatementFee ,medications) {
  let total = treatementFee;
  medications.forEach((medication) => {
    total += medication.priceperbox * medication.quantity;
  });
  return total;
}

function createData(examId, result, examDate, nextExam, diagnosis, doctor, medications, fee) {
  return { examId, result, examDate, nextExam, diagnosis, doctor, medications, fee, totalFee: totalFeeCalculation(fee, medications) };
}


// this data will need to include
// Exam ID (EXAMINATION table)
// Result (EXAMINATION table)
// Exam date (EXAMINATION table)
// Next exam (EXAMINATION table)
// Diagnosis (EXAMINATION table)
// Doctor (EXAMINE table)
// Medication (USE EXAM table)
// fee (calculated based on medication fee, exam fee)

async function getData() {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
}

export default function TableOutPatientExamine() {
  //ROW DATA ADJUST AND QUERY IT TO CREATE DATA FOR TABLE
  const [rows, setRows] = useState([
    createData(1, 'Positive', '2022-01-01', '2022-01-05', 'Common Cold', 'Dr. Smith', [{ name: 'medicine A', quantity: 5, priceperbox: 5}, { name: 'medicine A', quantity: 5, priceperbox: 5}, { name: 'medicine A', quantity: 5, priceperbox: 5}], 1000),
    createData(2, 'Negative', '2022-02-01', '2022-02-05', 'Influenza', 'Dr. Johnson', [{ name: 'medicine A', quantity: 5, priceperbox: 5}], 1500),
    createData(3, 'Positive', '2022-03-01', '2022-03-05', 'Pneumonia', 'Dr. Williams', [{ name: 'medicine A', quantity: 5, priceperbox: 5}], 2000),
    // Add more rows as needed
  ]);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState({});
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  
  const onClickFunc = (detail) => {
    setShowDetail(!showDetail);
    setDetail(detail);
  }
  
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    console.log(+event.target.value);
    console.log(event.target.value);
    setPage(0);
  }

    // select all for the header check box
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.examId);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // select one row
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  useEffect(() => {
    // getData().then((data) => {
    //   setRows(data);
    // });
    console.log('retreieve outpatient examine data');
  }, []);

  return (
    <>
    since we don't fetch any new data yet so all the show detail table in look the same
      <TableContainer component={Paper} style={{ background: 'var(--m-3-sys-light-surface, #FFF8F6)' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Exam ID&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Result&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Exam date&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Next exam&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Diagnosis&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Doctor&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Medication&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Fee&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Total fee&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
              <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={(event) => handleSelectAllClick(event)}
                />
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.examId);
                return (
                  <TableRow
                    key={row.examId}
                    hover={true}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={(event) => handleClick(event, row.examId)}
                  >
                    <TableCell component="th" scope="row">
                      {row.examId}
                    </TableCell>
                    <TableCell align="right">{row.result}</TableCell>
                    <TableCell align="right">{row.examDate}</TableCell>
                    <TableCell align="right">{row.nextExam}</TableCell>
                    <TableCell align="right">{row.diagnosis}</TableCell>
                    <TableCell align="right">{row.doctor}</TableCell>
                    <TableCell align="right">
                    {row.medications.map((medication, index) => {
                      return (
                        <div key={index}>
                          {medication.name} * {medication.quantity}: {medication.priceperbox * medication.quantity} $
                          <br/>
                        </div>
                      );
                    })}
                    </TableCell>
                    <TableCell align="right">{row.fee} $</TableCell>
                    <TableCell align="right">{row.totalFee} $</TableCell>
                    <TableCell align="center" sx={{ width: 24, height: 24 }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
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
      {
        rows.map(row => {
          if (isSelected(row.examId)) {
            return <Detail key={row.examId} data={row} />
          }})
      }
    </>

  );
}