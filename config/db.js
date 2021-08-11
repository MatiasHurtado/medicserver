const mongoose = require('mongoose')
//Accedemos a la variable de mongo 
require('dotenv').config({path:'variables.env'})

const conectarDb = async() =>{

    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true

        })
        console.log('desde db.js')
    }catch(error){
        console.log(error)
    }


}
module.exports = conectarDb