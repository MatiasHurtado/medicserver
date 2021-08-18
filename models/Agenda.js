const mongoose = require('mongoose')

const agendasSchema = mongoose.Schema({
    fecha:{
        type:Date,
        require:true
        
    },
    medico:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Medico',
        require:true
    },
    cliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cliente'
    },
    estado:{
        type:Boolean,
        default:false
    }
    

})

module.exports = mongoose.model('Agenda',agendasSchema)