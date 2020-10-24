const mongoose = require('mongoose')

const Store = mongoose.model('Store')
const Request = mongoose.model('Request')

module.exports = {

//Categoria

    async addFinishedRequest(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const newFinishedRequest = req.body

            // remover request 
            
            await Store.updateOne({
                'requests._id': req.body._id
              }, {
                $pull: { requests: { _id: req.body._id } }
            })

            // adicionar nos finalizados

            await Store.findOneAndUpdate(
                { _id: req.params.id }, 
                {$addToSet: { finishedrequests: newFinishedRequest}},
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
            })

            return res.json(newFinishedRequest)

        }catch{
            return res.status(400).send({error: 'Error in create request'})
        }
    },
    async listFinishedRequests(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const store = await Store.findById(req.params.id).select('+finishedrequests')

            return res.json(store.finishedrequests)


        }catch{
            return res.status(400).send({error: 'Error in list requests'})
        }
    },

    async removeFinishedRequest(req,res){
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

    async updateFinishedRequest(req,res){
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