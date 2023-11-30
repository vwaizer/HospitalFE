const UserModel = require('../model/user.model')
const { signToken } = require('../utils/jwt')

class AuthController {
    async login(req,res,next) {
        try {
            const {username,password} = req.body
            const info_user = await UserModel.findOne({username})
            console.log(info_user);
            if(!info_user) {
                return res.status(404).send("Tài khoản không tồn tại")
            }
            if (info_user.password != password) return  res.status(404).send("Sai mật khẩu")
            const token = await signToken({id: info_user._id,username})

            return res.json({
                token,
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = new AuthController()