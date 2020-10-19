const mongoose = require('mongoose')

const Store = mongoose.model('Store')

module.exports = {

// Loja

    async list(req,res){
        try{
            const {page = 1} = req.query
            const stores = await Store.paginate({}, {page, limit:10})
            return res.json(stores)
        }catch{
            return res.status(400).send({error: 'Error in list store'})
        }
    },
    async show(req,res){
        try{
            const store = await Store.findById(req.params.id).select('+products').select('+address')

            return res.json(store) 
        }catch{
            return res.status(400).send({error: 'Error in show store'})
        }
    },

    async update(req,res){
        try{
            
            if(!(req.storeId === req.params.id))
                return res.status(400).send({error: 'Invalid store'})

            const store = await Store.findByIdAndUpdate(req.params.id, req.body, {new: true,useFindAndModify: false})

            return res.json({store, storeId: req.storeId, reqId: req.params.id}) 
        }catch{
            return res.status(400).send({error: 'Error in update store'})
        }
    },

//Categoria

    async addCategory(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})


            const {name} = req.body

            const newCategory = {
                name,
            }

            await Store.findOneAndUpdate(
                { _id: req.params.id }, 
                {$addToSet: { categories: newCategory}},
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                })

            return res.json(newCategory)

        }catch{
            return res.status(400).send({error: 'Error in create category'})
        }
    },
    async listCategory(req,res){
        try{

            const store = await Store.findById(req.params.id).select('+categories')

            return res.json(store.categories)


        }catch{
            return res.status(400).send({error: 'Error in list category'})
        }
    },

    async removeCategory(req,res){
        try{
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})

            const catId = req.params.category

            await Store.update({
                'products.category': catId
              }, {
                $pull: { products: { category: catId } }
            })

            await Store.update({
                'categories._id': catId
              }, {
                $pull: { categories: { _id: catId } }
            })


            return res.status(200).send("OK")

        }catch{
            return res.status(400).send({error: 'Error in remove category'})
        }
    },



// Produto

    async listProducts(req,res){
        try{
            if(!(req.storeId === req.params.id))
                return res.status(400).send({error: 'Invalid store'})

            const store = await Store.findById(req.params.id).select('+products')

            return res.json(store.products)

        }catch{
            return res.status(400).send({error: 'Error in show products'})
        }
    },

    async addProduct(req,res){
        try{

            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'}) 

            const {name,cost,category,ingredient} = req.body
            // console.log(req.body)

            const newProduct = {
                name,
                cost,
                category,
                ingredient,
                category
            }

            await Store.findOneAndUpdate(
                { _id: req.params.id }, 
                {$addToSet: { products: newProduct}},
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                })

            return res.json(newProduct)

        }catch(erru){
            return res.status(400).send({error: 'Error in add product', erru})
        }
    },
    async removeProduct(req,res){
        try{

            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'})
            const pid = req.params.productid

            await Store.update({
                'products._id': pid
              }, {
                $pull: { products: { _id: pid } }
            })

            return res.status(200).send("OK")

        }catch(erru){
            return res.status(400).send({error: 'Error in remove product', erru})
        }
    },
    async updateProduct(req,res){
        try{
            const pid = req.params.productid
            
            if(!(req.storeId === req.params.id))
            return res.status(400).send({error: 'Invalid store'}) 

            const {name,cost,category,ingredient} = req.body
            // console.log(req.body)

            const newProduct = {
                name,
                cost,
                category,
                ingredient
            }

            // const store = await Store.findById(req.params.id).select('+products')
            // store.products.id(pid).set(newProduct)
            // store.save()

            // return res.json(store.products)
            return res.json(newProduct)

        }catch{
            return res.status(400).send({error: 'Error in update product'})
        }
    },

    //Pedidos
}