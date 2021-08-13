const Medico = require('../models/Medico')

exports.ObtenerMedicos = async(req, res)=>{

    try {

        const medico = await Medico.find()
        res.json({medico})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio Un Error')
    }


}