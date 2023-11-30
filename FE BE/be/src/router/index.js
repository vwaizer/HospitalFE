
const { verifyToken } = require('../utils/jwt')
const routerAuth = require('./auth.route')
const routerReport = require('./report.route')
function router(app) {
    app.use('/',routerAuth)
    
    app.use('/report/',routerReport)
}

module.exports = router