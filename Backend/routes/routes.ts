import express from 'express';

import loginRouter from './login'
import signupRouter from './signup'
import registerRouter from './register'
import employeeRouter from './employee'
import FindMobileNumber from './FindMobileNumber'
import getRoomMessages from './getRoomMessages'
// import message from './message'


const router = express.Router();

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/register', registerRouter);
router.use('/employees', employeeRouter);
router.use('/findMobileNumber', FindMobileNumber);
router.use('/getRoomMessages', getRoomMessages);
// router.use('/', message);




export default router;