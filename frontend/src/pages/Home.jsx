import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/all');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load public feed:', err);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        🌐 Public Feed
      </h1>

      <div className="flex flex-col gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading posts...
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-5 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <p className="text-lg leading-relaxed text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500 mt-3">
                —{' '}
                <a
                  href={`/user/${post.author?._id}`}
                  className="text-blue-600 hover:underline hover:text-blue-800"
                >
                  {post.author?.name || 'Unknown'}
                </a>{' '}
                on{' '}
                <span className="italic">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
