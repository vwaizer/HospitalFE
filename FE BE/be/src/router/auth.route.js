const AuthController =require ('../controller/AuthController')
const {Router } = require('express')
const route = Router()
route.post('/login',AuthController.login)


module.exports = route