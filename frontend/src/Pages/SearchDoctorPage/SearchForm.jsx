import { Button, Divider, Input } from '@mui/material'

import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// const DisplayBlock=styled.div`
//     width:fit-content;  
//     padding:5px;

// `;
// const FormBlock=styled.div`
//     display:flex;
//     flex-direction:column;
//     background:var(--m-3-sys-light-surface, #FFF8F6);
//     width:500px;
//     padding:15px;
//     border-radius:10px;


// `;
// const SubBlock=styled.div`
//     width:100%;
//     padding:25px;
//     padding-top:10px;
//     display:flex;
//     flex-direction:column;
//     justify-content:center;
//     align-items:start;
//     gap:10px;

// `;
// const InputBlock=styled.div`
//     background-color:#F3E5E3;
//     width:90%;
//     display:flex;
//     flex-direction:row;
// `
// ;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 480,
  minHeight: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 24,
  p: 4,
};

const SearchForm = ({ openSearch, setOpenSearch , searchSubmit}) => {
  const [open, setOpen] = [openSearch, setOpenSearch]
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
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Search Doctor
          </Typography>
          <Divider />
          {/* Search form */}
          <form id="searchForm" method="POST" onSubmit={searchSubmit} style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
          <Box component="" m={3} display="flex" alignItems="center" flexGrow={'1'} >
            <Stack spacing={1} display="flex" flex="1" justifyContent='center'>
              <Typography variant="h6">
                Doctor ID
              </Typography>
              <TextField
                label="Doctor ID"
                id="doctor"
                name="doctorID"
                autoComplete="doctorID"
                variant="filled"
                autoFocus
                style={{ width: "100%" }}
              />
              <Typography variant="h6" sx={{}}>
                Doctor name
              </Typography>
              <TextField
                label="Doctor Name"
                id="doctorName"
                name="doctorName"
                autoComplete="doctorName"
                variant="filled"
                autoFocus
                style={{ width: "100%" }}
              />
            </Stack>
          </Box>
          <Box display={'flex'} justifyContent={'end'}>
            <Button type = 'submit' width={20} >Search</Button>
          </Box>
        </form>
        </Box>
      </Modal>
    </>
  )
}

export default SearchForm