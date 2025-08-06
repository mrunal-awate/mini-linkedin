import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return navigate('/login');
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/my-posts', {
          headers: { Authorization: token },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [navigate, token]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/posts',
        { content },
        {
          headers: { Authorization: token },
        }
      );
      setPosts([res.data, ...posts]);
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Loading your profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f3f2ef] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        {/* Profile Header */}
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">👤 My Profile</h2>

        {/* User Info */}
        <div className="grid sm:grid-cols-2 gap-6 text-gray-800 text-base mb-8">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold">Bio:</span>{' '}
            {user.bio || <span className="text-gray-400">No bio provided.</span>}
          </p>
        </div>

        {/* Post Form */}
        <form onSubmit={handlePostSubmit} className="mb-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="✨ What's on your mind today?"
            className="w-full border-2 border-gray-200 focus:border-blue-400 rounded-lg p-4 resize-none outline-none transition shadow-sm focus:shadow-md mb-4"
            rows="4"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition w-full sm:w-auto"
          >
            ➕ Post
          </button>
        </form>

        {/* Post Feed */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-5">📝 My Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500 italic">You haven’t posted anything yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-blue-50 border border-blue-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-800">{post.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Posted on {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
