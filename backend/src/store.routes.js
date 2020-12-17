const express = require('express')
const authMiddleware = require('./middlewares/auth')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()


const StoreAuthController = require('./controllers/storeAuthController')
const StoreController = require('./controllers/storeController')
const StoreControllerPedidos = require('./controllers/storeControllerPedidos')
const StoreControllerPedidosFinalizados = require('./controllers/storeControllerPedidosFinalizados')
const storeController = require('./controllers/storeController')


routes.post('/auth/register', StoreAuthController.register)
routes.post('/auth/authenticate', StoreAuthController.authenticate)


routes.use(authMiddleware)


routes.post('/update/:id', StoreController.update)
routes.get('/', StoreController.list)
routes.get('/show/:id', StoreController.show)

routes.post('/categories/create/:id', StoreController.addCategory)
routes.get('/categories/list/:id', StoreController.listCategory)
routes.delete('/categories/delete/:id/:category', StoreController.removeCategory)

routes.get('/products/list/:id/', StoreController.listProducts)
routes.post('/products/add/:id/', StoreController.addProduct)
routes.delete('/products/remove/:id/:productid', StoreController.removeProduct)

routes.post('/requests/add/:id', StoreControllerPedidos.addRequest)
routes.get('/requests/list/:id', StoreControllerPedidos.listRequests)
routes.delete('/requests/remove/:id/:requestid', StoreControllerPedidos.removeRequest)
routes.post('/requests/update/:id/:requestid', StoreControllerPedidos.updateRequest)

routes.post('/finishedrequests/add/:id', StoreControllerPedidosFinalizados.addFinishedRequest)
routes.get('/finishedrequests/list/:id/:mes', StoreControllerPedidosFinalizados.listFinishedRequests)


routes.get('/info/home/:id', StoreController.homeInfo)


// routes.get('/products/update/:category/:id/:productid', StoreController.updateProduct)

routes.post('/auth/validtoken', StoreAuthController.validToken)

routes.post('/upload/image',multer(multerConfig).single('file'),StoreController.uploadImagem)
routes.delete('/upload/image/delete/:imageid', StoreController.deleteImage)


module.exports = routes