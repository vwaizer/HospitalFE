import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Stack, Typography } from "@mui/material";
// import Container from "@mui/material/Container";

import TableInPatient from "./TableInPatient";
import TableOutPatient from "./TableOutPatient";
import TableInPatientTreatment from "./TableInPatientTreatment";
import TableOutPatientExamine from "./TableOutPatientExamine.jsx";
import { usePatient } from "../../context/PatientInfoContext.jsx";

const Container = styled.div`
  padding: 32px;
`;

// get inpatient record and out patient record
async function getData(patientID) {
  // Get data function
  // const response = await fetch('http://localhost:5000/api/inpatient');
  // const data = await response.json();
  // return data;
}

const Report = () => {
  const [recordTreatmentShow, setRecordTreamentShow] = useState(0);
  const [recordExamineShow, setRecordExamineShow] = useState(0);
  const [showTreatment, setShowTreatment] = useState(true);
  const [showExamine, setShowExamine] = useState(true);
  const { patientID } = usePatient();
  
  return (
    <>
      {/* <NavBar /> */}
      <Container>
        <Stack mb={5} direction="column" spacing={10}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h2">Report</Typography>
          </Stack>
          {/* --------------------------------------------------------------------------- */}
          patientID: {patientID}
          {/* --------------------------------------------------------------------------- */}
          <Container>
            <Stack mb={5} direction="column" spacing={15}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h3">Inpatient's info</Typography>
              </Stack>
            </Stack>
            <TableInPatient showTreatment={showTreatment} setShowTreatment={setShowTreatment} setRecordTreatmentShow={setRecordTreamentShow}/>
          </Container>
          {/* ----------------------------------------------------------------------- */}
          { showTreatment &&
          <Container>
            <Stack mb={5} direction="column" spacing={15}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h3">In record {recordTreatmentShow}'s treatement</Typography>
              </Stack>
            </Stack>
            <TableInPatientTreatment />
          </Container>
          }
          {/* ----------------------------------------------------------------------- */}
          <Container>
            <Stack mb={5} direction="column" spacing={15}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h3">Out patient info</Typography>
              </Stack>
            </Stack>
            <TableOutPatient showExamine={showExamine} setShowExamine={setShowExamine} setRecordExamineShow={setRecordExamineShow}/>
          </Container>
          {/* ----------------------------------------------------------------------- */}
          {showExamine &&
          <Container>
            <Stack mb={5} direction="column" spacing={15}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h3">Out record ID {recordExamineShow}'s Examines</Typography>
              </Stack>
            </Stack>
            <TableOutPatientExamine />
          </Container>
          }
          {/* ----------------------------------------------------------------------- */}
        </Stack>
      </Container>
    </>
  );
};

export default Report;
