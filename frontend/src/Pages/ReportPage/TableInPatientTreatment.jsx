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
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import Detail from './InPatientDetail'


function totalFeeCalculation(treatementFee ,medications) {
  let total = treatementFee;
  medications.forEach((medication) => {
    total += medication.priceperbox * medication.quantity;
  });
  return total;
}

function createData(treatmentId, result, startDate, endDate, doctor, medications, fee) {
  return { treatmentId, result, startDate, endDate, doctor, medications, fee, totalFee: totalFeeCalculation(fee, medications) };
}


// this data will need to include
// Treatment ID (TREAMENT table)
// Result (TREATMENT table)
// Start date (TREATMENT table)
// End date (TREATMENT table)
// Doctor (TREAT table)
// Medication (use TREATMENT table)
// fee (TREATMENT table)

async function getData() {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
}


export default function TableInPatientTreatment() {
  //ROW DATA ADJUST AND QUERY IT TO CREATE DATA FOR TABLE
  const [rows, setRows] = useState([
    createData(1, "Positive", "2022-01-01", "2022-01-10", "Dr. Smith", [{ name: 'medicine A', quantity: 5, priceperbox: 5}, { name: 'medicine A', quantity: 5, priceperbox: 5}, { name: 'medicine A', quantity: 5, priceperbox: 5}], 25 ),
    createData(2, "Negative", "2022-01-02", "2022-01-12", "Dr. Johnson", [{ name: 'medicine B', quantity: 1, priceperbox: 150}], 150 ),
    createData(3, "Positive", "2022-01-03", "2022-01-14", "Dr. Williams", [{ name: 'medicine C', quantity: 1, priceperbox: 500}], 200 ),
    createData(4, "Negative", "2022-01-04", "2022-01-16", "Dr. Brown", [{ name: 'medicine D', quantity: 1, priceperbox: 250}], 250 ),
    createData(5, "Positive", "2022-01-05", "2022-01-18", "Dr. Davis", [{ name: 'medicine E', quantity: 1, priceperbox: 300}], 300 )
  ]);
  const [showDetail, setShowDetail] = useState(true);
  const [detail, setDetail] = useState({});
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  
  
  const onClickFunc = (detail) => {
    setShowDetail(!showDetail);
    setDetail(detail);
  }
  function handleChangePage(event, newPage) {
    setPage(newPage);
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
      const newSelected = rows.map((n) => n.treatmentId);
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

  // This code run once on mount.
  useEffect(() => {
    // getData().then((data) => {
    //   setRows(data);
    // });
    console.log('retreive inpatient treatement data');
  }, []);

  return (
    <>
      since we don't fetch any new data yet so all the show detail table in look the same
      <TableContainer component={Paper} style={{ background: 'var(--m-3-sys-light-surface, #FFF8F6)' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" style={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Treatment ID</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Result&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Start date&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>End date&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Doctor&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>Medication&nbsp;</TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>fee&nbsp;</TableCell>
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
                const isItemSelected = isSelected(row.treatmentId);
                return (
                  <TableRow
                    key={row.treatmentId}
                    hover={true}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={(event) => handleClick(event, row.treatmentId)}
                  >
                    <TableCell component="th" scope="row">
                      {row.treatmentId}
                    </TableCell>
                    <TableCell align="right">{row.result}</TableCell>
                    <TableCell align="right">{row.startDate}</TableCell>
                    <TableCell align="right">{row.endDate}</TableCell>
                    <TableCell align="right">{row.doctor}</TableCell>
                    <TableCell align="right">
                    {row.medications.map((medication,index) => {
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
                    <TableCell
                      align="center"
                      role="checkbox"
                      sx={{ width: 24, height: 24 }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                  </TableRow>);
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
          if (isSelected(row.treatmentId)) {
            return <Detail key={row.treatmentId} data={row} />
          }})
      }
    </>

  );
}