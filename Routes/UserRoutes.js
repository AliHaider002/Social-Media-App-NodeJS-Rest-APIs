import express from 'express';
import { deleteUser, followUser, getUser, unFollowUser, updateUser } from '../Controllers/UserCont.js';

const router = express.Router();

router.get('/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);

export default router;