const Router = require('express')
const router = new Router
const mailingController = require('../controllers/mailingController')
const checkRole = require('../middleware/СheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), mailingController.create)
router.get('/', mailingController.getAll)

module.exports = router
