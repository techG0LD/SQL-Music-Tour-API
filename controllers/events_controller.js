const events = require('express').Router()
const db = require('../models')
const {Op} = require('sequelize')
const { Event } = db

events.get('/', async(req,res) => {
    try {
        const {name = '', limit=5, offset=0} = req.query

        const foundEvents = await Event.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            order: [
                ['date', 'ASC'], ['name', 'ASC']
            ],
            limit,
            offset
        });
        res.status(200).json(foundEvents)
    } catch(error){
        res.status(500).json(error)
    }
})

events.get('/:id', async (req,res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {
                event_id: req.params.id
            }
        });
        res.status(200).json(foundEvent)
    }  catch(e) {
        res.status(500).json(e)
    } 
})

//post new bands
events.post('/', async(req,res) => {
    try{
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully created a event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
events.put('/:id', async(req,res) => {
    const {id} = req.params
    try{
        const updatedEvent= await Event.update(req.body, {
            where: {
                event_id: id
            }
        });
        res.status(200).json({
            message: `Successfully updated the band ${updatedEvent}`,
            
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//DELETE 

events.delete('/:id', async(req,res) => {
    const {id} = req.params
    try{
        const deleteEvent= await Event.destroy({
            where: {
                event_id: id
            }
        });
        res.status(200).json({
            message: `Successfully deleted event id ${id}`,
            
        })
    } catch(error) {
        res.status(500).json(error)
    }
})



module.exports = events