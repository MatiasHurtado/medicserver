const express = require('express')
const router = express.Router();
const agendaController = require('../controllers/agendaController');
const auth = require('../middleware/auth');



router.post('/',
    agendaController.CrearAgenda
)
router.get('/:medico/:estado',
    agendaController.ObtenerAgendas
)
router.get('/:cliente',
    auth,
    agendaController.obtenerAgendaCliente
)
router.put('/:id',
    
    agendaController.AsignarAgenda
)
router.put('/:id/rechazar',
    
    agendaController.RechazarHora
)
router.delete('/:id',
    agendaController.EliminarAgenda
)



module.exports = router;