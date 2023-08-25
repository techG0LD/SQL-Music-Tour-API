const bands = require('express').Router()
const db = require('../models')
const {Op} = require('sequelize')
const { Band } = db

bands.get('/', async(req,res) => {
    const {name = '',limit=5,offset=0} = req.query
    try{
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC'],['name','ASC']],
            where: {
                name: {
                    [Op.iLike] : `%${name}%`
                }
            },
            limit,
            offset
        });
        res.status(200).json(foundBands)
    } catch (e) {
        res.status(500).json(e)
    }
})

bands.get('/:id', async (req,res) => {
    try {
        const foundBand = await Band.findOne({
            where: {
                band_id: req.params.id
            }
        });
        res.status(200).json(foundBand)
    }  catch(e) {
        res.status(500).json(e)
    } 
})


//post new bands
bands.post('/', async(req,res) => {
    try{
        const newBand = await Band.create(req.body);
        res.status(200).json({
            message: 'Successfully created a band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


//UPDATE
bands.put('/:id', async(req,res) => {
    const {id} = req.params
    try{
        const updatedBand= await Band.update(req.body, {
            where: {
                band_id: id
            }
        });
        res.status(200).json({
            message: `Successfully updated the band ${updatedBand}`,
            
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//DELETGE 

bands.delete('/:id', async(req,res) => {
    const {id} = req.params
    try{
        const deleteBand= await Band.destroy({
            where: {
                band_id: id
            }
        });
        res.status(200).json({
            message: `Successfully deleted band id ${id}`,
            
        })
    } catch(error) {
        res.status(500).json(error)
    }
})



module.exports = bands