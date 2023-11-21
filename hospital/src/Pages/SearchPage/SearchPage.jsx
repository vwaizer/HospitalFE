import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import { Button, Modal, Stack, Typography } from "@mui/material";
// import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SearchForm from "./SearchForm";
import AddForm from "./AddForm";
import TableContent from "./TableContent";

// const Block = styled.div`
//   display: flex;
//   flex-direction: row;
//   /* background: var(--m-3-sys-light-surface, #fff8f6); */
//   /* background-color:teal; */
//   height: 600px;
// `;
// const ContextBlock = styled.div`
//   display: flex;
//   width: 100%;
//   flex-direction: column;

// `;
const Container = styled.div`
  padding: 32px;
`;
// const RowFlex = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-direction: row;
//   width: 100%;
// `;
const SearchPage = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const onClickFuncSearch = () => {
    setOpenSearch(true);
  }
  const onClickFuncAdd = () => {
    setOpenAdd(true);
  }
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
            <SearchForm openSearch={openSearch} setOpenSearch={setOpenSearch}/>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: "var(--m-3-sys-light-surface-container-high, #F3E5E3)", color: "red" }}
              onClick={onClickFuncAdd}
            >
              Add
            </Button>
            <AddForm openAdd={openAdd} setOpenAdd={setOpenAdd}/>
          </Stack>
        </Stack>
        
        <TableContent />
      </Container>
    </>


    // <Block>
    // <NavBar />

    //  <ContextBlock>
    //   <h1>Search Page</h1>
    //   <Container>
    //     <RowFlex>
    //       <Button variant="contained" startIcon={<SearchIcon/>} style={{backgroundColor:"var(--m-3-sys-light-surface-container-high, #F3E5E3)",color:"red"}} onClick={onClickFuncSearch}>Search</Button>
    //       <Button variant="contained" startIcon={<AddIcon/>} style={{backgroundColor:"var(--m-3-sys-light-surface-container-high, #F3E5E3)",color:"red"}} onClick={onClickFuncAdd}>Add</Button>
    //     </RowFlex>

    //   </Container>
    //   <Modal
    //   open={openSearch}
    //   onClose={handleCloseSearch}
    //   style={{display:"flex",justifyContent:"center",alignItems:"center"}}
    //   >
    //       <SearchForm/>
    //   </Modal>
    //   <Modal
    //   open={openAdd}
    //   onClose={handleCloseAdd}
    //   style={{display:"flex",justifyContent:"center",alignItems:"center"}}
    //   >
    //       <AddForm/>
    //   </Modal>
    //   <TableContent/>
    // </ContextBlock> 
    // </Block>
  );
};

export default SearchPage;
