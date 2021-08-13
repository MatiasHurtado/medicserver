const express = require('express')
const router = express.Router()
const medicoController = require('../controllers/medicoControlller')
router.get('/',
    
    medicoController.ObtenerMedicos
)
module.exports = router;