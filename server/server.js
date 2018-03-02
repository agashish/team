const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//###### SERVER CREATED
const app = express();

//###### SERVER STATIC FILES THROUGH MIDDLEWARE
app.use('/',express.static(__dirname + '/../public'))
app.use(bodyParser.json())

//###### DB WITH MONGOOSE AND PROMISE
mongoose.Promise = global.Promise

//###### DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/parcticeProject')

//###### INCLUDE MODELS
const {Books} = require('./models/books')
const {Store} = require('./models/stores')

//###### ADD ROUTES FOR ADDING STORES
app.post('/api/add/stores', (req, res) => {
    
    //###### SAVE STORE INTO MONGODB BY MONGOOSE
    const store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    })

    //##### SEND INTO MONGOOOSE TO SAVE
    store.save((err, doc) => {
        if(err){
            return res.status(400).send()
        }
        res.status(200).send();
    })

})

//###### RETREIVE STORE LIST FROM MONGOOSE
app.get('/api/stores', (req, res) =>{

    //##### GET ALL STORES LIST
    Store.find({}, (err, doc) => {
        if(err){
            res.status(400).send(err)    
        }
        
        res.status(200).send(doc)
    })

})

//###### ADD ROUTE FOR ADDING BOOKS
app.post('/api/add/books', (req, res) => {
    
    const book = new Books({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores
    })

    book.save((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).send()
    })

})

//##### RETREIVE BOOK LIST FR HOME PAGE 
app.get('/api/books', (req, res) => {

    Books.find().limit(10).exec((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).send(doc)
    })

})

//###### ADD LISTEN PORT
app.listen(process.env.port | 3000 , () => {
    console.log('server running')
})