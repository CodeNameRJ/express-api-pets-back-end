const mongoose = require('mongoose')


const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
        required: true,
    },
    breed: String,

});

//create our model

const Pet = mongoose.model('pet', petSchema) // tell mongoose to create a collection in mongodb and validate that collection’s data using the schema.


module.exports = Pet
