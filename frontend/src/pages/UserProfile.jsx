import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };
    fetchProfile();
  }, [id]);

  if (!userData) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{userData.user.name}</h2>
      <p className="text-gray-600 mb-4">{userData.user.bio}</p>
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-3">Posts by {userData.user.name}</h3>
      <div className="space-y-3">
        {userData.posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          userData.posts.map((post) => (
            <div key={post._id} className="border p-3 rounded">
              <p>{post.content}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserProfile;
