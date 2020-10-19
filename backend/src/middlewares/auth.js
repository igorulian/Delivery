const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(! authHeader)
        return res.status(401).send({error: 'No token provided | ' + req.headers + " | " + req.body.id})

    const parts = authHeader.split(' ')

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token error'})

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Tokem malformated'})

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Token invalid'})

        
    req.storeId = decoded.id

    return next()

    })
}