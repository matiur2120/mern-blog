import express from 'express';
import { deleteUser, deleteUserByAdmin, getUsers, signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.get('/getusers', verifyToken, getUsers)
router.delete('/deletebyadmin/:deleteUserId/:userId', verifyToken, deleteUserByAdmin)
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router