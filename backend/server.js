require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const server = require('http').createServer(app)
const io = require('socket.io')(server)


mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/deliveryapi',{ useUnifiedTopology: true })   // <-- localhost

requireDir('./src/models')

app.use('/api/store', require('./src/store.routes'))
app.use('/api/adm', require('./src/adm.routes'))

io.on('connection', socket => {
    // console.log(`Socket conectado ${socket.id}`)

    socket.on('request', data => {
        // console.log(data)
        const storeid = data.storeid
        const request = data.request

        socket.broadcast.emit(`${storeid}`,request)
    })
}) // docker run -v ~/docker --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=balta -e MONGO_INITDB_ROOT_PASSWORD=e296cd9f mongo

server.listen(3001) // socket
app.listen(3002) // api