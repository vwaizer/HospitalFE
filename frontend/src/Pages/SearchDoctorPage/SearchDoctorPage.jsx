import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Stack, Typography } from "@mui/material";
// import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import SearchForm from "./SearchForm";
import TableContent from "./TableContent";
import { useDoctorSearch } from "../../context/DoctorSearchContext";
import "./style.css";
const Container = styled.div`
  padding: 32px;
`;

function createData(doctorID, id, fName, lName, phoneNumeber, address) {
  return { doctorID ,id, lName, fName, phoneNumeber, address };
}

async function getData (doctorName) {
  try {
    const response = await fetch('/searchDoctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ doctorName }),
    });
    if(response.ok){
      const data = await response.json();
      console.log(data);
      if (data) {
        // maper function
        return data.patientData.map(record => {
          return(
          createData(record[0], record[1], record [2], record[3], record[4], record[5]));
        });
      }
      return [];
    }
    else{
      console.error('Server response not OK:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Fetch data error:', error);
    return []; 
  }
}

const SearchPage = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const { doctorSearch, setDoctorSearch } = useDoctorSearch();
  // const [rows, setRows] = useState([
    // createData(1, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(2, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(3, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(4, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(5, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B')
  // ]);

  const [rows, setRows] = [doctorSearch, setDoctorSearch]

  // search submit function
  async function searchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // get the data of the form
    console.log(formData.get("doctorID"));
    console.log(formData.get("doctorName"));
    console.log("search submit");
    const doctorName = formData.get("doctorName");
    const returneddata = await getData(doctorName);
    console.log('the return data', returneddata);
    
    if(returneddata){
      setRows(returneddata);
    }
    else{
      setRows([]);
    }
  }


  //open modal function
  const onClickFuncSearch = () => {
    setOpenSearch(true);
  }


  const onClickFuncAdd = () => {
    setOpenAdd(true);
  }
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (

    <>
      {/* <NavBar /> */}
      <Container>

        <Stack mb={5} direction="column" spacing={15}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h2" >
              Search Doctor Page
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              style={{ backgroundColor: "var(--m-3-sys-light-surface-container-high, #F3E5E3)", color: "red" }}
              onClick={onClickFuncSearch}
            >
              Search
            </Button>
            <SearchForm openSearch={openSearch} searchSubmit={searchSubmit} setOpenSearch={setOpenSearch} />
          </Stack>
        </Stack>

        <TableContent rows={rows}/>
      </Container>
    </>
  );
};

export default SearchPage;
