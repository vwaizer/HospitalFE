var jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key = process.env.KEY
module.exports = {
    signToken : async (payload) => {
        try {
            const token  = jwt.sign(payload,secret_key,{
                expiresIn: '1h'
            })
            return token
        } catch (error) {
            console.log("jwt err",error);
            return false
        }
    },
    verifyToken : async (token) => {
        try {
            const data  = jwt.verify(token,secret_key)
            return data
        } catch (error) {
            console.log("jwt err",error);
            return false
        }
    }    
}