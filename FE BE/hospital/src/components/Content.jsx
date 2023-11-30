import React from 'react'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import SearchPage from '../Pages/SearchPage/SearchPage'
import LoginPage from '../Pages/Login/LoginPage'
import Root from './Root'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme';
import ReportPage from '../Pages/ReportPage/ReportPage';
import { PatientInfoProvider } from '../context/PatientInfoContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path='/Home' element={<Root />}>
        <Route index element={<SearchPage />} />
        <Route path="/Home/SearchPage" element={<SearchPage />}></Route>
        <Route path="/Home/Report" element={<ReportPage />}></Route>
      </Route>
    </Route>
  )
)


const Content = () => {
  return (
    <PatientInfoProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>

        </RouterProvider>
      </ThemeProvider>
    </PatientInfoProvider>

  )
}

export default Content