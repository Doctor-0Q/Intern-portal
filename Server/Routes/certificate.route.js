import { validateCertificate } from "../Controllers/validateCertificate.js";
import express from "express";

const router=express.Router();

router.route('/validate').post(validateCertificate);

export default router;