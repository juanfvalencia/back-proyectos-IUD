const { Router } = require('express')
const {
    createUniversidad,
    getUniversidad,
    updateUniversidadByID
} = require('../controllers/universidad')

const router = Router()

router.post('/', createUniversidad)
router.get('/', getUniversidad)
router.put('/:id', updateUniversidadByID)


module.exports = router;