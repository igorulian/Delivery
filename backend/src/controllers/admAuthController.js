const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


function generateToken(params = {}){
    return jwt.sign(params, authConfig.admsecret, {
        expiresIn: 86400
    })
}



module.exports = {
    async loginPaoDeForma(req,res){
        const {email, password} = req.body
        try{

            if(!(email === 'igorulian@outlook.com' && password === 'cubomagico')){
                return res.status(200).send({error: 'Authentication failed, invalid pass or email'})
            }

            const token = jwt.sign({id: email}, authConfig.admsecret, {
                expiresIn: 86400
            })

            res.send({
                // token: generateToken({id: email})
                token: 'generateToken({id: email})'
            })

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
}