import { Button, Divider, Input } from '@mui/material'

import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// const DisplayBlock = styled.div`
//   width: fit-content;
//   padding: 5px;
// `;
// const FormBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: var(--m-3-sys-light-surface, #fff8f6);
//   width: 500px;
//   padding: 15px;
//   border-radius: 10px;
// `;
// const SubBlock = styled.div`
//   width: 100%;
//   padding: 25px;
//   padding-top: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: start;
//   gap: 10px;
// `;
// const InputBlock = styled.div`
//   background-color: #f3e5e3;
//   width: 90%;
//   display: flex;
//   flex-direction: row;
//   border-radius: 10px;
// `;
// const ColumBlock = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;
// const CenterBlock=styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     flex-direction:column;
// `;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 960,
  minHeight: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 24,
  p: 4,
};

const AddForm = ({ openAdd, setOpenAdd, addSubmit, mustHaveIpOrOp, ifipMustHaveNurse, invalidIpCode, invalidOpCode}) => {
  const [open, setOpen] = [openAdd, setOpenAdd]
  const [patientType, setPatientType] = useState('inPatient');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={2} id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
            Add new Patient
          </Typography>
          <Divider />
          {/* Add form */}
          <form id="addForm" method="POST" onSubmit={addSubmit} style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            <Stack spacing={2} flexDirection="column" alignItems="center" flex='1' justifyContent={'center'}>
              <Stack spacing={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                <Stack width={'40%'}>
                  <Typography variant="h6">
                    First name
                  </Typography>
                  <TextField
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    autoComplete="patientID"
                    variant="filled"
                    autoFocus
                    required
                    style={{ width: "100%" }}
                  />
                </Stack>
                <Stack width={'40%'}>
                  <Typography variant="h6" sx={{}}>
                    Last name
                  </Typography>
                  <TextField
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    autoComplete="lastName"
                    variant='filled'
                    autoFocus
                    required
                    style={{ width: "100%" }}
                  />
                </Stack>
              </Stack>
              <Stack spacing={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                <Stack width={'40%'}>
                  <Typography variant="h6">
                    Patient ID
                  </Typography>
                  <TextField
                    label="Patient ID"
                    id="patientID"
                    name="patientID"
                    variant="filled"
                    required
                    autoFocus
                    style={{ width: "100%" }}
                  />
                </Stack>
                <Stack width={'40%'}>
                  <Typography variant="h6" sx={{}}>
                    Address
                  </Typography>
                  <TextField
                    label="Address"
                    id="address"
                    name="address"
                    variant='filled'
                    autoFocus
                    style={{ width: "100%" }}
                  />
                </Stack>
              </Stack>
              <Stack spacing={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                <Stack width={'40%'}>
                  <Typography variant="h6">
                    Op code
                  </Typography>
                  <TextField
                    error={mustHaveIpOrOp || invalidOpCode}
                    label="Op code"
                    id="opCode"
                    name="opCode"
                    variant="filled"
                    autoFocus
                    style={{ width: "100%" }}
                    helperText={mustHaveIpOrOp ? 'Must have either Ip code or Op code' : (invalidOpCode ? 'Invalid Op code' : '')}
                  />
                </Stack>
                <Stack width={'40%'}>
                  <Typography variant="h6" sx={{}}>
                    Ip code
                  </Typography>
                  <TextField
                    error={mustHaveIpOrOp || invalidIpCode}
                    label="Ip code"
                    id="ipCode"
                    name="ipCode"
                    variant='filled'
                    autoFocus
                    style={{ width: "100%" }}
                    helperText={mustHaveIpOrOp ? 'Must have either Ip code or Op code' : (invalidIpCode ? 'Invalid Ip code' : '')}
                  />
                </Stack>
              </Stack>
              <Stack spacing={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                <Stack width={'40%'}>
                  <Typography variant="h6">
                    Gender
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      id="gender"
                      defaultValue="other"
                      name="gender"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <Stack width={'40%'}>
                  <Typography variant="h6" sx={{}}>
                    Date Of Birth
                  </Typography>
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    autoComplete="dateOfBirth"
                    variant='filled'
                    type='date'
                    autoFocus
                    style={{ width: "100%" }}
                  />
                </Stack>
              </Stack>
              <Stack spacing={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                <Stack width={'40%'}>
                  <Typography variant="h6">
                    Phone Number
                  </Typography>
                  <TextField
                    label="phone Number"
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    variant="filled"
                    type='tel'
                    autoFocus
                    style={{ width: "100%" }}
                  />
                </Stack>
                <Stack width={'40%'}>
                  <Typography variant="h6" sx={{}}>
                    Nurse ID
                  </Typography>
                  <TextField
                    error={ifipMustHaveNurse}
                    label={'Nurse ID'}
                    id="nurseID"
                    name="nurseID"
                    autoComplete="nurseID"
                    variant='filled'
                    autoFocus
                    style={{ width: "100%" }}
                    helperText={ifipMustHaveNurse ? 'Must have valid nurse ID if is inpatient' : ''}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Box display={'flex'} justifyContent={'end'}>
              <Button type='submit' width={20}> Search </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  
  );
};

export default AddForm;
