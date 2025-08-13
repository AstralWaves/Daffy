import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/trends.css';

const Trends = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [trends, setTrends] = useState([]);
  const [topHashtags, setTopHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with actual API calls when backend is ready
    loadTrends();
    loadTopHashtags();
  }, []);

  const loadTrends = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/trends');
      // setTrends(response.data.trends);
      
      // For now, show empty state
      setTrends([]);
    } catch (error) {
      showError('Failed to load trends');
    } finally {
      setLoading(false);
    }
  };

  const loadTopHashtags = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/hashtags/top');
      // setTopHashtags(response.data.hashtags);
      
      // For now, show empty state
      setTopHashtags([]);
    } catch (error) {
      showError('Failed to load top hashtags');
    }
  };

  const handleHashtagClick = async (hashtag) => {
    setSelectedHashtag(hashtag);
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get(`/api/trends/hashtag/${hashtag.id}`);
      // setTrends(response.data.trends);
      
      showSuccess(`Showing trends for #${hashtag.name}`);
    } catch (error) {
      showError('Failed to load hashtag trends');
    }
  };

  if (loading) {
    return (
      <div className="trends-container">
        <div className="loading">Loading trends...</div>
      </div>
    );
  }

  return (
    <div className="trends-container">
      <div className="trends-content">
        {/* Main Content Area - Scrollable */}
        <div className="main-trends">
          <div className="trends-header">
            <h1>Trends</h1>
            <p>Discover what's trending in your community</p>
            {selectedHashtag && (
              <div className="selected-hashtag">
                <span>Showing trends for: </span>
                <span className="hashtag-tag">#{selectedHashtag.name}</span>
                <button 
                  className="clear-hashtag-btn"
                  onClick={() => {
                    setSelectedHashtag(null);
                    loadTrends();
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
          </div>

          <div className="trends-main-content">
            {trends.length === 0 ? (
              <div className="empty-trends">
                <i className="fas fa-fire"></i>
                <h3>No trends yet</h3>
                <p>Trends will appear here based on popular topics and discussions</p>
              </div>
            ) : (
              <div className="trends-grid">
                {trends.map((trend) => (
                  <div key={trend.id} className="trend-card">
                    <div className="trend-header">
                      <span className="trend-category">{trend.category}</span>
                      <span className="trend-posts">{trend.posts} posts</span>
                    </div>
                    <h3 className="trend-title">{trend.title}</h3>
                    <p className="trend-description">{trend.description}</p>
                    <div className="trend-stats">
                      <span className="trend-views">{trend.views} views</span>
                      <span className="trend-time">{trend.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Right Sidebar - Top Hashtags */}
        <aside className="trends-right-sidebar">
          <div className="sidebar-section">
            <h3 className="section-title">
              <i className="fas fa-hashtag"></i>
              Top Hashtags
            </h3>
            <div className="hashtags-list">
              {topHashtags.length === 0 ? (
                <div className="empty-hashtags">
                  <p>No hashtags trending yet</p>
                </div>
              ) : (
                topHashtags.map((hashtag) => (
                  <div 
                    key={hashtag.id} 
                    className={`hashtag-item ${selectedHashtag?.id === hashtag.id ? 'active' : ''}`}
                    onClick={() => handleHashtagClick(hashtag)}
                  >
                    <div className="hashtag-info">
                      <span className="hashtag-name">#{hashtag.name}</span>
                      <span className="hashtag-posts">{hashtag.posts} posts</span>
                    </div>
                    <div className="hashtag-trend">
                      <i className={`fas fa-arrow-${hashtag.trending}`}></i>
                      <span className="trend-indicator">{hashtag.trending}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title">
              <i className="fas fa-chart-line"></i>
              Trending Topics
            </h3>
            <div className="topics-list">
              <div className="topic-item">
                <span className="topic-rank">1</span>
                <div className="topic-info">
                  <span className="topic-name">Technology</span>
                  <span className="topic-posts">1.2K posts</span>
                </div>
              </div>
              <div className="topic-item">
                <span className="topic-rank">2</span>
                <div className="topic-info">
                  <span className="topic-name">Programming</span>
                  <span className="topic-posts">856 posts</span>
                </div>
              </div>
              <div className="topic-item">
                <span className="topic-rank">3</span>
                <div className="topic-info">
                  <span className="topic-name">Web Development</span>
                  <span className="topic-posts">654 posts</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Trends;

