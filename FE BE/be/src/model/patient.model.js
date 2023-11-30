const {Schema,model} = require('mongoose')

const patientSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    patient_id: {type:String},
    address: {type: String},
    op_code: {type: String},
    ip_code: {type:String},
    gender: {type : String},
    date_of_birth: {type: Number},
    phone_number: {type: String},
    doctor: {type: Array}
},
{
    timestamps: true
})


module.exports = model('patient',patientSchema)