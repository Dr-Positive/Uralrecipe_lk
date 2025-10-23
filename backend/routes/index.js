import { Router } from "express";
import alertRouter from './alertRouter.js'
import mailingRouter from './mailingRouter.js'
import userRouter from './userRouter.js'
import authRouter from './authRouter.js'

const router = Router();

router.use('/alert', alertRouter )
router.use('/mailing', mailingRouter )
router.use('/user', userRouter )
router.use('/auth', authRouter )


export default router;