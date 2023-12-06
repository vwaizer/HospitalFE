import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Stack, Typography, Box, Container, Collapse } from "@mui/material";
// import Container from "@mui/material/Container";

import TableInPatient from "./TableInPatient";
import TableOutPatient from "./TableOutPatient";
import TableInPatientTreatment from "./TableInPatientTreatment";
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
  const { patientID } = usePatient();
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
      <Container maxWidth={false} sx={{ width: '85%' }} >
        <Stack mb={5} direction="column" spacing={10}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h2">Report</Typography>
          </Stack>
        </Stack>
        <Box sx={{border:1, borderRadius: '16px', borderColor: `primary.main`, p: 2}} >
          <Typography variant="h5" mx={2} my={1}>Patient ID: {patientID}</Typography>
          <Stack direction="row" justifyContent={'space-between'} sx={{border:1, borderRadius: '16px', borderColor: `secondary.main`}}>
            <Box m={2}>
              <Typography variant="h6">Full Name: Le Viet Tung</Typography>
              <Typography variant="h6">Age: 18</Typography>
              <Typography variant="h6">Address: aaa</Typography>
              <Typography variant="h6">Phone number: 0937506949</Typography>
            </Box>
            <Box m={2}>
              <Typography variant="h6">Ip Code: 1000</Typography>
              <Typography variant="h6">Op Code: 1000</Typography>
              <Typography variant="h6">DoB: 13/12/2003</Typography>
              <Typography variant="h6">Gender: Female</Typography>
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
              <TableInPatient showTreatment={showTreatment} setShowTreatment={setShowTreatment} setRecordTreatmentShow={setRecordTreamentShow} />
            </Container>
          </Collapse>
          <Collapse in={showTreatment} timeout="auto" unmountOnExit>
            <Container >
              <TableInPatientTreatment sx={{ height: 0 }} />
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
              <TableOutPatientExamine sx={{ height: 0 }} />
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
