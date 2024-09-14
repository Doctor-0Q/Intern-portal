import express from 'express';
import { adminLogin } from '../Controllers/adminLogin.js';

const router=express.Router();

router.route('/adminLogin').post(adminLogin)

export default router;