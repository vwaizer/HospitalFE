import React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar';

const Block =styled.div`
    display:flex;
    flex-direction:row;
    /* background: var(--m-3-sys-light-surface, #FFF8F6); */
   background-color:teal;
    height:700px;
`;
const Home = () => {
  return (
    <Block>
        <NavBar/>

    </Block>
  )
}

export default Home