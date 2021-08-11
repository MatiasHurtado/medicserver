const mongoose = require('mongoose');

const ClientesSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    correo:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model('Cliente' , ClientesSchema)