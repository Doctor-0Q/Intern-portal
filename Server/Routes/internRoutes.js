import express from 'express';
import multer from 'multer';
import path from 'path';
import { addIntern } from '../Controllers/addIntern.js';
import { findIntern } from '../Controllers/findIntern.js';
import { updateIntern } from '../Controllers/updateIntern.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Documents/temp/');  // Temporary upload location
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.route('/findIntern').post(findIntern);

router.route('/updateIntern').put(upload.fields([
  { name: 'offerLetter', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'lor', maxCount: 1 }
]), updateIntern);

router.route('/addIntern').post(upload.fields([
  { name: 'offerLetter', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'lor', maxCount: 1 }
]), addIntern);

export default router;