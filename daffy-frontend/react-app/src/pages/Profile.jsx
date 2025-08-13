import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'Rokibul Islam',
    lastName: user?.lastName || 'Hamim',
    headline: 'Java backend developer | Bug Hunter | Programmer | Video editor',
    location: 'Gazipur, Dhaka, Bangladesh',
    email: 'hamim.pentester@gmail.com',
    about: '',
    experience: [],
    education: [],
    skills: [],
    contactInfo: {
      phone: '',
      website: '',
      linkedin: '',
      github: ''
    }
  });

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showError('Background image size should be less than 10MB');
        return;
      }
      setSelectedBackground(file);
      showSuccess('Background updated successfully!');
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showError('Profile picture size should be less than 5MB');
        return;
      }
      setSelectedAvatar(file);
      showSuccess('Profile picture updated successfully!');
    }
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Replace with actual API call
      // await axios.put('/api/user/profile', profileData);
      showSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      showError('Failed to update profile');
    }
  };

  const handleAddFriend = () => {
    showSuccess('Friend request sent successfully!');
  };

  return (
    <div className="profile-container">
      {/* Background Cover */}
      <div className="profile-cover">
        <div className="cover-image">
          {selectedBackground ? (
            <img 
              src={URL.createObjectURL(selectedBackground)} 
              alt="Cover" 
              className="cover-img"
            />
          ) : (
            <div className="default-cover">
              {/* Matrix-style background with binary code and geometric patterns */}
              <div className="matrix-bg">
                <div className="binary-code">01010101 10101010</div>
                <div className="geometric-patterns">
                  <div className="circuit-lines"></div>
                  <div className="network-dots"></div>
                </div>
                <div className="circuit-border"></div>
              </div>
            </div>
          )}
          
          {/* Cover Info */}
          <div className="cover-info">
            <div className="cover-title">JR. PENTESTER</div>
            <div className="cover-handle">
              <i className="fas fa-fox"></i>
              XSecHamim
            </div>
            <div className="cover-email">
              <i className="fas fa-envelope"></i>
              {profileData.email}
            </div>
          </div>

          {/* Edit Background Button */}
          <div className="profile-cover">
            <div className="cover-image">
              {selectedBackground ? (
                <img 
                  src={URL.createObjectURL(selectedBackground)} 
                  alt="Cover" 
                  className="cover-img"
                />
              ) : (
                <div className="default-cover">
                  {/* Matrix-style background with binary code and geometric patterns */}
                  <div className="matrix-bg">
                    <div className="binary-code">01010101 10101010</div>
                    <div className="geometric-patterns">
                      <div className="circuit-lines"></div>
                      <div className="network-dots"></div>
                    </div>
                    <div className="circuit-border"></div>
                  </div>
                </div>
              )}
              
              {/* Cover Options */}
              <div className="cover-options">
                <label className="cover-option-btn">
                  <i className="fas fa-camera"></i>
                  <span>Change Cover</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBackgroundUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <button 
                  className="cover-option-btn"
                  onClick={() => {
                    setSelectedBackground(null);
                    showSuccess('Cover photo removed successfully!');
                  }}
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete Cover</span>
                </button>
              </div>
              
              {/* Remove the old edit button */}
              {/* <label className="edit-cover-btn"> ... </label> */}
            </div>
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {selectedAvatar ? (
              <img 
                src={URL.createObjectURL(selectedAvatar)} 
                alt="Profile" 
                className="avatar-img"
              />
            ) : (
              <div className="default-avatar">
                <div className="arabic-text">قُلْ هُوَ اللَّهُ أَحَدٌ</div>
                <div className="hand-icon">☝️</div>
                <div className="arabic-text-bottom">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
              </div>
            )}
          </div>
          
          {/* Edit Avatar Button */}
          <label className="edit-avatar-btn">
            <i className="fas fa-camera"></i>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-main-info">
          <div className="profile-name-section">
            <h1 className="profile-name">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <div className="verification-badge">
              <i className="fas fa-shield-check"></i>
              <span>Add verification badge</span>
            </div>
          </div>
          
          <div className="profile-headline">{profileData.headline}</div>
          <div className="profile-location">
            {profileData.location}
            <span className="contact-link">Contact info</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-add-friend" onClick={handleAddFriend}>
            <i className="fas fa-user-plus"></i>
            Add Friend
          </button>
          <button className="btn-message">
            <i className="fas fa-envelope"></i>
            Message
          </button>
          <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
            <i className="fas fa-pencil-alt"></i>
            Edit Profile
          </button>
        </div>

        {/* DIU Logo */}
        <div className="diu-logo">
          <div className="diu-shield">
            <div className="diu-top">
              <i className="fas fa-university"></i>
            </div>
            <div className="diu-bottom">DIU</div>
          </div>
          <div className="diu-text">Daffodil International University-DIU</div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content-grid">
        {/* Left Column */}
        <div className="profile-left-column">
          {/* About Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>About</h3>
              <button className="edit-section-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div className="section-content">
              {profileData.about ? (
                <p>{profileData.about}</p>
              ) : (
                <div className="no-content">
                  <p>No information to show</p>
                  <button className="add-section-btn">
                    <i className="fas fa-plus"></i>
                    Add about
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Experience Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Experience</h3>
              <button className="edit-section-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div className="section-content">
              {profileData.experience.length > 0 ? (
                profileData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h4>{exp.title}</h4>
                    <p>{exp.company}</p>
                    <span>{exp.duration}</span>
                  </div>
                ))
              ) : (
                <div className="no-content">
                  <p>No experience to show</p>
                  <button className="add-section-btn">
                    <i className="fas fa-plus"></i>
                    Add experience
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Education</h3>
              <button className="edit-section-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div className="section-content">
              {profileData.education.length > 0 ? (
                profileData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4>{edu.degree}</h4>
                    <p>{edu.school}</p>
                    <span>{edu.year}</span>
                  </div>
                ))
              ) : (
                <div className="no-content">
                  <p>No education to show</p>
                  <button className="add-section-btn">
                    <i className="fas fa-plus"></i>
                    Add education
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Skills</h3>
              <button className="edit-section-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div className="section-content">
              {profileData.skills.length > 0 ? (
                <div className="skills-list">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              ) : (
                <div className="no-content">
                  <p>No skills to show</p>
                  <button className="add-section-btn">
                    <i className="fas fa-plus"></i>
                    Add skills
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right-column">
          {/* Featured Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Featured</h3>
              <button className="edit-section-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div className="section-content">
              <div className="no-content">
                <p>No featured content to show</p>
                <button className="add-section-btn">
                  <i className="fas fa-plus"></i>
                  Add featured
                </button>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Activity</h3>
            </div>
            <div className="section-content">
              <div className="upload-area">
                <div className="upload-placeholder">
                  <i className="fas fa-image"></i>
                  <p>Share a photo or video</p>
                </div>
                <div className="post-input-area">
                  <textarea 
                    placeholder="What's on your mind?" 
                    className="post-input"
                  />
                  <button className="post-btn">
                    <i className="fas fa-paper-plane"></i>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Recommendations</h3>
              <button className="edit-section-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
            <div className="section-content">
              <div className="no-content">
                <p>No recommendations to show</p>
                <button className="add-section-btn">
                  <i className="fas fa-plus"></i>
                  Ask for recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="edit-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Edit Profile</h2>
              <button 
                className="modal-close"
                onClick={() => setIsEditing(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="edit-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Headline</label>
                <input
                  type="text"
                  value={profileData.headline}
                  onChange={(e) => setProfileData({...profileData, headline: e.target.value})}
                  className="edit-input"
                />
              </div>
              
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="edit-input"
                />
              </div>
              
              <div className="form-group">
                <label>About</label>
                <textarea
                  value={profileData.about}
                  onChange={(e) => setProfileData({...profileData, about: e.target.value})}
                  className="edit-bio"
                  rows="4"
                />
              </div>
              
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

