const express = require('express')
const router = express.Router();
const agendaController = require('../controllers/agendaController')



router.post('/',
    agendaController.CrearAgenda
)
router.get('/:medico/:estado',
    agendaController.ObtenerAgendas
)

router.put('/:id',
    
    agendaController.AsignarAgenda
)
router.delete('/:id',
    agendaController.EliminarAgenda
)
module.exports = router;