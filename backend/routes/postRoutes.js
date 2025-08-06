const express = require('express');
const router = express.Router();
const { createPost, getUserPosts, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
// const { createPost, getUserPosts, getAllPosts } = require('../controllers/postController');


router.post('/', authMiddleware, createPost);
router.get('/my-posts', authMiddleware, getUserPosts);
router.get('/all', getAllPosts); 


module.exports = router;
