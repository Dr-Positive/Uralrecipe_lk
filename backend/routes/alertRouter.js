const Router = require('express')
const router = new Router
const alertController = require('../controllers/alertController')
const checkRole = require('../middleware/СheckRoleMiddleware')


router.post('/', checkRole('ADMIN'), alertController.create)
router.get('/', alertController.getAll)
 
module.exports = router   