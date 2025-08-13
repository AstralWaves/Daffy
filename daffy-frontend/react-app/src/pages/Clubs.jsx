import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/clubs.css';

const Clubs = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [clubs, setClubs] = useState([]);
  const [myClubs, setMyClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [clubNotifications, setClubNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [createForm, setCreateForm] = useState({
    name: '',
    category: '',
    description: '',
    rules: '',
    email: '',
    membershipFee: '',
    privacy: 'public'
  });

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'fas fa-th' },
    { id: 'academic', name: 'Academic', icon: 'fas fa-graduation-cap' },
    { id: 'sports', name: 'Sports', icon: 'fas fa-futbol' },
    { id: 'cultural', name: 'Cultural', icon: 'fas fa-music' },
    { id: 'technical', name: 'Technical', icon: 'fas fa-laptop-code' },
    { id: 'social', name: 'Social', icon: 'fas fa-users' },
    { id: 'other', name: 'Other', icon: 'fas fa-ellipsis-h' }
  ];

  useEffect(() => {
    loadClubs();
    loadClubNotifications();
  }, []);

  const loadClubs = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/clubs');
      // setClubs(response.data.clubs);
      // setMyClubs(response.data.myClubs);
      
      // Mock data for demonstration
      setClubs([
        {
          id: 1,
          name: 'DIU Programming Club',
          description: 'A community for programming enthusiasts to share knowledge and collaborate on projects.',
          category: 'technical',
          avatar: 'https://via.placeholder.com/80x80/007bff/ffffff?text=PC',
          members: 156,
          posts: 23,
          isPrivate: false,
          membershipFee: 0,
          userRole: 'member'
        },
        {
          id: 2,
          name: 'DIU Sports Club',
          description: 'Join us for various sports activities and tournaments throughout the year.',
          category: 'sports',
          avatar: 'https://via.placeholder.com/80x80/28a745/ffffff?text=SC',
          members: 89,
          posts: 12,
          isPrivate: false,
          membershipFee: 500,
          userRole: null
        },
        {
          id: 3,
          name: 'DIU Cultural Society',
          description: 'Celebrating diversity through cultural events, music, and art performances.',
          category: 'cultural',
          avatar: 'https://via.placeholder.com/80x80/dc3545/ffffff?text=CS',
          members: 234,
          posts: 45,
          isPrivate: true,
          membershipFee: 200,
          userRole: null
        }
      ]);
      setMyClubs([
        {
          id: 1,
          name: 'DIU Programming Club',
          description: 'A community for programming enthusiasts to share knowledge and collaborate on projects.',
          category: 'technical',
          avatar: 'https://via.placeholder.com/80x80/007bff/ffffff?text=PC',
          members: 156,
          posts: 23,
          isPrivate: false,
          membershipFee: 0,
          userRole: 'member'
        }
      ]);
    } catch (error) {
      showError('Failed to load clubs');
    } finally {
      setLoading(false);
    }
  };

  const loadClubNotifications = async () => {
    try {
      setClubNotifications([]);
    } catch (error) {
      showError('Failed to load club notifications');
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      showSuccess('Successfully joined the club!');
      loadClubs();
    } catch (error) {
      showError('Failed to join club');
    }
  };

  const handleLeaveClub = async (clubId) => {
    try {
      showSuccess('Successfully left the club');
      loadClubs();
    } catch (error) {
      showError('Failed to leave club');
    }
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      showSuccess('Club created successfully!');
      setShowCreateModal(false);
      setCreateForm({
        name: '',
        category: '',
        description: '',
        rules: '',
        email: '',
        membershipFee: '',
        privacy: 'public'
      });
      loadClubs();
    } catch (error) {
      showError('Failed to create club');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getBadgeIcon = (role) => {
    switch (role) {
      case 'president':
        return 'fas fa-crown';
      case 'vice_president':
        return 'fas fa-star';
      case 'executive':
        return 'fas fa-medal';
      case 'paid_member':
        return 'fas fa-gem';
      case 'unpaid_member':
        return 'fas fa-user';
      case 'member':
        return 'fas fa-user-check';
      default:
        return 'fas fa-user';
    }
  };

  const getBadgeColor = (role) => {
    switch (role) {
      case 'president':
        return '#FFD700';
      case 'vice_president':
        return '#C0C0C0';
      case 'executive':
        return '#CD7F32';
      case 'paid_member':
        return '#00CED1';
      case 'unpaid_member':
        return '#808080';
      case 'member':
        return '#28a745';
      default:
        return '#808080';
    }
  };

  if (loading) {
    return (
      <div className="clubs-container">
        <div className="loading">Loading clubs...</div>
      </div>
    );
  }

  return (
    <div className="clubs-container">
      {/* Fixed Top Bar */}
      <div className="clubs-top-bar">
        <div className="search-section">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              className="club-search-input"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="top-actions">
          <div className="notification-section">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell"></i>
              {clubNotifications.length > 0 && (
                <span className="notification-badge">{clubNotifications.length}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <h3>Club Notifications</h3>
                {clubNotifications.length === 0 ? (
                  <p>No new notifications</p>
                ) : (
                  clubNotifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          <button 
            className="create-club-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="fas fa-plus"></i>
            Create Club
          </button>
        </div>
      </div>

      <div className="clubs-content">
        {/* Categories Filter */}
        <div className="categories-filter">
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Facebook Style */}
        <div className="clubs-main-content">
          {/* My Clubs Section */}
          {myClubs.length > 0 && (
            <div className="clubs-section">
              <h2>My Clubs ({myClubs.length})</h2>
              <div className="clubs-grid">
                {myClubs.map((club) => (
                  <div key={club.id} className="club-card my-club">
                    <div className="club-header">
                      <img src={club.avatar} alt={club.name} className="club-avatar" />
                      <div className="club-info">
                        <h3>{club.name}</h3>
                        <p>{club.description}</p>
                        <div className="club-stats">
                          <span className="club-members">{club.members} members</span>
                          <span className="club-posts">{club.posts} posts</span>
                        </div>
                      </div>
                      <div className="user-badge">
                        <i 
                          className={getBadgeIcon(club.userRole)} 
                          style={{ color: getBadgeColor(club.userRole) }}
                        ></i>
                        <span className="badge-label">{club.userRole.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div className="club-actions">
                      <button className="btn-view-club">
                        <i className="fas fa-eye"></i>
                        View Club
                      </button>
                      <button 
                        className="btn-leave-club"
                        onClick={() => handleLeaveClub(club.id)}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        Leave
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discover Clubs Section */}
          <div className="clubs-section">
            <h2>Discover Clubs ({filteredClubs.length})</h2>
            {filteredClubs.length === 0 ? (
              <div className="empty-clubs">
                <i className="fas fa-search"></i>
                <h3>No clubs found</h3>
                <p>Try adjusting your search or check back later</p>
              </div>
            ) : (
              <div className="clubs-grid">
                {filteredClubs.map((club) => (
                  <div key={club.id} className="club-card">
                    <div className="club-header">
                      <img src={club.avatar} alt={club.name} className="club-avatar" />
                      <div className="club-info">
                        <div className="club-title">
                          <h3>{club.name}</h3>
                          {club.isPrivate && (
                            <span className="privacy-badge">
                              <i className="fas fa-lock"></i>
                              Private
                            </span>
                          )}
                        </div>
                        <p>{club.description}</p>
                        <div className="club-stats">
                          <span className="club-members">{club.members} members</span>
                          <span className="club-posts">{club.posts} posts</span>
                          {club.membershipFee > 0 && (
                            <span className="membership-fee">৳{club.membershipFee} fee</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="club-actions">
                      <button 
                        className="btn-join-club"
                        onClick={() => handleJoinClub(club.id)}
                      >
                        <i className="fas fa-user-plus"></i>
                        Join Club
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Club Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Club</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleCreateClub} className="create-club-form">
              <div className="form-group">
                <label>Club Name *</label>
                <input
                  type="text"
                  name="name"
                  value={createForm.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={createForm.category}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="academic">Academic</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="technical">Technical</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={createForm.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Club Rules</label>
                <textarea
                  name="rules"
                  value={createForm.rules}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Enter club rules and guidelines..."
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>University Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={createForm.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@university.edu"
                    required
                  />
                  <small>Verify your university club email</small>
                </div>
                
                <div className="form-group">
                  <label>Membership Fee (৳)</label>
                  <input
                    type="number"
                    name="membershipFee"
                    value={createForm.membershipFee}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0"
                    min="0"
                  />
                  <small>Set to 0 for free membership</small>
                </div>
              </div>
              
              <div className="form-group">
                <label>Privacy Setting</label>
                <select
                  name="privacy"
                  value={createForm.privacy}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="public">Public - Anyone can join</option>
                  <option value="private">Private - Approval required</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  Create Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;

