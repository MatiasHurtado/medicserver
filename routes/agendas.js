const express = require('express')
const router = express.Router();
const agendaController = require('../controllers/agendaController')


router.get('/',
    
    agendaController.ObtenerAgendas
)
module.exports = router;