import Router from 'express';
import alertController from '../controllers/alertController.js';
import checkRole from '../middleware/CheckRoleMiddleware.js'; 

const router = Router();

router.post('/', checkRole('ADMIN'), alertController.create);
router.get('/', alertController.getAll);
router.get('/:id', alertController.getOne);

export default router;
