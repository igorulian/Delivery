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

            return res.json(newRequest)

        }catch{
            return res.status(400).send({error: 'Error in create request'})
        }
    },
    async listRequests(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const store = await Store.findById(req.params.id).select('+requests')

            return res.json(store.requests)


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
            const progress = req.body.progress

            const request = await Request.findByIdAndUpdate(reqId, { progress: progress })

            return res.json(request)

        }catch{
            return res.status(400).send({error: 'Error in remove request'})
        }
    },

    

    //Pedidos
}