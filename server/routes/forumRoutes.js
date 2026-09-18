const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  toggleLike,
  addComment,
} = require('../controllers/forumController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/').get(getPosts).post(protect, upload.single('image'), createPost);
router.route('/:id').get(getPost).delete(protect, deletePost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comments', protect, addComment);

module.exports = router;
