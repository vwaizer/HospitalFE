const oracledb = require("oracledb")
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
export async function connectDB() {
    try{
        return await oracledb.getConnection({
            user: "hr",
            password: "123",
            connectionString: "mydbmachine.example.com/orclpdb1"
        })
    } catch (err) {
        console.log(err)
    }
}
