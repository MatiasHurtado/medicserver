const express = require('express')
const mongoose = require('mongoose')
const conectarDB = require('./config/db');
const Cliente = require('./models/Cliente')
const Medico = require('./models/Medico')
const Agenda = require('./models/Agenda');
const { Mongoose } = require('mongoose');
const cors= require('cors')

//Creamos el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitamos Cors
app.use(cors())

const PORT = process.env.PORT || 4000;



//Habilitamos express.json
app.use(express.json({extended:true}));

//Creacion de usuario de prueba
//  Cliente.create(
//     {
//          nombre:'Marcelo',
//          correo:'Marcelo@correo.cl',
//         password:'123123'
//      }
// )
//Creacion de Medico de prueba

const crearMedico = () =>{

    Medico.create(
        {
          nombre:'Raul Ramirez ',
         especialidad:'Kinesiologia'
        }
    )
}
// crearMedico()

 



const buscarHora= async ()=>{

    //1-Padre
    const resultado = await Agenda.aggregate(
        [

            {   
                $lookup:
                {
                    from:"medicos",//Donde queremos que revise
                    localField:"medico",//EL campo que queremos que revise de nuestra bd
                    foreignField:"_id",//El campo que queremos que compare con la otra bd
                    as:"horas"//Donde queremos que se almacene
                }

            },{$match:{"horas.nombre":"Fernando Herrera"}},
            { $unwind:"$horas"},//ASI Le indicamos que nos envio la informacion de mejor manera
           ])
    console.log('El Usuario es ====> ', resultado)
}
// buscarHora()


//Definir la pagina principal


app.use('/api/agendas', require('./routes/agendas'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/auth', require('./routes/clientes'));


app.listen(PORT,() =>{
    console.log(`El servidor esta funcinando en el puerto ${PORT}`);
});

console.log('desde index')