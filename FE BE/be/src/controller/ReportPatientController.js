const PatientModel = require('../model/patient.model')
const InOutPatientModel = require('../model/in_out_patient.model')
const InOutPatientDetailModel = require('../model/in_out_patient_detail.model')
const { signToken } = require('../utils/jwt')

class ReportPatientController {
    async createPatient(req,res,next) {
        try {
            const data = req.body
            console.log(data);
            const new_patient = new PatientModel(data)
            await new_patient.save()

            return res.json(new_patient)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getIpPatient(req,res,next) {
        try {
            const {page,total,patient_id} =req.query
            let lim = total ? total : 25
            let ski =  page ? page >1 ? lim*(page -1) : 0 : 0
            let fiel_return = 'record_id code start_date end_date diagnosis sick_room nurse total_fee detail'

            let query = {type_patient: 'ip'}

            if(patient_id) query["patient_id"] = patient_id
            let data = await InOutPatientModel.find(query,fiel_return).skip(ski).limit(lim).exec()
            let totalDoc = await InOutPatientModel.countDocuments({type_patient: 'ip'})
            let totalPage =Number.parseInt( totalDoc/lim) > 1 ? Number.parseInt( totalDoc/lim) : 1
            return res.json({
                data,
                totalDoc,
                totalPage
            }) 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOpPatient(req,res,next) {
        try {
            const {page,total,patient_id} =req.query

            let lim = total ? total : 25
            let ski =  page ? page >1 ? lim*(page -1) : 0 : 0

            let fiel_return = 'record_id code start_date end_date  total_fee detail'

            let query = {type_patient: 'op'}
            if(patient_id) query["patient_id"] = patient_id

            let data = await InOutPatientModel.find(query,fiel_return).skip(ski).limit(lim).exec()
            let totalDoc = await InOutPatientModel.countDocuments({type_patient: 'op'})
            let totalPage =Number.parseInt( totalDoc/lim) > 1 ? Number.parseInt( totalDoc/lim) : 1
            return res.json({
                data,
                totalDoc,
                totalPage
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async getPatientDetail(req,res,next) {
        try {
            const {page,total} =req.query

            let lim = total ? total : 25
            let ski =  page ? page >1 ? lim*(page -1) : 0 : 0
            const {code} =req.params
            let data = await InOutPatientDetailModel.find({in_out_id: code}).skip(ski).limit(lim).exec()
            let totalDoc = await InOutPatientDetailModel.countDocuments({in_out_id: code})
            let totalPage =Number.parseInt( totalDoc/lim) > 1 ? Number.parseInt( totalDoc/lim) : 1
            return res.json({
                data,
                totalDoc,
                totalPage
            })
        } catch (error) {
            throw new Error(error)
            
        }
    }
}

module.exports = new ReportPatientController()