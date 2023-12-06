import React, { useEffect, useState } from "react";
import {
  Button, Typography, Stack, Box
} from "@mui/material";

const Detail = ({ data }) => {

  return (
    <Stack spacing={2} mt={2}>
      <Box>
        <Typography>Treatment ID: {data.treatmentID}</Typography>
        <Typography>Result : {data.result}</Typography>
        <Typography>Start date: {data.startDate}</Typography>
        <Typography>End date : {data.endDate}</Typography>
        <Typography>Doctor: {data.doctor}</Typography>
        <Typography>Medication used: </Typography>
        {data.medications.map((medication, index) => {
          return (
            <Typography key={index}>
              - {medication.name} x {medication.quantity} : {medication.priceperbox * medication.quantity} $
            </Typography>
          );
        })}
        <Typography>Total fee: {data.totalFee} $</Typography>
      </Box>
    </Stack>
  );
};

export default Detail;
