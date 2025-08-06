const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === '') {
      return res.status(400).json({ msg: 'Post content is required' });
    }

    const newPost = await Post.create({
      content,
      author: userId,
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name') // get author's name only
      .sort({ createdAt: -1 });   // newest first

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
