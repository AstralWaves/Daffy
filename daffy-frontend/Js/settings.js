// Settings Page JavaScript - Daffy Platform

// DOM Elements
const settingsNav = document.querySelectorAll('.nav-item');
const settingsSections = document.querySelectorAll('.settings-section');

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    initializeSettingsPage();
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
        // Populate form fields with user data
        populateUserData(userData);
        
        // Load saved settings
        loadSavedSettings();
    }
}

// Populate form fields with user data
function populateUserData(userData) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (nameInput) {
        nameInput.value = `${userData.firstName} ${userData.lastName}`;
    }
    if (emailInput) {
        emailInput.value = userData.email;
    }
    if (phoneInput) {
        phoneInput.value = userData.phone || '';
    }
}

// Load saved settings from localStorage
function loadSavedSettings() {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === savedTheme) {
            option.classList.add('active');
        }
    });
    
    // Load notification settings
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.checked = notificationsEnabled;
    }
    
    // Load privacy settings
    const profileVisibility = localStorage.getItem('profileVisibility') || 'public';
    const profileVisibilitySelect = document.getElementById('profile-visibility');
    if (profileVisibilitySelect) {
        profileVisibilitySelect.value = profileVisibility;
    }
    
    const messagePrivacy = localStorage.getItem('messagePrivacy') || 'everyone';
    const messagePrivacySelect = document.getElementById('message-privacy');
    if (messagePrivacySelect) {
        messagePrivacySelect.value = messagePrivacy;
    }
    
    // Load language preference
    const language = localStorage.getItem('language') || 'en';
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.value = language;
    }
}

// Initialize settings page functionality
function initializeSettingsPage() {
    // Make logo clickable
    makeLogoClickable();
    
    // Setup navigation
    setupNavigation();
    
    // Setup form submissions
    setupFormSubmissions();
    
    // Setup theme options
    setupThemeOptions();
    
    // Setup notification toggles
    setupNotificationToggles();
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

// Setup navigation between settings sections
function setupNavigation() {
    settingsNav.forEach(navItem => {
        navItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            settingsNav.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            settingsSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Setup form submissions
function setupFormSubmissions() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileInfo();
        });
    }
    
    // Change password form
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
            changePassword();
        });
    }
}

// Setup theme options
function setupThemeOptions() {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            setTheme(theme);
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Setup notification toggles
function setupNotificationToggles() {
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', function() {
            localStorage.setItem('notificationsEnabled', this.checked);
            showNotification(`Notifications ${this.checked ? 'enabled' : 'disabled'}`, 'success');
        });
    }
    
    // Setup notification type checkboxes
    const notificationCheckboxes = document.querySelectorAll('#friend-request-notif, #messages-notif, #comments-notif');
    notificationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            showNotification('Notification settings updated', 'success');
        });
    });
}

// Save profile information
function saveProfileInfo() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (nameInput && emailInput) {
        const names = nameInput.value.trim().split(' ');
        const firstName = names[0] || '';
        const lastName = names.slice(1).join(' ') || '';
        
        // Update current user data
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.email = emailInput.value.trim();
        currentUser.phone = phoneInput ? phoneInput.value.trim() : '';
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showNotification('Profile information updated successfully!', 'success');
    }
}

// Change password
function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }
    
    // Simulate password change
    showNotification('Password changed successfully!', 'success');
    
    // Clear form
    document.getElementById('change-password-form').reset();
}

// Upload profile picture
function uploadProfilePicture() {
    const fileInput = document.getElementById('profile-picture');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file first', 'error');
        return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPG, PNG, or GIF)', 'error');
        return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    // Simulate upload
    showNotification('Profile picture uploaded successfully!', 'success');
    
    // Update preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const currentPic = document.getElementById('current-profile-pic');
        if (currentPic) {
            currentPic.src = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

// Block user
function blockUser() {
    const username = document.getElementById('block-user').value.trim();
    
    if (!username) {
        showNotification('Please enter a username to block', 'error');
        return;
    }
    
    showNotification(`User ${username} has been blocked`, 'success');
    document.getElementById('block-user').value = '';
}

// Delete account
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        showNotification('Account deletion initiated...', 'info');
        
        setTimeout(() => {
            // Clear all user data
            localStorage.clear();
            showNotification('Account deleted successfully', 'success');
            
            // Redirect to signin page
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1000);
        }, 2000);
    }
}

// Set theme
function setTheme(theme) {
    localStorage.setItem('theme', theme);
    
    // Apply theme to body
    document.body.className = '';
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    showNotification(`Theme changed to ${theme}`, 'success');
}

// Logout from all devices
function logoutAllDevices() {
    showNotification('Logged out from all devices', 'success');
}

// View recent logins
function viewRecentLogins() {
    const recentLogins = document.getElementById('recent-logins');
    if (recentLogins) {
        recentLogins.innerHTML = `
            <p>Current session - ${new Date().toLocaleString()}</p>
            <p>Mobile device - ${new Date(Date.now() - 86400000).toLocaleString()}</p>
            <p>Desktop - ${new Date(Date.now() - 172800000).toLocaleString()}</p>
        `;
    }
}

// Report problem
function reportProblem() {
    const report = document.getElementById('problem-report').value.trim();
    
    if (!report) {
        showNotification('Please describe the problem', 'error');
        return;
    }
    
    showNotification('Problem report submitted successfully!', 'success');
    document.getElementById('problem-report').value = '';
}

// Send feedback
function sendFeedback() {
    const feedback = document.getElementById('feedback').value.trim();
    
    if (!feedback) {
        showNotification('Please enter your feedback', 'error');
        return;
    }
    
    showNotification('Feedback sent successfully! Thank you!', 'success');
    document.getElementById('feedback').value = '';
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