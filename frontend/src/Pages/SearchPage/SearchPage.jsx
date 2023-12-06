import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import { Button, Modal, Stack, Typography } from "@mui/material";
// import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SearchForm from "./SearchForm";
import AddForm from "./AddForm";
import TableContent from "./TableContent";
import "./style.css";
const Container = styled.div`
  padding: 32px;
`;

function createData(id, lName, fName, phoneNumeber, doctorTreat) {
  return { id, lName, fName, phoneNumeber, doctorTreat };
}

//ROW DATA ADJUST AND QUERY IT TO CREATE DATA FOR TABLE

const SearchPage = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [rows, setRows] = useState([
    // createData(1, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(2, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(3, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(4, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
    // createData(5, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B')
  ]);

  // search submit function
  async function searchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // get the data of the form
    console.log('patient id:', formData.get("patientID"));
    console.log('patient name:', formData.get("patientName"));
    console.log("search submit");

    const patientID = formData.get("patientID");
    const patientName = formData.get("patientName");
    try{
      const response = await fetch('/searchID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientID, patientName }),
      });
      if(response.ok){
        const data = await response.json()
        console.log(data);
        if(data && data.patientData){
          const patient = data.patientData;
          setRows([
            ...rows,
            createData(patient[0], patient[1], patient[2], patient[3], patient[4]),
          ]);
        }
      }
      else{
        console.error('Server response not OK:', response.statusText);
      }
    }catch (error){
      console.error('Error:', error);
    }

    // const response = await fetch('http://localhost:5000/api/inpatient')
    // .then(res => res.json())
    // .catch(err => {
    //   setRows([
    //     ...rows,
    //     createData('123', 'Le', 'Viet Tung', '937506949', '23/9 khu 12 xã long Đức'),
    //   ]);
    // });
  }

  async function addSubmit(event) {
    event.preventDefault();
    // get all the data of the form field

    const formData = new FormData(event.target);

    // get form of add form data
    console.log(formData.get("patientID"));
    console.log(formData.get("firstName"));
    console.log(formData.get("lastName"));
    console.log(formData.get("opCode"));
    console.log(formData.get("ipCode"));
    console.log(formData.get("dateOfBirth"));
    console.log(formData.get("gender"));
    console.log(formData.get("phoneNumber"));
    console.log(formData.get("address"));
    const response = await fetch('http://localhost:5000/api/inpatient')
    .then(res => res.json())
    .catch(err => {
      setRows([
        ...rows,
        createData(1, 'Le', 'Viet Tung', 937506949, 'Nguyen Van A Le Thi B'),
      ]);
    });
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
              Search Page
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: "var(--m-3-sys-light-surface-container-high, #F3E5E3)", color: "red" }}
              onClick={onClickFuncAdd}
            >
              Add
            </Button>
            <AddForm openAdd={openAdd} setOpenAdd={setOpenAdd} addSubmit={addSubmit}/>
          </Stack>
        </Stack>

        <TableContent rows={rows}/>
      </Container>
    </>
  );
};

export default SearchPage;
