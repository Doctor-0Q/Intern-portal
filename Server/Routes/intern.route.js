import express from 'express';
import {findIntern} from '../Controllers/findIntern.js';

const router=express.Router();

router.route('/findIntern').post(findIntern)

export default router;