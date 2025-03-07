// import statement
const Pet = require('../models/pet.js');
const express = require('express')  // to create our routes
const router = express.Router()// to link server js to this file


// HERE is where our routes will go
///////////////////////////////////////

// route to create a pet
router.post('/', async(req, res) => {
    try {
        const createdPet = await Pet.create(req.body)
        res.status(201).json(createdPet) // 201 when creating


    } catch (err) {
        res.status(500).json({err: err.message})


    }
    // res.json({message: 'Create Route'}) // message to test route
})

// Index route to find all pets in the database
router.get('/', async (req, res) => {
        // res.json({message: 'Index Route'}) // message to test rout

        try {
            const foundPets = await Pet.find()
            res.status(200).json(foundPets)

        } catch (err) {
            res.status(500).json({err: err.message})
        }

})

//A show route to find a single pet
router.get('/:petId', async(req, res) => {
    // res.json({message: `Show route with the param ${req.params.petId}`}) // message to test route

    try {
        const foundPet = await Pet.findById(req.params.petId)

        //add error handling if a pet is not found
        if(!foundPet) {
            res.status(404)
            throw new Error('Pet not found')
        }
        res.status(200).json(foundPet) // get back specific pet

    } catch (err) {
        if(res.statusCode === 404) {
            res.json({err: err.message})

        } else {
            res.status(500).json({err: err.message})
        }


    }

})

//UPDATE ROUTE
 router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
            new: true,
        }) // three arg cause user is going to fill out some form on front end - new true returns modified object- if false returns pet before update
        if (!updatedPet) { //falsy value
            res.status(404)
            throw new Error('Pet is not found.')
        }
        res.status(200).json(updatedPet)

    } catch (err) {
        res.status(res.statusCode === 404 ? 404 : 500).json({err: err.message})
    }
 })

//DELETE ROUT

router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId)
        if(!deletedPet) {
            res.status(404)
            throw new Error('pets not found.')
        }
        res.status(200).json(deletedPet)

    } catch (err) {
        res.status(res.statusCode === 404 ? 404 : 500).json({err: err.message}) // Tenary operayot , if true statuscode = 404 false defaults to status code 500, json key value spit out
    }

})


module.exports = router
// import above to server.js
