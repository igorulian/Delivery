const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

const Store = mongoose.model('Store')


function generateToken(params = {}){
    return jwt.sign(params, authConfig.admsecret, {
        expiresIn: 86400
    })
}



module.exports = {
    async authenticate(req,res){
        try{
            const {email, password} = req.body
            
            console.log(req.body)

            if(!(email || password)) {
                return res.status(400).send({error: 'No email or password provided'})
            }

            // console.log(req.body)

            if(!( email === "igorulian@outlook.com" && password === "cubomagico123")){
                return res.status(400).send({error: 'Invalid email or password'})
            }

            const token = jwt.sign({id: email}, authConfig.admsecret, {
                expiresIn: 86400
            })

            res.send({
                token: generateToken({id: email})
            })

        }catch{
            res.status(400).send({error: 'Authentication failed'})
        }
    },
    async validToken(req,res){
        const {email} = req.body
        try{
            res.send("OK")

        }catch{
            res.status(400).send({error: 'Token validation faield'})
        }
    },
    async listStoreAll(req,res){
        try{
            const stores = await Store.find().select('+email').select('+cnpj').select('+address')
            // stores.fil
            return res.json(stores)

        }catch{
            res.status(400).send({error: 'Error to list Stores'})
        }
    },
    async listStoreToValidate(req,res){
        try{
            const page = 1
            const stores = await Store.find().select('+email').select('+cnpj').select('+address')
            const filtstores = stores.filter( obj => (obj.isValid == false));
            // stores.fil

            return res.json(filtstores)

        }catch{
            res.status(400).send({error: 'Error to list Stores to validate'})
        }
    },
    async validateStore(req,res){
        try{
            const id = req.body.storeid

            const newState = {
                isValid: true
            }

            const store = await Store.findByIdAndUpdate(id, newState, {new: true,useFindAndModify: false})
            return res.json(store)
        }catch{
            res.status(400).send({error: 'Error in validate store'})
        }
    },
    async deleteStore(req,res){
        try{
            const id = req.body.storeid

            await Store.findByIdAndRemove(id, {new: true,useFindAndModify: false})

            return res.status(200).send('OK')

        }catch{
            res.status(400).send({error: 'Error in delete store'})
        }
    },
    async validStore(req,res){
        try{
            const {storeid} = req.body
        }catch{
        }

    },
}