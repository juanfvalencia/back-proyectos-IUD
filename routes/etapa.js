const { Router } = require('express')
const {
    createEtapa,
    getEtapa,
    updateEtapaByID
} = require('../controllers/etapa')

const router = Router()

router.post('/', createEtapa)
router.get('/', getEtapa)
router.put('/:id', updateEtapaByID)

module.exports = router;
