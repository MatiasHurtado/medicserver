const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router()





router.post('/',
    authController.crearCliente
)


router.post('/auth',
    authController.autenticarUsuario
)

//Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;