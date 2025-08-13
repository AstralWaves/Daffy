import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/home.css';

const Home = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [notices, setNotices] = useState([]);
  const [departmentUpdates, setDepartmentUpdates] = useState([]);

  useEffect(() => {
    // This will be replaced with actual API calls when backend is ready
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // TODO: Replace with actual API calls
      // const postsResponse = await axios.get('/api/posts');
      // const storiesResponse = await axios.get('/api/stories');
      // const noticesResponse = await axios.get('/api/notices');
      // const deptUpdatesResponse = await axios.get('/api/department-updates');
      
      // For now, show empty state
      setPosts([]);
      setStories([]);
      setNotices([]);
      setDepartmentUpdates([]);
    } catch (error) {
      showError('Failed to load data');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showError('File size should be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim() && !selectedFile) {
      showError('Please write something or add a file');
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('content', postContent);
      // if (selectedFile) {
      //   formData.append('file', selectedFile);
      // }
      // await axios.post('/api/posts', formData);
      
      showSuccess('Post created successfully!');
      setPostContent('');
      setSelectedFile(null);
      loadInitialData(); // Reload posts
    } catch (error) {
      showError('Failed to create post');
    }
  };

  const handleCreateStory = async () => {
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // await axios.post('/api/stories', formData);
      
      showSuccess('Story created successfully!');
      setSelectedFile(null);
      loadInitialData(); // Reload stories
    } catch (error) {
      showError('Failed to create story');
    }
  };

  return (
    <div className="home-container">
      {/* Fixed Content Sharing Bar */}
      <div className="fixed-content-bar">
        <div className="create-post-section">
          <div className="post-input-container">
            <img 
              src={user?.avatar || `https://via.placeholder.com/40x40/FFD700/000000?text=${user?.firstName?.charAt(0) || 'U'}`} 
              alt="User Avatar" 
              className="user-avatar-small"
            />
            <div className="post-input-wrapper">
              <input 
                type="text" 
                className="post-input" 
                placeholder="What's on your mind?" 
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <div className="post-actions">
                <label className="post-action-btn">
                  <i className="fas fa-image"></i>
                  <span>Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </label>
                <label className="post-action-btn">
                  <i className="fas fa-video"></i>
                  <span>Video</span>
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </label>
                <button className="post-action-btn">
                  <i className="fas fa-smile"></i>
                  <span>Feeling</span>
                </button>
                <button className="post-action-btn">
                  <i className="fas fa-share"></i>
                  <span>Share</span>
                </button>
              </div>
              {selectedFile && (
                <div className="selected-file">
                  <span>{selectedFile.name}</span>
                  <button 
                    className="remove-file-btn"
                    onClick={() => setSelectedFile(null)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
              <button className="post-btn" onClick={handleCreatePost}>
                <i className="fas fa-paper-plane"></i>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="home-content">
        {/* Main Content Area - Scrollable */}
        <div className="main-feed">
          {/* Stories Section */}
          <div className="stories-section">
            <div className="stories-container">
              <div className="story-item" onClick={handleCreateStory}>
                <div className="story-avatar">
                  <img 
                    src={user?.avatar || `https://via.placeholder.com/60x60/FFD700/000000?text=${user?.firstName?.charAt(0) || 'U'}`} 
                    alt="Your Story" 
                    className="story-img"
                  />
                  <div className="story-add-icon">
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
                <span className="story-username">Your Story</span>
              </div>
              {stories.map((story) => (
                <div key={story.id} className="story-item">
                  <div className="story-avatar has-story">
                    <img src={story.avatar} alt={story.username} className="story-img" />
                  </div>
                  <span className="story-username">{story.username}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {posts.length === 0 ? (
              <div className="empty-posts">
                <i className="fas fa-newspaper"></i>
                <h3>No posts yet</h3>
                <p>Be the first to share something!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <img src={post.userAvatar} alt="User" className="post-user-avatar" />
                    <div className="post-user-info">
                      <h4 className="post-user-name">{post.userName}</h4>
                      <span className="post-time">{post.time}</span>
                    </div>
                    <button className="post-menu-btn">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                  <div className="post-content">
                    <p className="post-text">{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post Image" className="post-image" />
                    )}
                  </div>
                  <div className="post-actions">
                    <button className="post-action">
                      <i className="fas fa-heart"></i>
                      <span>Like</span>
                    </button>
                    <button className="post-action">
                      <i className="fas fa-comment"></i>
                      <span>Comment</span>
                    </button>
                    <button className="post-action">
                      <i className="fas fa-share"></i>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fixed Right Sidebar */}
        <aside className="fixed-right-sidebar">
          {/* Notices Section */}
          <div className="sidebar-section">
            <h3 className="section-title">
              <i className="fas fa-bullhorn"></i>
              Notices
            </h3>
            <div className="notice-list">
              {notices.length === 0 ? (
                <div className="empty-notices">
                  <p>No notices at the moment</p>
                </div>
              ) : (
                notices.map((notice) => (
                  <div key={notice.id} className="notice-item">
                    <div className="notice-icon">
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <div className="notice-content">
                      <h4>{notice.title}</h4>
                      <p>{notice.description}</p>
                      <span className="notice-time">{notice.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Department Updates */}
          <div className="sidebar-section">
            <h3 className="section-title">
              <i className="fas fa-building"></i>
              Department Updates
            </h3>
            <div className="department-list">
              {departmentUpdates.length === 0 ? (
                <div className="empty-departments">
                  <p>No department updates at the moment</p>
                </div>
              ) : (
                departmentUpdates.map((update) => (
                  <div key={update.id} className="department-item">
                    <div className="department-icon">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <div className="department-content">
                      <h4>{update.department}</h4>
                      <p>{update.message}</p>
                      <span className="update-time">{update.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;

