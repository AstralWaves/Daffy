// Profile Page JavaScript - Daffy Platform

// DOM Elements
const friendsDropdown = document.getElementById('friendsDropdown');
const friendBtn = document.querySelector('.friend-btn');

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    initializeProfilePage();
});

// Check if user is authenticated
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn !== 'true' || !currentUser) {
        // Redirect to signin page if not logged in
        window.location.href = 'signin.html';
        return;
    }
    
    // Load user information
    loadUserInfo();
}

// Load and display user information
function loadUserInfo() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData) {
        // Update profile information
        updateProfileInfo(userData);
        
        // Update profile picture
        updateProfilePicture(userData);
        
        // Load user posts
        loadUserPosts(userData);
    }
}

// Update profile information
function updateProfileInfo(userData) {
    // Update profile header
    const profileName = document.querySelector('.profile-name');
    const profileUsername = document.querySelector('.profile-username');
    const profileEmail = document.querySelector('.profile-email');
    
    if (profileName) {
        profileName.textContent = `${userData.firstName} ${userData.lastName}`;
    }
    if (profileUsername) {
        profileUsername.textContent = `@${userData.username}`;
    }
    if (profileEmail) {
        profileEmail.textContent = userData.email;
    }
    
    // Update profile stats
    updateProfileStats();
}

// Update profile picture
function updateProfilePicture(userData) {
    const profilePics = document.querySelectorAll('.profile-pic, .profile-avatar');
    
    profilePics.forEach(pic => {
        pic.src = `https://via.placeholder.com/${pic.width}x${pic.height}/FFD700/000000?text=${userData.firstName.charAt(0)}`;
    });
}

// Update profile statistics
function updateProfileStats() {
    // Simulate loading profile stats
    const stats = {
        posts: Math.floor(Math.random() * 50) + 10,
        followers: Math.floor(Math.random() * 200) + 50,
        following: Math.floor(Math.random() * 100) + 20
    };
    
    const statsElements = document.querySelectorAll('.stat-number');
    if (statsElements.length >= 3) {
        statsElements[0].textContent = stats.posts;
        statsElements[1].textContent = stats.followers;
        statsElements[2].textContent = stats.following;
    }
}

// Load user posts
function loadUserPosts(userData) {
    const postsContainer = document.querySelector('.posts-container');
    
    if (postsContainer) {
        // Simulate user posts
        const samplePosts = [
            {
                text: "Just finished an amazing project! Can't wait to share more details.",
                image: "https://via.placeholder.com/600x400",
                time: "2 hours ago",
                likes: 15,
                comments: 8
            },
            {
                text: "Beautiful sunset today! Nature never fails to amaze me. 🌅",
                time: "1 day ago",
                likes: 23,
                comments: 12
            },
            {
                text: "Working on some exciting new features for our platform!",
                time: "3 days ago",
                likes: 31,
                comments: 15
            }
        ];
        
        postsContainer.innerHTML = '';
        
        samplePosts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="https://via.placeholder.com/40x40/FFD700/000000?text=U" alt="User" class="post-user-avatar">
            <div class="post-user-info">
                <h4 class="post-user-name">${getCurrentUser().firstName} ${getCurrentUser().lastName}</h4>
                <span class="post-time">${post.time}</span>
            </div>
            <button class="post-menu-btn">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
        <div class="post-content">
            <p class="post-text">${post.text}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ''}
        </div>
        <div class="post-actions">
            <button class="post-action">
                <i class="fas fa-heart"></i>
                <span>${post.likes}</span>
            </button>
            <button class="post-action">
                <i class="fas fa-comment"></i>
                <span>${post.comments}</span>
            </button>
            <button class="post-action">
                <i class="fas fa-share"></i>
                <span>Share</span>
            </button>
        </div>
    `;
    
    return postDiv;
}

// Initialize profile page functionality
function initializeProfilePage() {
    // Make logo clickable
    makeLogoClickable();
    
    // Setup friends dropdown
    setupFriendsList();
    
    // Setup profile customization
    setupProfileCustomization();
}

// Make Daffy logo clickable to go to home
function makeLogoClickable() {
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        brandName.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }
}

// Setup friends list functionality
function setupFriendsList() {
    if (friendBtn && friendsDropdown) {
        friendBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            friendsDropdown.classList.toggle('show');
            friendBtn.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!friendBtn.contains(event.target) && !friendsDropdown.contains(event.target)) {
                friendsDropdown.classList.remove('show');
                friendBtn.classList.remove('active');
            }
        });
        
        // Setup friend action buttons
        setupFriendsList();
    }
}

// Setup friends list interactions
function setupFriendsList() {
    const friendActionBtns = document.querySelectorAll('.friend-action-btn');
    const friendItems = document.querySelectorAll('.friend-item');
    const viewAllFriends = document.querySelector('.view-all-friends');
    
    friendActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const friendName = this.closest('.friend-item').querySelector('.friend-name').textContent;
            handleFriendAction('message', friendName);
        });
    });
    
    friendItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.friend-action-btn')) {
                const friendName = this.querySelector('.friend-name').textContent;
                handleFriendAction('view', friendName);
            }
        });
    });
    
    if (viewAllFriends) {
        viewAllFriends.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('View all friends feature coming soon!', 'info');
        });
    }
}

// Handle friend actions
function handleFriendAction(action, friendName) {
    if (action === 'message') {
        showNotification(`Opening chat with ${friendName}...`, 'info');
    } else if (action === 'view') {
        showNotification(`Viewing ${friendName}'s profile...`, 'info');
    }
}

// Setup profile customization
function setupProfileCustomization() {
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const uploadPhotoBtn = document.querySelector('.upload-photo-btn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showNotification('Edit profile feature coming soon!', 'info');
        });
    }
    
    if (uploadPhotoBtn) {
        uploadPhotoBtn.addEventListener('click', function() {
            showNotification('Upload photo feature coming soon!', 'info');
        });
    }
}

// Toggle friends list
function toggleFriendsList() {
    if (friendsDropdown && friendBtn) {
        friendsDropdown.classList.toggle('show');
        friendBtn.classList.toggle('active');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
        padding: 16px 24px;
        border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
    // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
        notification.style.transform = 'translateX(0)';
  }, 100);
  
    // Remove after 3 seconds
  setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Logout function
function logout() {
    // Clear user session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    
    showNotification('Successfully logged out!', 'success');
    
    // Redirect to signin page
    setTimeout(() => {
        window.location.href = 'signin.html';
    }, 1000);
}