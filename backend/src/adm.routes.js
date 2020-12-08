const express = require('express')
const admAuthMiddleware = require('./middlewares/admauth')

const routes = express.Router()


const AdmController = require('./controllers/admController')


routes.post('/auth/authenticate', AdmController.authenticate)


routes.use(admAuthMiddleware)


routes.get('/store/list/tovalidate', AdmController.listStoreToValidate)
routes.get('/store/list/all', AdmController.listStoreAll)
routes.post('/store/validate', AdmController.validateStore)
routes.post('/store/delete', AdmController.deleteStore)


module.exports = routes