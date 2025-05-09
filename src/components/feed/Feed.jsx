import { useState, useEffect } from 'react';
import PostCard from './PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch posts from API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // TODO: Implement API call
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg resize-none"
          rows="3"
        />
        <div className="mt-3 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <span>📷 Photo</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <span>🎥 Video</span>
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Post
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}