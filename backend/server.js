const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);


mongoose.connect('mongodb://localhost:27018/deliveryapi',{ useUnifiedTopology: true })

requireDir('./src/models')

app.use('/api/store', require('./src/store.routes'))

app.listen(3002)