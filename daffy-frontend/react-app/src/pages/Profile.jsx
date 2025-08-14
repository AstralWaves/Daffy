import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
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

  const [tempData, setTempData] = useState({});

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
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
      if (file.size > 5 * 1024 * 1024) {
        showError('Profile picture size should be less than 5MB');
        return;
      }
      setSelectedAvatar(file);
      showSuccess('Profile picture updated successfully!');
    }
  };

  const handleSaveProfile = async () => {
    try {
      showSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      showError('Failed to update profile');
    }
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setTempData(profileData[section] || []);
  };

  const handleSaveSection = (section) => {
    setProfileData({ ...profileData, [section]: tempData });
    setEditingSection(null);
    setTempData({});
    showSuccess(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`);
  };

  const handleAddItem = (section, newItem) => {
    const currentItems = profileData[section] || [];
    setProfileData({ ...profileData, [section]: [...currentItems, newItem] });
    showSuccess(`New ${section.slice(0, -1)} added successfully!`);
  };

  const handleDeleteItem = (section, index) => {
    const currentItems = profileData[section] || [];
    const updatedItems = currentItems.filter((_, i) => i !== index);
    setProfileData({ ...profileData, [section]: updatedItems });
    showSuccess(`${section.slice(0, -1)} deleted successfully!`);
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
            <div className="default-cover" />
          )}

          {/* Combined Cover Options Button */}
          <div className="cover-options">
            <div className="cover-dropdown">
              <button className="cover-option-btn" aria-label="Cover options">
                <i className="fas fa-camera"></i>
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="cover-dropdown-menu">
                <label className="cover-dropdown-item">
                  <i className="fas fa-upload"></i>
                  <span>Change Cover</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBackgroundUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <button 
                  className="cover-dropdown-item"
                  onClick={() => {
                    setSelectedBackground(null);
                    showSuccess('Cover photo removed successfully!');
                  }}
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete Cover</span>
                </button>
              </div>
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
            
            {/* Profile Icon Badge */}
            <div className="profile-icon-badge">
              <i className="fas fa-user"></i>
            </div>
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
          </div>
          
          <div className="profile-headline">{profileData.headline}</div>
          <div className="profile-location">
            <i className="fas fa-map-marker-alt"></i>
            {profileData.location}
            <span className="contact-link">Contact info</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
            <i className="fas fa-pencil-alt"></i>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content-grid">
        {/* Left Column - Main Content */}
        <div className="profile-left-column">
          {/* About Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>About</h3>
              <div className="section-actions">
                <button className="header-add-btn" onClick={() => handleEditSection('about')} aria-label="Add About">
                  <i className="fas fa-plus"></i>
                </button>
                <button className="edit-section-btn" onClick={() => handleEditSection('about')} aria-label="Edit About">
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div className="section-content">
              {profileData.about ? (
                <p>{profileData.about}</p>
              ) : (
                <div className="no-content">
                  <p>No information to show</p>
                  <button className="add-section-btn" onClick={() => handleEditSection('about')}>
                    <i className="fas fa-plus"></i>
                    Add about
                  </button>
                </div>
              )}
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

          {/* Experience Section */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Experience</h3>
              <div className="section-actions">
                <button className="header-add-btn" onClick={() => setEditingSection('experience')} aria-label="Add Experience">
                  <i className="fas fa-plus"></i>
                </button>
                <button className="edit-section-btn" onClick={() => setEditingSection('experience')} aria-label="Edit Experience">
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div className="section-content">
              {profileData.experience.length > 0 ? (
                profileData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h4>{exp.title}</h4>
                      <button 
                        className="delete-item-btn"
                        onClick={() => handleDeleteItem('experience', index)}
                        aria-label="Delete Experience"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <p>{exp.company}</p>
                    <span>{exp.duration}</span>
                  </div>
                ))
              ) : (
                <div className="no-content">
                  <p>No experience to show</p>
                  <button className="add-section-btn" onClick={() => handleEditSection('experience')}>
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
              <div className="section-actions">
                <button className="header-add-btn" onClick={() => setEditingSection('education')} aria-label="Add Education">
                  <i className="fas fa-plus"></i>
                </button>
                <button className="edit-section-btn" onClick={() => setEditingSection('education')} aria-label="Edit Education">
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div className="section-content">
              {profileData.education.length > 0 ? (
                profileData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h4>{edu.degree}</h4>
                      <button 
                        className="delete-item-btn"
                        onClick={() => handleDeleteItem('education', index)}
                        aria-label="Delete Education"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <p>{edu.school}</p>
                    <span>{edu.year}</span>
                  </div>
                ))
              ) : (
                <div className="no-content">
                  <p>No education to show</p>
                  <button className="add-section-btn" onClick={() => handleEditSection('education')}>
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
              <div className="section-actions">
                <button className="header-add-btn" onClick={() => setEditingSection('skills')} aria-label="Add Skill">
                  <i className="fas fa-plus"></i>
                </button>
                <button className="edit-section-btn" onClick={() => setEditingSection('skills')} aria-label="Edit Skills">
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
            </div>
            <div className="section-content">
              {profileData.skills.length > 0 ? (
                <div className="skills-list">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button 
                        className="remove-skill-btn"
                        onClick={() => handleDeleteItem('skills', index)}
                        aria-label="Remove Skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="no-content">
                  <p>No skills to show</p>
                  <button className="add-section-btn" onClick={() => handleEditSection('skills')}>
                    <i className="fas fa-plus"></i>
                    Add skills
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar removed per request */}
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

      {/* Section Edit Modals */}
      {editingSection === 'about' && (
        <div className="edit-modal-overlay" onClick={() => setEditingSection(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Edit About</h2>
              <button 
                className="modal-close"
                onClick={() => setEditingSection(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveSection('about'); }}>
              <div className="form-group">
                <label>About</label>
                <textarea
                  value={tempData.about || profileData.about || ''}
                  onChange={(e) => setTempData({...tempData, about: e.target.value})}
                  className="edit-bio"
                  rows="6"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingSection(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingSection === 'experience' && (
        <div className="edit-modal-overlay" onClick={() => setEditingSection(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Add Experience</h2>
              <button 
                className="modal-close"
                onClick={() => setEditingSection(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="edit-form" onSubmit={(e) => { 
              e.preventDefault(); 
              const newExp = {
                title: tempData.title || '',
                company: tempData.company || '',
                duration: tempData.duration || ''
              };
              handleAddItem('experience', newExp);
              setEditingSection(null);
            }}>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={tempData.title || ''}
                  onChange={(e) => setTempData({...tempData, title: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={tempData.company || ''}
                  onChange={(e) => setTempData({...tempData, company: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., Google"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  value={tempData.duration || ''}
                  onChange={(e) => setTempData({...tempData, duration: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., 2020 - Present"
                  required
                />
              </div>
              
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingSection(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Add Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingSection === 'education' && (
        <div className="edit-modal-overlay" onClick={() => setEditingSection(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Add Education</h2>
              <button 
                className="modal-close"
                onClick={() => setEditingSection(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="edit-form" onSubmit={(e) => { 
              e.preventDefault(); 
              const newEdu = {
                degree: tempData.degree || '',
                school: tempData.school || '',
                year: tempData.year || ''
              };
              handleAddItem('education', newEdu);
              setEditingSection(null);
            }}>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={tempData.degree || ''}
                  onChange={(e) => setTempData({...tempData, degree: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., Bachelor of Science"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>School</label>
                <input
                  type="text"
                  value={tempData.school || ''}
                  onChange={(e) => setTempData({...tempData, school: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., University of Technology"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Year</label>
                <input
                  type="text"
                  value={tempData.year || ''}
                  onChange={(e) => setTempData({...tempData, year: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., 2020 - 2024"
                  required
                />
              </div>
              
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingSection(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Add Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingSection === 'skills' && (
        <div className="edit-modal-overlay" onClick={() => setEditingSection(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Add Skills</h2>
              <button 
                className="modal-close"
                onClick={() => setEditingSection(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="edit-form" onSubmit={(e) => { 
              e.preventDefault(); 
              if (tempData.newSkill && tempData.newSkill.trim()) {
                handleAddItem('skills', tempData.newSkill.trim());
                setTempData({...tempData, newSkill: ''});
              }
            }}>
              <div className="form-group">
                <label>Skill</label>
                <input
                  type="text"
                  value={tempData.newSkill || ''}
                  onChange={(e) => setTempData({...tempData, newSkill: e.target.value})}
                  className="edit-input"
                  placeholder="e.g., JavaScript, Python, React"
                  required
                />
              </div>
              
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingSection(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingSection === 'contactInfo' && (
        <div className="edit-modal-overlay" onClick={() => setEditingSection(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Edit Contact Info</h2>
              <button 
                className="modal-close"
                onClick={() => setEditingSection(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="edit-form" onSubmit={(e) => { 
              e.preventDefault(); 
              handleSaveSection('contactInfo');
            }}>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={tempData.phone || profileData.contactInfo.phone || ''}
                  onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                  className="edit-input"
                  placeholder="+1 234 567 8900"
                />
              </div>
              
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={tempData.website || profileData.contactInfo.website || ''}
                  onChange={(e) => setTempData({...tempData, website: e.target.value})}
                  className="edit-input"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  value={tempData.linkedin || profileData.contactInfo.linkedin || ''}
                  onChange={(e) => setTempData({...tempData, linkedin: e.target.value})}
                  className="edit-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  value={tempData.github || profileData.contactInfo.github || ''}
                  onChange={(e) => setTempData({...tempData, github: e.target.value})}
                  className="edit-input"
                  placeholder="https://github.com/username"
                />
              </div>
              
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingSection(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save
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
