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
import { usePatientSearch } from "../../context/PatientSearchContext.jsx";
import { usePatient } from "../../context/PatientInfoContext.jsx";
import "./style.css";
const Container = styled.div`
  padding: 32px;
`;

function createData(id, fName, lName, phoneNumeber, address) {
  return { id, lName, fName, phoneNumeber, address };
}

//ROW DATA ADJUST AND QUERY IT TO CREATE DATA FOR TABLE

async function getData (patientID, patientName) {
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
      console.log('server respone', data);
      console.log(data);
      if(data && data.patientData){
        const patient = data.patientData;
        console.log(patient);
        return( patient.rows.map((item) => {
          return {
            id: item[0],
            ipCode: item[1] ? item[1] : 'N/A',
            opCode: item[2] ? item[2] : 'N/A',
            fName: item[3],
            lName: item[4],
            phoneNumber: item[5],
            address: item[6],
            dob: new Date(item[7]).toLocaleDateString(),
            gender: item[8] === 'F' ? 'female' : 'male',
          };
        }));
      }
    }
    else{
      console.error('Server response not OK:', response.statusText);
    }
  }catch (error){
    console.error('Error:', error);
  }
}


const SearchPage = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const {patientSearch, setPatientSearch} = usePatientSearch();
  const [rows, setRows] = [patientSearch, setPatientSearch];
  const setPatientInfo = usePatient();

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
    const returnedData = await getData(patientID, patientName);
    console.log('the return data');
    console.log(returnedData);
    if (returnedData) 
    {
      setRows(returnedData)
    }
    else setRows([]);
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
    try{
      const response = await fetch('/addPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: formData.get("patientID"),
          fname: formData.get("firstName"),
          lname: formData.get("lastName"),
          opcode: formData.get("opCode"),
          ipcode: formData.get("ipCode"),
          dob: formData.get("dateOfBirth"),
          sex: formData.get("gender") ? 'F' : 'M',
          phone_no: formData.get("phoneNumber"),
          address: formData.get("address"),
          nurse_uc: formData.get("nurseID"),
        }),
      });
      if(response.ok){
        const data = await response.json();
        console.log(data);
      }
      else{
        console.error('Server response not OK:', response.statusText);
      }
    }catch (error){
      console.error('Error:', error);
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
