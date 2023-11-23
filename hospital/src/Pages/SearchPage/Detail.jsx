import React from "react";
import { 
    Button,
  } from "@mui/material";
const Detail = (props) => {
  return (
    <div>
      <div>
        <div>ID: {props.data.id}</div>
        <div>Last name : {props.data.lName}</div>
        <div>First name: {props.data.fName}</div>
        <div>Phone number : {props.data.phoneNumeber}</div>
        <div> Doctor Treat: {props.data.doctorTreat}</div>
      </div>
      <Button variant="contained"  style={{ backgroundColor: "var(--m-3-sys-light-surface-container-high, #F3E5E3)", color: "red" }}>Export</Button>
    </div>
  );
};

export default Detail;
