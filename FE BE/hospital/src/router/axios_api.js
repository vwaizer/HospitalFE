import axios from 'axios'


export const urls = {
    login : "/login",
    createPatient: "/report/create-patient",
    searchPatient: "/report/search-patient",
    ipPatient: "/report/get-ip-patient",
    opPatient: "/report/get-op-patient",
    listPatient: "/report/get-patient/",
}

export const baseUrl  = axios.create({
    baseURL : "http://localhost:5000"
})

