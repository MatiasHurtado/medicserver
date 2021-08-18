const Cliente = require('../models/Cliente')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt= require('jsonwebtoken')


exports.crearCliente = async(req,res)=>{

    //Revisamos SI Hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }



    const {correo,password} = req.body;

    try {

        //Revisamos si el cliente Existe
        let cliente = await Cliente.findOne({correo})

        if(cliente){
            return res.status(400).json({msg:'El Cliente Ya existe'})
        }
        
        //Creamos el cliente
         cliente = new Cliente(req.body)

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        cliente.password = await bcryptjs.hash(password,salt )


        //Guardamos el cliente en la base de datos
         await cliente.save()

        //Crear y firmar el JWT
        const payload = {
            cliente:{
                id:cliente.id
            }
        };
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:36000 
        },(error,token)=>{
            if(error) throw error

            //Mensaje de confirmacion
        
            res.json({token});
        });

       


    } catch (error) {
        res.status(400).send('Hubo un error')
    }
}



exports.autenticarUsuario = async (req,res)=>{
    //Revisamos SI Hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    
  
    const {correo,password} = req.body

    try {

        //Revisamos si el cliente Existe

        let cliente = await  Cliente.findOne({correo});
        if(!cliente){
            return res.status(400).json({msg:'El usuario no existe'})
        }

        //Revisar El password
        const passCorrecta = await bcryptjs.compare(password, cliente.password)
        if(!passCorrecta){
            return res.status(400).json({msg:'Password Incorrecto'})
        }

            //Crear y firmar el JWT
            const payload = {
                cliente:{
                    id:cliente.id
                }
            };
            jwt.sign(payload,process.env.SECRETA,{
                expiresIn:36000 
            },(error,token)=>{
                if(error) throw error
    
                //Mensaje de confirmacion
            
                res.json({token});
            });
    



        
    } catch (error) {
        console.log(error)
        
    }

}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req,res) =>{

    try { 
        const cliente = await Cliente.findById(req.cliente.id).select('-password')
        res.json({cliente}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo Un error'})
    }

}