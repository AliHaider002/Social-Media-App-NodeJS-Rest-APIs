import express from 'express';
import { createPost, deletePost, getPost, likePost, timelinePost, updatePost } from '../Controllers/PostCont.js';

const router = express.Router();

router.post('/create', createPost );
router.get('/get/:id', getPost) ;
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);
router.put('/like/:id', likePost);
router.get('/timeline', timelinePost);

export default router;