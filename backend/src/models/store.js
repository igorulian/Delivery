const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const bcrypt  = require('bcryptjs')


const addressSchema = new mongoose.Schema({
    rua:{
        type:String,
        required:true
    },
    numero:{
        type: String,
        required: true
    },
    cep:{
        type:String,
        required: true
    },
    bairro:{
        type:String,
        required: true
    }
})

const ingredientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quant:{
        type: Number,
        required: false,
        default: 1
    }
})

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required: false
    },
    cost:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: false
    },
    ingredient:{
        type: [ingredientSchema],
        required: false
    } 
})

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
})

const requestSchema = new mongoose.Schema({
    clientName:{
        type: String,
        required: true,
        default: ""
    },
    clientID: {
        type: String,
        required:true,
        default: ""
    },
    products:{
        type: [productSchema],
        required: true,
        default: []
    },
    location:{
        type: addressSchema,
        required: true,
        default: {}
    },
    obs:{
        type: String,
        required: false
    },
    progress:{
        type: Number,
        required: false,
        default: 0
    },
    cost:{
        type: Number,
        required: true,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const finishedRequestSchema = new mongoose.Schema({
    clientName:{
        type: String,
        required: true
    },
    clientID: {
        type: String,
        required:true,
        default: ""
    },
    products:{
        type: [productSchema],
        required: true,
    },
    location:{
        type: String,
        required: true
    },
    obs:{
        type: String,
        required: false
    },
    cost:{
        type: Number,
        required: true,
        default: 0
    },
    createdAt:{
        type: Date,
        required: true
    },
    mes:{
        type: Number,
        default: 3,
        required: true
    }
})

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: false,
        default: false
    },
    isValid: {
        type: Boolean,
        required: false,
        default: false
    },
    image:{
        type:String,
        required: false
    },
    email:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        select: false
    },
    password:{
        type: String,
        require: true,
        select: false,
    },
    cnpj:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        select: false
    },
    address:{
        type: addressSchema,
        required: true,
        select: false,
    },
    description:{
        type: String,
        required: false
    },
    products:{ 
        type: [productSchema],
        required: false,
        select: false,
    },
    requests: {
        type: [requestSchema],
        select: false,
        required: false
    },
    categories:{
        type: [categoriesSchema],
        select: false,
        required: false
    },
    finishedrequests: {
        type: [finishedRequestSchema],
        select: false,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

storeSchema.plugin(mongoosePaginate)
finishedRequestSchema.plugin(mongoosePaginate)

storeSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

// mongoose.model('Ingredient', productSchema)
// mongoose.model('Product', productSchema)
mongoose.model('Store', storeSchema)
mongoose.model('Request', requestSchema)
// mongoose.model('StoreCategory', categoriesSchema)
// mongoose.model('Address', addressSchema)categoriesSchema
// mongoose.model('Request', requestSchema)
mongoose.model('FinishedRequest', finishedRequestSchema)