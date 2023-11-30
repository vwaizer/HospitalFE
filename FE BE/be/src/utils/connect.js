const mongoose = require('mongoose')
const url_db =  "mongodb+srv://chuyendev:AaLcSewkzkHvN29l@cluster0.hjmpkyj.mongodb.net/handle-hospital?retryWrites=true&w=majority"


async function connectDb() {
    try {
        await mongoose.connect(url_db)
        console.log("connect db success");
    } catch (error) {
        console.log("connect failure ",error);
    }
}

module.exports = connectDb