import Router from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/logining', userController.logining);
router.get('/auth', authMiddleware, userController.check); 
router.get('/', userController.getAll);
router.post('/hash-passwords', userController.hashPasswords);
// router.post("/request-email-change", userController.requestEmailChange);
// router.post("/verify-email-change", userController.confirmEmailChange);


export default router;