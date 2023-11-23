import React from 'react'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import SearchPage from '../Pages/SearchPage/SearchPage'
import LoginPage from '../Pages/Login/LoginPage'
import Root from './Root'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme';
import Report from '../Pages/SearchPage/Report';
const router = createBrowserRouter(
  createRoutesFromElements(
  <Route>
    <Route path="/" element={<LoginPage />}/>
  <Route path='/Home' element={<Root/>}>
    <Route index element={<SearchPage/>}/>
    <Route path="/Home/SearchPage" element={<SearchPage/>}></Route>
    <Route path="/Home/Report" element={<Report/>}></Route>
  </Route>
  </Route>
  )
)


const Content = () => {
  return (
    <ThemeProvider theme={theme}>
    <RouterProvider router={router}>

      </RouterProvider>
    </ThemeProvider>

  )
}

export default Content