const Router = require('express')
const router = new Router
const mailingController = require('../controllers/mailingController')
const checkRole = require('../middleware/СheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), mailingController.create)
router.get('/', mailingController.getAll)
router.get('/:id', mailingController.getOne)
module.exports = router
