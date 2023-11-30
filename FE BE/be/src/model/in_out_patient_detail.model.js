const {Schema,model} = require('mongoose')

const in_out_patient_detailSchema = new Schema({
    treatment_id: {type: String},
    result: {type:String},
    start_date: {type:Number},
    end_date: {type:Number},
    // doctor: {
    //     type: Schema.Types.ObjectId,
    //     ref: "doctor"
    // },
    doctor: {type: Array},
    medication : {type: [{
        name: String,
        price: Number,
        quanity:Number
    }]},
    fee: {type: Number},
    total_fee: {type: Number},
    in_out_id: {
        type: Schema.Types.ObjectId,
        ref: "in_out_patient"
    }
},
{
    timestamps: true
})


module.exports = model('in_out_patient_detail',in_out_patient_detailSchema)