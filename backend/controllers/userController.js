const User = require('../models/User');
const Post = require('../models/Post');

exports.getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
