const {Schema,model, Mongoose} = require('mongoose')

const userSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    doctor_id: {
        type: Schema.ObjectId,
        ref : "doctor"
    }
},
{
    timestamps: true
})


module.exports = model('user',userSchema)