import React from 'react'
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from 'react-router-dom'
import SearchPage from '../Pages/SearchPage/SearchPage'
import LoginPage from '../Pages/Login/LoginPage'
import Root from './Root'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme';
import ReportPage from '../Pages/ReportPage/ReportPage';
import SearchDoctorPage from '../Pages/SearchDoctorPage/SearchDoctorPage';
import { PatientInfoProvider } from '../context/PatientInfoContext'
import { DoctorSearchProvider } from '../context/DoctorSearchContext'
import { PatientSearchProvider } from '../context/PatientSearchContext'
import { AuthProvider } from '../context/AuthContext'
import PrivateRoute from '../Route/PrivateRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/Home' element={<PrivateRoute children={<Root />}/>}>
        <Route index element={<SearchPage />} />
        <Route path="/Home/SearchPage" element={<PrivateRoute children={<SearchPage />}/>}></Route>
        <Route path="/Home/Report" element={<ReportPage />}></Route>
        <Route path="/Home/SearchDoctor" element={<SearchDoctorPage />}></Route>
      </Route>
    </Route>
  )
)


const Content = () => {
  return (
    <AuthProvider>
      <PatientSearchProvider>
        <DoctorSearchProvider>
          <PatientInfoProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router}>

              </RouterProvider>
            </ThemeProvider>
          </PatientInfoProvider>
        </DoctorSearchProvider>
      </PatientSearchProvider>
    </AuthProvider>

  )
}

export default Content