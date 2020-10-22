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


mongoose.connect('mongodb://localhost:27018/deliveryapi',{ useUnifiedTopology: true })

requireDir('./src/models')

app.use('/api/store', require('./src/store.routes'))

io.on('connection', socket => {
    // console.log(`Socket conectado ${socket.id}`)

    socket.on('request', data => {
        // console.log(data)
        const storeid = data.storeid
        const request = data.request

        socket.broadcast.emit(`${storeid}`,request)
    })
})

server.listen(3001)
app.listen(3002)