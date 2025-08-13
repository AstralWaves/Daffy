import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/settings.css';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    department: user?.department || '',
    graduationYear: user?.graduationYear || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    postVisibility: 'public',
    messageVisibility: 'friends'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    friendRequests: true,
    messages: true,
    comments: true,
    likes: true
  });

  const [customizationSettings, setCustomizationSettings] = useState({
    darkMode: true,
    language: 'english'
  });

  const [blockedUsers, setBlockedUsers] = useState([]);
  const [recentLogins, setRecentLogins] = useState([]);

  useEffect(() => {
    // Load additional data
    loadBlockedUsers();
    loadRecentLogins();
  }, []);

  const loadBlockedUsers = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/user/blocked');
      // setBlockedUsers(response.data.blockedUsers);
      setBlockedUsers([]);
    } catch (error) {
      showError('Failed to load blocked users');
    }
  };

  const loadRecentLogins = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/user/recent-logins');
      // setRecentLogins(response.data.recentLogins);
      setRecentLogins([]);
    } catch (error) {
      showError('Failed to load recent logins');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // await axios.put('/api/user/profile', formData);
      // await updateUser(formData);
      
      showSuccess('Profile updated successfully!');
    } catch (error) {
      showError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await axios.put('/api/user/password', passwordData);
      showSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      showError('Failed to change password');
    }
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showError('Image size should be less than 5MB');
        return;
      }
      setProfileImage(file);
      // TODO: Upload image to server
      showSuccess('Profile image updated successfully!');
    }
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleCustomizationChange = (setting, value) => {
    setCustomizationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleBlockUser = async (userId) => {
    try {
      // TODO: Replace with actual API call
      // await axios.post(`/api/user/block/${userId}`);
      showSuccess('User blocked successfully');
      loadBlockedUsers();
    } catch (error) {
      showError('Failed to block user');
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      // TODO: Replace with actual API call
      // await axios.delete(`/api/user/block/${userId}`);
      showSuccess('User unblocked successfully');
      loadBlockedUsers();
    } catch (error) {
      showError('Failed to unblock user');
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      // TODO: Replace with actual API call
      // await axios.post('/api/auth/logout-all');
      showSuccess('Logged out from all devices');
      setShowLogoutModal(false);
    } catch (error) {
      showError('Failed to logout from all devices');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // TODO: Replace with actual API call
      // await axios.delete('/api/user/account');
      showSuccess('Account deleted successfully');
      logout();
    } catch (error) {
      showError('Failed to delete account');
    }
  };

  const handleReportProblem = () => {
    // TODO: Implement report problem functionality
    showSuccess('Report submitted successfully');
  };

  const handleSendFeedback = () => {
    // TODO: Implement feedback functionality
    showSuccess('Feedback sent successfully');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <i className="fas fa-user"></i>
            Account Settings
          </button>
          <button 
            className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <i className="fas fa-lock"></i>
            Privacy Settings
          </button>
          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i>
            Notifications
          </button>
          <button 
            className={`settings-tab ${activeTab === 'customization' ? 'active' : ''}`}
            onClick={() => setActiveTab('customization')}
          >
            <i className="fas fa-palette"></i>
            Customization
          </button>
          <button 
            className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <i className="fas fa-shield-alt"></i>
            Security
          </button>
          <button 
            className={`settings-tab ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => setActiveTab('help')}
          >
            <i className="fas fa-question-circle"></i>
            Help & Feedback
          </button>
        </div>

        <div className="settings-main">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              
              {/* Profile Picture Upload */}
              <div className="profile-image-section">
                <h3>Profile Picture</h3>
                <div className="profile-image-upload">
                  <img 
                    src={profileImage ? URL.createObjectURL(profileImage) : user?.avatar || 'https://via.placeholder.com/100x100'} 
                    alt="Profile" 
                    className="profile-preview"
                  />
                  <label className="upload-btn">
                    <i className="fas fa-camera"></i>
                    Change Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfileImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              {/* Profile Info Form */}
              <form onSubmit={handleSaveProfile} className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="settings-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="settings-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="settings-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="settings-input"
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="settings-input"
                  />
                </div>

                <div className="form-group">
                  <label>Graduation Year</label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="settings-input"
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="settings-textarea"
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>

              {/* Change Password */}
              <div className="password-section">
                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword} className="settings-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="settings-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="settings-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="settings-input"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-save">
                    Change Password
                  </button>
                </form>
              </div>

              {/* Delete Account */}
              <div className="danger-section">
                <h3>Delete Account</h3>
                <p>This action cannot be undone. All your data will be permanently deleted.</p>
                <button 
                  className="btn-danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className="fas fa-trash"></i>
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              
              <div className="settings-form">
                <div className="privacy-option">
                  <div className="privacy-info">
                    <h3>Profile Visibility</h3>
                    <p>Control who can see your profile information</p>
                  </div>
                  <select 
                    className="settings-select"
                    value={privacySettings.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="privacy-option">
                  <div className="privacy-info">
                    <h3>Post Visibility</h3>
                    <p>Set default visibility for your posts</p>
                  </div>
                  <select 
                    className="settings-select"
                    value={privacySettings.postVisibility}
                    onChange={(e) => handlePrivacyChange('postVisibility', e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="privacy-option">
                  <div className="privacy-info">
                    <h3>Who can message me</h3>
                    <p>Control who can send you messages</p>
                  </div>
                  <select 
                    className="settings-select"
                    value={privacySettings.messageVisibility}
                    onChange={(e) => handlePrivacyChange('messageVisibility', e.target.value)}
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <button className="btn-save">
                  Save Privacy Settings
                </button>
              </div>

              {/* Blocked Users */}
              <div className="blocked-users-section">
                <h3>Blocked Users</h3>
                {blockedUsers.length === 0 ? (
                  <p>No blocked users</p>
                ) : (
                  <div className="blocked-users-list">
                    {blockedUsers.map((user) => (
                      <div key={user.id} className="blocked-user-item">
                        <img src={user.avatar} alt={user.name} className="blocked-user-avatar" />
                        <div className="blocked-user-info">
                          <h4>{user.name}</h4>
                          <p>{user.email}</p>
                        </div>
                        <button 
                          className="btn-unblock"
                          onClick={() => handleUnblockUser(user.id)}
                        >
                          Unblock
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <div className="settings-form">
                <div className="notification-option">
                  <div className="notification-info">
                    <h3>Email Notifications</h3>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-option">
                  <div className="notification-info">
                    <h3>Push Notifications</h3>
                    <p>Receive push notifications in browser</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.pushNotifications}
                      onChange={() => handleNotificationChange('pushNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-option">
                  <div className="notification-info">
                    <h3>Friend Requests</h3>
                    <p>Get notified when someone sends you a friend request</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.friendRequests}
                      onChange={() => handleNotificationChange('friendRequests')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-option">
                  <div className="notification-info">
                    <h3>Messages</h3>
                    <p>Get notified when you receive new messages</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.messages}
                      onChange={() => handleNotificationChange('messages')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-option">
                  <div className="notification-info">
                    <h3>Comments</h3>
                    <p>Get notified when someone comments on your posts</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.comments}
                      onChange={() => handleNotificationChange('comments')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-option">
                  <div className="notification-info">
                    <h3>Likes</h3>
                    <p>Get notified when someone likes your posts</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.likes}
                      onChange={() => handleNotificationChange('likes')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <button className="btn-save">
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* Customization Settings */}
          {activeTab === 'customization' && (
            <div className="settings-section">
              <h2>Basic Customization</h2>
              <div className="settings-form">
                <div className="customization-option">
                  <div className="customization-info">
                    <h3>Dark Mode</h3>
                    <p>Switch between dark and light themes</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={customizationSettings.darkMode}
                      onChange={() => handleCustomizationChange('darkMode', !customizationSettings.darkMode)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="customization-option">
                  <div className="customization-info">
                    <h3>Language</h3>
                    <p>Choose your preferred language</p>
                  </div>
                  <select 
                    className="settings-select"
                    value={customizationSettings.language}
                    onChange={(e) => handleCustomizationChange('language', e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="bangla">বাংলা (Bangla)</option>
                  </select>
                </div>

                <button className="btn-save">
                  Save Customization Settings
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              
              <div className="security-options">
                <div className="security-option">
                  <div className="security-info">
                    <h3>Logout from all devices</h3>
                    <p>Sign out from all devices and sessions</p>
                  </div>
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Logout All
                  </button>
                </div>

                <div className="security-option">
                  <div className="security-info">
                    <h3>Recent Logins</h3>
                    <p>View your recent login activity</p>
                  </div>
                  <button className="btn-secondary">
                    View Logins
                  </button>
                </div>
              </div>

              {recentLogins.length > 0 && (
                <div className="recent-logins-section">
                  <h3>Recent Login Activity</h3>
                  <div className="logins-list">
                    {recentLogins.map((login) => (
                      <div key={login.id} className="login-item">
                        <div className="login-info">
                          <h4>{login.device}</h4>
                          <p>{login.location} • {login.time}</p>
                        </div>
                        <span className={`login-status ${login.status}`}>
                          {login.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help & Feedback */}
          {activeTab === 'help' && (
            <div className="settings-section">
              <h2>Help & Feedback</h2>
              
              <div className="help-options">
                <div className="help-option">
                  <div className="help-info">
                    <h3>Report a Problem</h3>
                    <p>Report bugs or technical issues</p>
                  </div>
                  <button 
                    className="btn-secondary"
                    onClick={handleReportProblem}
                  >
                    Report
                  </button>
                </div>

                <div className="help-option">
                  <div className="help-info">
                    <h3>Send Feedback</h3>
                    <p>Share your suggestions and feedback</p>
                  </div>
                  <button 
                    className="btn-secondary"
                    onClick={handleSendFeedback}
                  >
                    Send Feedback
                  </button>
                </div>

                <div className="help-option">
                  <div className="help-info">
                    <h3>App Version</h3>
                    <p>Current version information</p>
                  </div>
                  <span className="version-info">v1.0.0</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content danger-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Account</h2>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <p>All your data, posts, and connections will be permanently deleted.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout All Devices Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Logout from All Devices</h2>
              <button 
                className="modal-close"
                onClick={() => setShowLogoutModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>This will sign you out from all devices and sessions.</p>
              <p>You'll need to log in again on any device you want to use.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-secondary"
                onClick={handleLogoutAllDevices}
              >
                Logout All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

