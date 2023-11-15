import { Button, Input} from '@mui/material'

import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
const DisplayBlock=styled.div`
    width:fit-content;  
    padding:5px;
    
`;
const FormBlock=styled.div`
    display:flex;
    flex-direction:column;
    background:var(--m-3-sys-light-surface, #FFF8F6);
    width:500px;
    padding:10px;
    border-radius:10px;
   

`;
const SubBlock=styled.div`
    width:100%;
    padding:25px;
    padding-top:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:start;
    gap:10px;
    
`;
const InputBlock=styled.div`
    background-color:#F3E5E3;
    width:90%;
    display:flex;
    flex-direction:row;
`
;
const SearchForm = () => {
  return (
    <DisplayBlock>
        <FormBlock>
            <h2>Search patient</h2>
            <SubBlock> 
            <div style={{color:" var(--m-3-sys-light-inverse-primary, #FFB4A8)"}} >Patient ID</div>
               <InputBlock>
               
               <Input style={{width:"100%"}} />
                <Button><SearchIcon/></Button>
               </InputBlock>
                <div style={{color:" var(--m-3-sys-light-inverse-primary, #FFB4A8)"}}>Doctor treat/examine</div>
                <InputBlock>
               <Input style={{width:"100%"}}/>
                <Button><SearchIcon/></Button>
               </InputBlock>
            </SubBlock>
            <Button style={{color:"red"}}>Submit</Button>
        </FormBlock>
    </DisplayBlock>
  )
}

export default SearchForm