const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){


    //lEE Nuestro token del header
    const token = req.header('x-auth-token')

    //Revisa si existe un token
    if(!token){
        return res.status(401).json({msg:'No ahi token, Permiso invalido'})
    }

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.cliente = cifrado.cliente;
        next();
        
    } catch (error) {
        res.status(401).json({msg:'Token No valido'})
        
    }

}