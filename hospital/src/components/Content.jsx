import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import LoginPage from './Login'

const Content = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/Product" element={<Home  />}></Route>
     
    </Routes>
  </BrowserRouter>
  )
}

export default Content