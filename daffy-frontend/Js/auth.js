// Authentication JavaScript - Daffy Platform

// DOM Elements
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const passwordStrength = document.getElementById('password-strength');
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');

// Check if user is already logged in and validate token if available
async function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    const token = window.apiService?.getToken();

    // Only auto-redirect to home from auth pages (signin/signup/index)
    const path = window.location.pathname || '';
    const isAuthPage = !!signinForm || !!signupForm || /(?:^|\/)signin\.html$|(?:^|\/)signup\.html$|(?:^|\/)index\.html$/.test(path);

    if (isLoggedIn === 'true' && currentUser) {
        // If we have a token, validate it with the API
        if (token && window.apiService) {
            try {
                // Verify token validity with the API
                const isValid = await window.apiService.validateToken();
                
                if (!isValid) {
                    // Token is invalid, clear auth data
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    window.apiService.clearToken();
                    
                    // Only redirect if on a protected page
                    if (!isAuthPage) {
                        window.location.href = 'signin.html';
                    }
                    return;
                }
            } catch (error) {
                console.warn('Token validation failed:', error);
                // Continue with local validation as fallback
            }
        }
        
        // Redirect to home if on auth page
        if (isAuthPage) {
            window.location.href = 'home.html';
        }
    } else if (!isAuthPage) {
        // Not logged in and on a protected page, redirect to signin
        window.location.href = 'signin.html';
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Determine strength level
    if (strength <= 2) {
        feedback = 'Weak';
        strengthFill.className = 'strength-fill weak';
    } else if (strength <= 3) {
        feedback = 'Fair';
        strengthFill.className = 'strength-fill fair';
    } else if (strength <= 4) {
        feedback = 'Good';
        strengthFill.className = 'strength-fill good';
    } else {
        feedback = 'Strong';
        strengthFill.className = 'strength-fill strong';
    }
    
    strengthText.textContent = `Password strength: ${feedback}`;
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate username format
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Handle signin form submission
if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validation
        if (!email || !password) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate authentication (replace with actual API call)
        authenticateUser(email, password, rememberMe);
    });
}

// Handle signup form submission
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value.trim();
        const userType = document.getElementById('userType').value;
        const department = document.getElementById('department').value;
        const terms = document.getElementById('terms').checked;
        const newsletter = document.getElementById('newsletter').checked;
        
        // Get conditional fields based on user type
        let semester = '';
        let joiningYear = '';
        let graduationYear = '';
        
        if (userType === 'student') {
            semester = document.getElementById('semester').value;
        } else if (userType === 'teacher') {
            joiningYear = document.getElementById('joiningYear').value;
        } else if (userType === 'alumni') {
            graduationYear = document.getElementById('graduationYear').value;
        }
        
        // Validation
        if (!firstName || !lastName || !email || !username || !password || !confirmPassword || !phone || !userType || !department) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!validateUsername(username)) {
            showNotification('Username must be 3-20 characters and contain only letters, numbers, and underscores', 'error');
            return;
        }
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Validate conditional fields
        if (userType === 'student' && !semester) {
            showNotification('Please select your semester', 'error');
            return;
        }
        
        if (userType === 'teacher' && !joiningYear) {
            showNotification('Please select your joining year', 'error');
            return;
        }
        
        if (userType === 'alumni' && !graduationYear) {
            showNotification('Please select your graduation year', 'error');
            return;
        }
        
        if (!terms) {
            showNotification('You must agree to the Terms of Service and Privacy Policy', 'error');
            return;
        }
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.some(user => 
            user.email === email || user.username === username
        );
        
        if (userExists) {
            showNotification('User with this email or username already exists', 'error');
            return;
        }
        
        // Create new user
        createUser({
            firstName,
            lastName,
            email,
            username,
            password,
            phone,
            userType,
            department,
            semester,
            joiningYear,
            graduationYear,
            newsletter,
            createdAt: new Date().toISOString()
        });
    });
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // User type change handler
    const userTypeSelect = document.getElementById('userType');
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function() {
            handleUserTypeChange(this.value);
        });
    }
}

// Handle user type change to show/hide conditional fields
function handleUserTypeChange(userType) {
    const semesterGroup = document.getElementById('semesterGroup');
    const joiningYearGroup = document.getElementById('joiningYearGroup');
    const graduationYearGroup = document.getElementById('graduationYearGroup');
    
    // Hide all conditional groups
    semesterGroup.style.display = 'none';
    joiningYearGroup.style.display = 'none';
    graduationYearGroup.style.display = 'none';
    
    // Show relevant group based on user type
    if (userType === 'student') {
        semesterGroup.style.display = 'block';
    } else if (userType === 'teacher') {
        joiningYearGroup.style.display = 'block';
        populateYearSelect('joiningYear', 1990, new Date().getFullYear());
    } else if (userType === 'alumni') {
        graduationYearGroup.style.display = 'block';
        populateYearSelect('graduationYear', 1990, new Date().getFullYear());
    }
}

// Populate year select dropdown
function populateYearSelect(selectId, startYear, endYear) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = '<option value="">Select Year</option>';
        for (let year = endYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            select.appendChild(option);
        }
    }
}

// Authenticate user using API service
async function authenticateUser(email, password, rememberMe) {
    // Show loading state
    const submitBtn = signinForm.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    try {
        // Try to authenticate with the API
        const credentials = { email, password };
        const response = await window.apiService.login(credentials);
        
        if (response && response.token) {
            // Store token and user info
            window.apiService.setToken(response.token);
            localStorage.setItem('isLoggedIn', 'true');
            
            // Store user data if available in response
            if (response.user) {
                localStorage.setItem('currentUser', JSON.stringify(response.user));
            } else {
                // Fallback to basic user info if not provided by API
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    // Add minimal required fields
                }));
            }
            
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }
            
            showNotification('Successfully signed in!', 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Authentication error:', error);
        
        // Fallback to local authentication for development
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store user session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id || Date.now(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    phone: user.phone,
                    userType: user.userType,
                    department: user.department,
                    semester: user.semester,
                    joiningYear: user.joiningYear,
                    graduationYear: user.graduationYear
                }));
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                showNotification('Successfully signed in! (local mode)', 'success');
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
                return;
            }
        } catch (localError) {
            console.error('Local authentication fallback error:', localError);
        }
        
        showNotification('Invalid email or password', 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Create new user using API service
async function createUser(userData) {
    // Show loading state
    const submitBtn = signupForm.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    try {
        // Try to register with the API
        const response = await window.apiService.register(userData);
        
        if (response && (response.success || response.token)) {
            showNotification('Account created successfully!', 'success');
            
            // If token is provided, store it
            if (response.token) {
                window.apiService.setToken(response.token);
            }
            
            // Auto sign in
            localStorage.setItem('isLoggedIn', 'true');
            
            // Store user data if available in response
            if (response.user) {
                localStorage.setItem('currentUser', JSON.stringify(response.user));
            } else {
                // Fallback to form data if user not provided by API
                localStorage.setItem('currentUser', JSON.stringify({
                    id: Date.now(),
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    username: userData.username,
                    phone: userData.phone,
                    userType: userData.userType,
                    department: userData.department,
                    semester: userData.semester,
                    joiningYear: userData.joiningYear,
                    graduationYear: userData.graduationYear
                }));
            }
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Registration error:', error);
        
        // Fallback to local registration for development
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Add user ID
            userData.id = Date.now();
            
            // Add to users array
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            
            showNotification('Account created successfully! (local mode)', 'success');
            
            // Auto sign in
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                username: userData.username,
                phone: userData.phone,
                userType: userData.userType,
                department: userData.department,
                semester: userData.semester,
                joiningYear: userData.joiningYear,
                graduationYear: userData.graduationYear
            }));
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
            return;
        } catch (localError) {
            console.error('Local registration fallback error:', localError);
        }
        
        showNotification('Failed to create account. Please try again.', 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check auth status only on auth pages to avoid reload loop on home
    const path = window.location.pathname || '';
    const isAuthPage = !!signinForm || !!signupForm || /(?:^|\/)signin\.html$|(?:^|\/)signup\.html$|(?:^|\/)index\.html$/.test(path);
    if (isAuthPage) {
        checkAuthStatus();
    }
});

// Logout function (to be used in other pages)
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    
    showNotification('Successfully logged out!', 'success');
    
    setTimeout(() => {
        window.location.href = 'signin.html';
    }, 1000);
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Export functions for use in other scripts
window.auth = {
    logout,
    getCurrentUser,
    isLoggedIn,
    showNotification
};