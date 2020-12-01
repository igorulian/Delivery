const mongoose = require('mongoose')

const Store = mongoose.model('Store')
const Request = mongoose.model('Request')

module.exports = {

//Categoria

    async addRequest(req,res){
        try{
            const newRequest = req.body

            await Store.findOneAndUpdate(
                { _id: req.params.id }, 
                {$addToSet: { requests: newRequest}},
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                })

                // Por enquanto o socket vai ser enviado por aqui, mas depos é bom fazer uma rota só para os usuarios

            return res.json(newRequest)

        }catch{
            return res.status(400).send({error: 'Error in create request'})
        }
    },
    async listRequests(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const store = await Store.findById(req.params.id).select('+requests').select('+finishedrequests')

            const mes =  new Date().getMonth() + 1
            // console.log('mes = ' + mes)
            const dia = new Date().toString().split(' ')[2]
 
            const filtrado = store.finishedrequests.filter( obj => (obj.mes == mes)).filter( obj => (obj.createdAt.toString().split(' ')[2] == dia));  // DEU CERTO

            const totalFinishedReqs = filtrado.length 

            // console.log(totalFinishedReqs)

            const requests = {
                reqs: store.requests,
                totalFinishedReqs
            }

            // return res.json(store.requests)
            return res.json(requests)


        }catch{
            return res.status(400).send({error: 'Error in list requests'})
        }
    },

    async removeRequest(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const reqId = req.params.requestid

            await Store.updateOne({
                'requests._id': reqId
              }, {
                $pull: { requests: { _id: reqId } }
            })

            return res.status(200).send("OK")

        }catch{
            return res.status(400).send({error: 'Error in remove request'})
        }
    },

    async updateRequest(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const reqId = req.params.requestid

            const newRequest = req.body

            const requesst = await Store.updateOne({
                '_id': req.storeId,'requests._id': reqId
              }, {
                $set: { 'requests.$': newRequest }
            })

            return res.json(requesst)

        }catch{
            return res.status(400).send({error: 'Error in remove request'})
        }
    },

    

    //Pedidos
}