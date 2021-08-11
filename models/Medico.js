const mongoose = require('mongoose')
const MedicosSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    especialidad:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model('Medico', MedicosSchema)