const express = require('express')
const mongoose = require('mongoose')
const conectarDB = require('./config/db');
const Cliente = require('./models/Cliente')
const Medico = require('./models/Medico')
const Agenda = require('./models/Agenda');
const { Mongoose } = require('mongoose');

//Creamos el servidor
const app = express();

//Conectar a la base de datos
conectarDB();


const PORT = process.env.PORT || 4000;



//Habilitamos express.json
app.use(express.json({extended:true}));

//Creacion de usuario de prueba
// Cliente.create(
//     {
//         nombre:'Marcelo',
//         correo:'Marcelo@correo.cl',
//         password:'123123'
//     }
// )
//Creacion de Medico de prueba
// Medico.create(
//      {
//          nombre:'Fernando Herrera',
//          especialidad:'Dentista'
//     }
//  )

const crearHora = ()=>{
    Agenda.create({
        fecha:"01/06/2021",
        medico:mongoose.Types.ObjectId("61130d3de053a031d8f63beb"),
        cliente:mongoose.Types.ObjectId("61130b0552cda631f865a1d0"),
        estado:false,
    })
}
// crearHora()
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
//  buscarHora()


//Definir la pagina principal


app.use('/api/agendas', require('./routes/agendas'));


app.listen(PORT,() =>{
    console.log(`El servidor esta funcinando en el puerto ${PORT}`);
});

console.log('desde index')