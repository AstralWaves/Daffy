// Home Page JavaScript - Daffy Platform

// DOM Elements
const userAvatar = document.getElementById('userAvatar');
const userAvatarSmall = document.getElementById('userAvatarSmall');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userDropdown = document.getElementById('userDropdown');
const postInput = document.getElementById('postInput');
const storyItems = document.querySelectorAll('.story-item');

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing transition classes first
    const container = document.querySelector('.container');
    if (container) {
        container.classList.remove('page-exit', 'page-enter', 'transitioning');
        
        // Add page-transition class using requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.classList.add('page-transition');
            });
        });
    }
    
    checkAuthStatus();
    initializeHomePage();
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
        // Update user avatars
        if (userAvatar) {
            userAvatar.src = `https://via.placeholder.com/32x32/FFD700/000000?text=${userData.firstName.charAt(0)}`;
        }
        if (userAvatarSmall) {
            userAvatarSmall.src = `https://via.placeholder.com/40x40/FFD700/000000?text=${userData.firstName.charAt(0)}`;
        }
        
        // Update user info in dropdown
        if (userName) {
            userName.textContent = `${userData.firstName} ${userData.lastName}`;
        }
        if (userEmail) {
            userEmail.textContent = userData.email;
        }
    }
}

// Initialize home page functionality
function initializeHomePage() {
    // Make logo clickable
    makeLogoClickable();
    
    // Setup user dropdown
    setupUserDropdown();
    
    // Setup story interactions
    setupStoryInteractions();
    
    // Setup post creation
    setupPostCreation();
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

// Setup user dropdown functionality
function setupUserDropdown() {
    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', function() {
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userAvatar.contains(event.target) && !userDropdown.contains(event.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
}

// Setup story interactions
function setupStoryInteractions() {
    storyItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (index === 0) {
                // "Your Story" - create new story
                createStory();
            } else {
                // Other stories - view story
                openStory(index);
            }
        });
    });
}

// Setup post creation functionality
function setupPostCreation() {
    if (postInput) {
        // Auto-resize textarea
        postInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        // Handle Enter key
        postInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                createPost();
            }
        });
    }
}

// Create a new story
function createStory() {
    showNotification('Story creation feature coming soon!', 'info');
    
    // Simulate story creation
    setTimeout(() => {
        showNotification('Story created successfully!', 'success');
    }, 1000);
}

// Open a story
function openStory(storyIndex) {
    const storyNames = ['Your Story', 'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown'];
    const storyName = storyNames[storyIndex] || 'Unknown User';
    
    showNotification(`Opening ${storyName}'s story...`, 'info');
    
    // Simulate story viewing
    setTimeout(() => {
        showNotification(`Viewed ${storyName}'s story`, 'success');
    }, 3000);
}

// Create a new post
function createPost() {
    const postText = postInput ? postInput.value.trim() : '';
    
    if (!postText) {
        showNotification('Please write something to post', 'error');
        return;
    }
    
    // Show loading state
    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        const originalText = postBtn.innerHTML;
        postBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
        postBtn.disabled = true;
        
        // Simulate post creation
        setTimeout(() => {
            showNotification('Post created successfully!', 'success');
            
            // Reset form
            if (postInput) {
                postInput.value = '';
                postInput.style.height = 'auto';
            }
            
            // Reset button
            postBtn.innerHTML = originalText;
            postBtn.disabled = false;
        }, 1500);
    }
}

// Open post modal for different types
function openPostModal(type) {
    const typeNames = {
        'photo': 'Photo',
        'video': 'Video',
        'feeling': 'Feeling',
        'share': 'Share'
    };
    
    showNotification(`${typeNames[type]} post feature coming soon!`, 'info');
}

// Toggle theme (dark/light mode)
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.querySelector('.nav-btn i.fa-moon, .nav-btn i.fa-sun');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeBtn.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
        showNotification('Switched to dark theme', 'success');
    } else {
        body.classList.add('light-theme');
        themeBtn.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
        showNotification('Switched to light theme', 'success');
    }
}

// Show notification (improved to prevent shaking)
function showNotification(message, type = 'success') {
    // Remove any existing notifications to prevent stacking
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles with improved positioning to prevent layout shifts
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
        word-wrap: break-word;
        will-change: transform;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Force a reflow to ensure smooth animation
    notification.offsetHeight;
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
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

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.querySelector('.nav-btn i.fa-moon, .nav-btn i.fa-sun');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeBtn) {
            themeBtn.className = 'fas fa-sun';
        }
    }
}

// Initialize theme on page load
loadSavedTheme();
