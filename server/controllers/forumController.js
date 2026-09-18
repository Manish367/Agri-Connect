const asyncHandler = require('../utils/asyncHandler');
const Post = require('../models/Post');
const upload = require('../middleware/upload');

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'name state')
    .populate('comments.author', 'name')
    .sort({ createdAt: -1 });
  res.json(posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name state')
    .populate('comments.author', 'name');
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error('title and description are required');
  }
  const imageUrl = req.file ? (upload.useCloudinary ? req.file.path : `/uploads/${req.file.filename}`) : '';
  const post = await Post.create({ author: req.user._id, title, description, imageUrl });
  const populated = await post.populate('author', 'name state');
  res.status(201).json(populated);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
  if (!post) {
    res.status(404);
    throw new Error('Post not found or not yours to delete');
  }
  res.json({ message: 'Post removed' });
});

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  const uid = req.user._id.toString();
  const alreadyLiked = post.likes.some((id) => id.toString() === uid);
  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== uid);
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  res.json({ likes: post.likes });
});

const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('Comment text is required');
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  post.comments.push({ author: req.user._id, text });
  await post.save();
  const populated = await post.populate('comments.author', 'name');
  res.status(201).json(populated.comments);
});

module.exports = { getPosts, getPost, createPost, deletePost, toggleLike, addComment };
