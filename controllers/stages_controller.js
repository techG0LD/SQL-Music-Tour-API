const stages = require('express').Router()
const db = require('../models')
const {Op} = require('sequelize')
const { Stage,Event } = db



//Show stages
stages.get('/', async(req,res) => {
    
    try {
        const {name = ''} = req.query

        const foundStages = await Stage.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            order: [
                ['capacity', 'DESC'], ['manager', 'ASC']
            ]
        });
        res.status(200).json(foundStages)
    } catch(error){
        res.status(500).json(error)
    }
})


//show indv page
stages.get('/:name', async (req,res) => {
    const {name: stageName = ''} = req.params
    try {
        const foundStage = await Stage.findOne({
            attributes: {
                exclude: 'stage_id'
            },
            where: {
                name: {
                    [Op.iLike] : `%${stageName}%`
                    
                }
            },
            // include: {
            //     model : Event,
            //     as: 'events',
            //     attributes:{
            //         exclude:['event_id']
            //     },
            //     through: {
            //         attributes: []
            //     }
            // },
            // order: [
            //     [{model: Event, as: 'events'},'date','ASC']
            // ]
        });
        res.status(200).json(foundStage)
    }  catch(e) {
        res.status(500).json(e)
    } 
})

//post new stages
stages.post('/', async(req,res) => {
    try{
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully created a stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
stages.put('/:id', async(req,res) => {
    const {id} = req.params
    try{
        const updatedStage= await Stage.update(req.body, {
            where: {
                stage_id: id
            }
        });
        res.status(200).json({
            message: `Successfully updated the band ${updatedStage}`,
            
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//DELETE 

stages.delete('/:id', async(req,res) => {
    const {id} = req.params
    try{
        const deleteStage= await Stage.destroy({
            where: {
                stage_id: id
            }
        });
        res.status(200).json({
            message: `Successfully deleted stage id ${id}`  
        })
    } catch(error) {
        res.status(500).json(error)
    }
})


module.exports = stages