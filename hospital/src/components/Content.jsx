import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import LoginPage from './LoginPage'


const Content = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/Home" element={<Home  />}></Route>
     
    </Routes>
  </BrowserRouter>
  )
}

export default Content