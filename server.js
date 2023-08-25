// DEPENDENCIES
const express = require('express')
const app = express()
const {Sequelize} = require('sequelize')

//CONTROLLERS
const bandsController = require('./controllers/bands_controller')
const eventsController = require('./controllers/events_controller')
const stagesController = require('./controllers/stages_controller')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/bands', bandsController)
app.use('/events', eventsController)
app.use('/stages', stagesController)

//SEQUELIZE CONNECTION
// const sequelize = new Sequelize({
//     storage: process.env.PG_URI,
//     dialect: 'postgres',
//     username: 'postgres',
//     password: 'Thenew123!'
// })

// try{
//     sequelize.authenticate();
//     console.log(`Connectamundo - connected to postgres on ${process.env.PG_URI}`)
// } catch (e){
//     console.log('No dice- could not connect - bad')
// }

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.Port}`)
})