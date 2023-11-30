const PatientModel = require('../model/patient.model')
const { signToken } = require('../utils/jwt')

class ReportController {
    async createPatient(req,res,next) {
        try {
            const data = req.body
            const new_patient = new PatientModel(data)
            await new_patient.save()

            return res.json(new_patient)
        } catch (error) {
            throw new Error(error)
        }
    }

    async SearchPatient(req,res,next) {
        try {
            const {patient_id,doctor,page,total} =req.query
            let lim = total ? total : 25
            let ski =  page ? page >1 ? lim*(page -1) : 0 : 0


            let query = {}

            if (patient_id) {
                query['patient_id'] = patient_id
            }

            if (doctor)
                query = {...query, doctor: {$regex : doctor}}


            let data = await PatientModel.find(query).skip(ski).limit(lim)
            let totalDoc = await PatientModel.countDocuments()
            let totalPage = Number.parseInt( totalDoc/lim) > 1 ? Number.parseInt( totalDoc/lim) : 1
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

module.exports = new ReportController()