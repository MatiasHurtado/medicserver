const Agenda = require('../models/Agenda')

exports.ObtenerAgendas = async (req,res) =>{


    try{
        const valor = (req.body)
        const agendas = await Agenda.find({estado:valor.estado})
        res.json({agendas})
        console.log(valor)
    }catch (error){
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}
exports.AsignarAgenda = async (req, res) =>{
    
}