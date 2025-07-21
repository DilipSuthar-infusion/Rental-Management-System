import express from 'express';
import { addProperty } from '../controllers/property.controller.js';


const router = express.Router();


router.post('/addProperty', addProperty)



export default router;