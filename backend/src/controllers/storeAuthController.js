const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

const Store = mongoose.model('Store')


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}



module.exports = {
    async register(req,res){
        const {email,cnpj} = req.body

        try{
            if(await Store.findOne({email}))
                return res.status(400).send({error: 'User already exists'})

                
            if(await Store.findOne({cnpj}))
                return res.status(400).send({error: 'CNPJ already exists'})
        
            const store = await Store.create(req.body)

            store.password = undefined
            store.products = undefined
            store.requests = undefined
            store.finishedrequests = undefined


           // emailservice.enviarEmailCadastro


            return res.json({
                store,
                token: generateToken({id: store.id})
            })
            
        } catch (erru){
            return res.status(400).send({error: 'Registration failed', erru})
        }
    },


    async authenticate(req,res){
        const {email, password} = req.body
        try{

            const store = await Store.findOne({email}).select('+password')

            if(! store) // se o usuario n existir
            return res.status(400).send({error: 'User not found'})

            if(! await bcrypt.compare(password, store.password)) // se a senha estiver errada
            return res.status(400).send({error: 'Ivalid password'})
            
            store.password = undefined
            store.products = undefined
            store.requests = undefined
            store.finishedrequests = undefined

            const token = jwt.sign({id: store.id}, authConfig.secret, {
                expiresIn: 86400
            })

            res.send({
                store, 
                token: generateToken({id: store.id})})
        }catch{
            res.status(400).send({error: 'Authentication failed'})
        }
            
    },
    async validToken(req,res){
        const {id} = req.body
        try{
            if(!(req.storeId === id))
            return res.status(400).send({error: 'Invalid store'})

            res.send("OK")

        }catch{
            res.status(400).send({error: 'Token validation faield'})
        }
    },
    async delete(req,res){
        await Store.findByIdAndDelete(req.params.id)

        return res.send()
    }
}