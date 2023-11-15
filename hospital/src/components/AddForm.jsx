import {  Button, Input} from "@mui/material";

import React from "react";
import styled from "styled-components";

const DisplayBlock = styled.div`
  width: fit-content;
  padding: 5px;
`;
const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--m-3-sys-light-surface, #fff8f6);
  width: 500px;
  padding: 15px;
  border-radius: 10px;
`;
const SubBlock = styled.div`
  width: 100%;
  padding: 25px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
`;
const InputBlock = styled.div`
  background-color: #f3e5e3;
  width: 90%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
`;
const ColumBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CenterBlock=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;
const AddForm = () => {
  return (
    <DisplayBlock>
      <FormBlock>
        <h2 style={{ textAlign: "center" }}>Add new patient</h2>

        <ColumBlock>
          <SubBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              Patient ID
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              IP Code
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              OP code
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              Gender
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
          </SubBlock>

          <SubBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              First Name
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              Last Name
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              Address
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
            <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              Data of Birth
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
            </InputBlock>
          </SubBlock>
        </ColumBlock>

        <CenterBlock>
        <div
              style={{
                color: " var(--m-3-sys-light-inverse-primary, #FFB4A8)",
              }}
            >
              Data of Birth
            </div>
            <InputBlock>
              <Input style={{ width: "100%" }} />
              
            </InputBlock>
        </CenterBlock>

        <Button style={{ color: "red" }}>Submit</Button>
      </FormBlock>
    </DisplayBlock>
  );
};

export default AddForm;
