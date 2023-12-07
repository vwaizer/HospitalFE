import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Stack, Typography, Box, Container, Collapse } from "@mui/material";
// import Container from "@mui/material/Container";

import TableInPatient from "./TableInPatient.jsx";
import TableOutPatient from "./TableOutPatient.jsx";
import TableInPatientTreatment from "./TableInPatientTreatment.jsx";
import TableOutPatientExamine from "./TableOutPatientExamine.jsx";
import { usePatient } from "../../context/PatientInfoContext.jsx";
import "./reportpage.css"
import { Margin } from "@mui/icons-material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const CustomContainer = styled.div`
  margin: 32px;
`;

// get inpatient record and out patient record
async function getData(patientID) {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
}

const Report = () => {
  // record ID
  const [recordTreatmentShow, setRecordTreamentShow] = useState(0);
  // examine ID
  const [recordExamineShow, setRecordExamineShow] = useState(0);
  const [showInpatientRecord, setShowInpatientRecord] = useState(false);
  const [showOutPatientRecord, setShowOutPatientRecord] = useState(false);
  const [showTreatment, setShowTreatment] = useState(false);
  const [showExamine, setShowExamine] = useState(false);
  const { 
    patientID,
    patientFName,
    patientLName,
    patientPhoneNumber,
    patientAddress,
    patientGender,
    patientBirthDate,
    patientIpCode,
    patientOpCode,
   } = usePatient().patientInfo;
  function toggleInpatientRecord() {
    setShowInpatientRecord(!showInpatientRecord);
    setShowTreatment(false);
    // if (!showInpatientRecord) {
    //   setShowTreatment(false);
    // }
  }

  function toggleOutpatientRecord() {
    setShowOutPatientRecord(!showOutPatientRecord);
    setShowExamine(false);
    // if (showOutPatientRecord) {
    //   setShowExamine(false);
    // }
  }

  return (
    <>
      <Typography variant="h2" p={`32px`}>Doctor report</Typography>
      <Container maxWidth={false} sx={{ width: '85%' }} >
        <Stack mb={5} direction="column" spacing={10}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
          </Stack>
        </Stack>
        <Box sx={{border:1, borderRadius: '16px', borderColor: `primary.main`, p: 2}} >
          <Typography variant="h5" mx={2} my={1}>Patient ID: {patientID}</Typography>
          <Stack direction="row" justifyContent={'space-between'} sx={{border:1, borderRadius: '16px', borderColor: `secondary.main`}}>
            <Box m={2}>
              <Typography variant="h6">last name: {patientLName}</Typography>
              <Typography variant="h6">first name: {patientFName}</Typography>
              <Typography variant="h6">Address: {patientAddress}</Typography>
              <Typography variant="h6">Phone number: {patientPhoneNumber}</Typography>
            </Box>
            <Box m={2}>
              <Typography variant="h6">Ip Code: {patientIpCode}</Typography>
              <Typography variant="h6">Op Code: {patientOpCode}</Typography>
              <Typography variant="h6">DoB: {patientBirthDate}</Typography>
              <Typography variant="h6">Gender: {patientGender}</Typography>
            </Box>
          </Stack>
            {/* Inpatient Toggle Button */}
          <Box>
            <Button  onClick={toggleInpatientRecord} 
                sx={{fontSize: 24, width: `100%`, justifyContent: "space-between"}}
            >
            Show inpatient record {showInpatientRecord ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/> }
            </Button> 
            
          </Box>
          {/* Inpatient Record */}
          {/* Need to wrap this in a collapse so that it can be toggled */}
          <Collapse in={showInpatientRecord} timeout="auto" unmountOnExit>
            <Container>
              <TableInPatient showTreatment={showTreatment} setShowTreatment={setShowTreatment} setRecordTreatmentShow={setRecordTreamentShow}/>
            </Container>
          </Collapse>
          <Collapse in={showTreatment} timeout="auto" unmountOnExit>
            <Container >
              <TableInPatientTreatment recordTreatmentShow={recordTreatmentShow} sx={{ height: 0 }} />
            </Container>
          </Collapse>


          {/* Outpatient Toggle Button */}
          <Box>
          <Button onClick={toggleOutpatientRecord} sx={{fontSize: 24, width: `100%`, justifyContent: "space-between"}}>show outpatient record    {showOutPatientRecord ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/> }</Button>
          </Box>
          {/* Outpatient Record */}
          {/* Need to wrap this in a collapse so that it can be toggled */}
          <Collapse in={showOutPatientRecord} timeout="auto" unmountOnExit>
          <Container>
            <TableOutPatient showExamine={showExamine} setShowExamine={setShowExamine} setRecordExamineShow={setRecordExamineShow} />
          </Container>
          </Collapse>
          <Collapse in={showExamine} timeout="auto" unmountOnExit>
            <Container >
              <TableOutPatientExamine recordExamineShow={recordExamineShow} sx={{ height: 0 }} />
            </Container>
          </Collapse>
        </Box>
      </Container>
      {/* <TestTable /> */}
    </>
  );

  // return (
  //   <>
  //     {/* <NavBar /> */}
  //     <Container maxWidth={false} sx={{border: 1, width: '85%'}} >
  //       <Stack mb={5} direction="column" spacing={10}>
  //         <Stack direction="row" spacing={2} justifyContent="space-between">
  //           <Typography variant="h2">Report</Typography>
  //         </Stack>
  //         {/* --------------------------------------------------------------------------- */}
  //         patientID: {patientID}
  //         {/* --------------------------------------------------------------------------- */}
  //         <Box>
  //           Patient info

  //         </Box>
  //         <Container>
  //           <Stack mb={5} direction="column" spacing={15}>
  //             <Stack direction="row" spacing={2} justifyContent="space-between">
  //               <Typography variant="h3">Inpatient's info</Typography>
  //             </Stack>
  //           </Stack>
  //           <TableInPatient showTreatment={showTreatment} setShowTreatment={setShowTreatment} setRecordTreatmentShow={setRecordTreamentShow}/>
  //         </Container>
  //         {/* ----------------------------------------------------------------------- */}
  //         {/* { showTreatment && */}
  //         <CustomContainer className={showTreatment ? 'drop-down-open' : 'drop-down-close'}>
  //           <Stack mb={5} direction="column" spacing={15} >
  //             <Stack direction="row" spacing={2} justifyContent="space-between" >
  //               <Typography variant="h3">In record {recordTreatmentShow}'s treatement</Typography>
  //             </Stack>
  //           </Stack>
  //           <TableInPatientTreatment sx={{height: 0}} />
  //         </CustomContainer>
  //         {/* ----------------------------------------------------------------------- */}
  //         <CustomContainer>
  //           <Stack mb={5} direction="column" spacing={15}>
  //             <Stack direction="row" spacing={2} justifyContent="space-between">
  //               <Typography variant="h3">Out patient info</Typography>
  //             </Stack>
  //           </Stack>
  //           <TableOutPatient showExamine={showExamine} setShowExamine={setShowExamine} setRecordExamineShow={setRecordExamineShow}/>
  //         </CustomContainer>
  //         {/* ----------------------------------------------------------------------- */}
  //         {
  //         <CustomContainer className={showExamine ? 'drop-down-open' : 'drop-down-close'}>
  //           <Stack mb={5} direction="column" spacing={15}>
  //             <Stack direction="row" spacing={2} justifyContent="space-between">
  //               <Typography variant="h3">Out record ID {recordExamineShow}'s Examines</Typography>
  //             </Stack>
  //           </Stack>
  //           <TableOutPatientExamine />
  //         </CustomContainer>
  //         }
  //         {/* ----------------------------------------------------------------------- */}
  //       </Stack>
  //     </Container>
  //   </>
  // );
};

export default Report;
