const {Schema,model} = require('mongoose')

const Schema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    doctor_id: {type:String, require: true, unique: true},
    address: {type: String},
    gender: {type : String},
    date_of_birth: {type: Number},
    phone_number: {type: String},
    major: {type: String},
    type_employee: {type: String}
},
{
    timestamps: true
})


module.exports = model('doctor',doctorSchema)