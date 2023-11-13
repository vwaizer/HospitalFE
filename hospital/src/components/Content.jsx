import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import LoginPage from './Login'


const Content = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/Product" element={<LoginPage  />}></Route>
     
    </Routes>
  </BrowserRouter>
  )
}

export default Content