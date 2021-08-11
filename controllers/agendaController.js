const Agenda = require('../models/Agenda')

exports.CrearAgenda= async (req,res) =>{

    try {

        const  agenda = new Agenda(req.body)
        agenda.save()
        res.json(agenda)
        console.log("Agenda Creada Con Exito")
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }





}



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

    try {
        //Revisamos la agenda
        let agenda= await Agenda.findById(req.params.id)
        console.log(agenda)
        const {estado,cliente} = req.body

        const nuevaAgenda = {};

        if(estado){
            nuevaAgenda.estado = estado
        }if(cliente){
            nuevaAgenda.cliente = cliente
        }

        
      //Verificamos si la agenda existe
       if(!agenda){
           console.log("aa")
            return res.status(404).json({msg:'Agenda no encontrada'})
         
        }

        //Actualizamos la agenda

        agenda = await Agenda.findByIdAndUpdate({_id:req.params.id},{$set:nuevaAgenda})
        console.log("paso3")
        res.json({agenda})



    } catch (error) {
        console.log(error)
    }
}