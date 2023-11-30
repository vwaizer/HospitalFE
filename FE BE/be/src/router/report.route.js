const ReportController =require ('../controller/ReportController')
const ReportPatientController =require ('../controller/ReportPatientController')
const {Router } = require('express')
const route = Router()


route.post('/create-patient',ReportController.createPatient)
route.get('/search-patient',ReportController.SearchPatient)

route.get('/get-ip-patient',ReportPatientController.getIpPatient)
route.get('/get-op-patient',ReportPatientController.getOpPatient)
route.get('/get-patient/:code',ReportPatientController.getPatientDetail)


module.exports = route