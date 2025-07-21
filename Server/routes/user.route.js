import express from 'express';
import { createProfile, getUserProfile, login, register } from '../controllers/user.controller.js';
import passport from 'passport';



const router = express.Router();



router.post('/register', register)
router.post('/login', login)
router.post('/createProfile',passport.authenticate('jwt', { session: false }), createProfile);
router.get('/getUserProfile', passport.authenticate("jwt",{session:false}), getUserProfile);
export default router;