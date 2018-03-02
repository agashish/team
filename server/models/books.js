const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true       
    },
    pages: Number,
    price: Number,
    stores: {
        type: [],
        default: null
    }
})

const Books = mongoose.model('Books' , bookSchema)

module.exports = {
    Books
}