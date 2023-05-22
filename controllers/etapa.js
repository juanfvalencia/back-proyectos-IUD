const Etapa = require('../models/etapa')
const { request, response} = require('express')

// crear
const createEtapa = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''

        const etapaDB = await Etapa.findOne({nombre})
        
        if(etapaDB){
           return res.status(400).json({msg: 'Ya existe'})
        }

        const data = {
            nombre: nombre  // nombre: nombre
        }
        const etapa = new Etapa(data)

        await etapa.save()
        return res.status(201).json(etapa)
    }catch(error){
        return res.status(500).json({
            msg: 'Error general ' + error
        })
    }
}

const getEtapa = async (req = request, 
    res = response) => {
        try{
            const etapasDB = await Etapa.find()
            return res.json(etapasDB)
        }catch(error){
            return res.status(500).json({
                msg: 'Error general ' + error
            })
        }
}


const updateEtapaByID = async (req = request,
    res = response) => {
    try{
        //console.log(req.body)
       // console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        //console.log(data)
        const etapa = await Etapa.findByIdAndUpdate(id, data, {new: true})
        return res.json(etapa)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg: error})  
    }
}

module.exports = {
    createEtapa,
    getEtapa,
    updateEtapaByID
}