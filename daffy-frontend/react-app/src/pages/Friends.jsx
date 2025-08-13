import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/friends.css';

const Friends = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState('all');
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with actual API calls when backend is ready
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/friends');
      // setFriends(response.data.friends);
      // setPendingRequests(response.data.pendingRequests);
      // setSuggestions(response.data.suggestions);
      
      // For now, show empty state
      setFriends([]);
      setPendingRequests([]);
      setSuggestions([]);
    } catch (error) {
      showError('Failed to load friends');
    } finally {
      setLoading(false);
    }
  };

  const handleFriendRequest = async (friendId, action) => {
    try {
      // TODO: Replace with actual API call
      // await axios.post(`/api/friends/${action}`, { friendId });
      showSuccess(`Friend request ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
      loadFriends(); // Reload data
    } catch (error) {
      showError(`Failed to ${action} friend request`);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      // TODO: Replace with actual API call
      // await axios.delete(`/api/friends/${friendId}`);
      showSuccess('Friend removed successfully');
      loadFriends(); // Reload data
    } catch (error) {
      showError('Failed to remove friend');
    }
  };

  if (loading) {
    return (
      <div className="friends-container">
        <div className="loading">Loading friends...</div>
      </div>
    );
  }

  return (
    <div className="friends-container">
      <div className="friends-header">
        <h1>Friends</h1>
        <div className="friends-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <i className="fas fa-users"></i>
            All Friends
          </button>
          <button 
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <i className="fas fa-user-plus"></i>
            Friend Requests
            {pendingRequests.length > 0 && (
              <span className="badge">{pendingRequests.length}</span>
            )}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggestions')}
          >
            <i className="fas fa-user-friends"></i>
            Suggestions
          </button>
        </div>
      </div>

      <div className="friends-content">
        {activeTab === 'all' && (
          <div className="friends-section">
            <h2>All Friends ({friends.length})</h2>
            {friends.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-users"></i>
                <h3>No friends yet</h3>
                <p>Start connecting with people to see your friends here</p>
              </div>
            ) : (
              <div className="friends-grid">
                {friends.map((friend) => (
                  <div key={friend.id} className="friend-card">
                    <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                    <div className="friend-info">
                      <h3>{friend.name}</h3>
                      <p>{friend.department}</p>
                    </div>
                    <div className="friend-actions">
                      <button className="btn-message">
                        <i className="fas fa-envelope"></i>
                        Message
                      </button>
                      <button 
                        className="btn-remove"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        <i className="fas fa-user-minus"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="friends-section">
            <h2>Friend Requests ({pendingRequests.length})</h2>
            {pendingRequests.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-user-plus"></i>
                <h3>No pending requests</h3>
                <p>You don't have any pending friend requests</p>
              </div>
            ) : (
              <div className="requests-grid">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <img src={request.avatar} alt={request.name} className="request-avatar" />
                    <div className="request-info">
                      <h3>{request.name}</h3>
                      <p>{request.department}</p>
                      <span className="request-time">{request.time}</span>
                    </div>
                    <div className="request-actions">
                      <button 
                        className="btn-accept"
                        onClick={() => handleFriendRequest(request.id, 'accept')}
                      >
                        <i className="fas fa-check"></i>
                        Accept
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleFriendRequest(request.id, 'reject')}
                      >
                        <i className="fas fa-times"></i>
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="friends-section">
            <h2>People You May Know ({suggestions.length})</h2>
            {suggestions.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-user-friends"></i>
                <h3>No suggestions</h3>
                <p>We'll show you people you may know here</p>
              </div>
            ) : (
              <div className="suggestions-grid">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="suggestion-card">
                    <img src={suggestion.avatar} alt={suggestion.name} className="suggestion-avatar" />
                    <div className="suggestion-info">
                      <h3>{suggestion.name}</h3>
                      <p>{suggestion.department}</p>
                      <span className="mutual-friends">{suggestion.mutualFriends} mutual friends</span>
                    </div>
                    <div className="suggestion-actions">
                      <button className="btn-add-friend">
                        <i className="fas fa-user-plus"></i>
                        Add Friend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
