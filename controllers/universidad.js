const Universidad = require('../models/universidad')
const {request, response} = require('express')

//crear
const createUniversidad = async(req = request, res =  response) => {
    try {
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''

        const direccion = req.body.direccion
        const telefono =  req.body.telefono

        const universidadDB = await Universidad.findOne({nombre})

        if(universidadDB){
            return res.status(400).json({msg: 'El nombre de la universidad ya existe'})
        }

        const data = {
            nombre, 
            direccion,
            telefono
        }

        const universidad = new Universidad(data)
        await universidad.save();
        return res.status(201).json(universidad)

    } catch (error) {
        return res.status(500).json({
            msg: 'Error generado', error
        })
    }
}

//listar
const getUniversidad = async(req = request, res =  response) => {
        try{
            const universidadDB = await Universidad.find()
            return res.json(universidadDB)
        }catch(error){
            return res.status(500).json({
                msg: 'Error general ' + error
            })
        }
}

//actualizar
const updateUniversidadByID = async(req = request, res =  response) => {
    try{
        //console.log(req.body)
       // console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        //console.log(data)
        const universidad = await Universidad.findByIdAndUpdate(id, data, {new: true})
        return res.json(universidad)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

module.exports = {
    createUniversidad,
    getUniversidad,
    updateUniversidadByID
}