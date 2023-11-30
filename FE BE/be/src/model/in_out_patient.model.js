const {Schema,model} = require('mongoose')

const in_out_patientSchema = new Schema({
    record_id: {type:String},
    code: {type: String,require:true},
    type_patient: {type: String},
    patient_id:  {
        type: Schema.Types.ObjectId,
        ref: "patient"
    },
    start_date: {type:Number},
    end_date: {type:Number},
    diagnosis : {type: String},
    sick_room: {type: String},
    // nurse: {
    //     type: Schema.Types.ObjectId,
    //     ref: "doctor"
    // },
    nurse: {type: Array},
    total_fee: {
        type:Number,
        default: 0
    },
    detail: [
        {
            type: Schema.Types.ObjectId,
            ref: "in_out_patient_detail"
        }
    ]
},
{
    timestamps: true
})


module.exports = model('in_out_patient',in_out_patientSchema)