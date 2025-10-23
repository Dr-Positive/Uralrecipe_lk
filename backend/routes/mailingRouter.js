import Router from 'express'
import mailingController from '../controllers/mailingController.js'
import checkRole from '../middleware/CheckRoleMiddleware.js'

const router = Router();

router.post('/', checkRole('ADMIN'), mailingController.create)
router.get('/', mailingController.getAll)
router.get('/:id', mailingController.getOne)
export default router
