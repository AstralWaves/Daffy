// Signup form functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');
    const inputs = signupForm.querySelectorAll('input, select');
    
    // Add form validation
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Form is valid, you can submit to server here
            console.log('Signup form submitted successfully!');
            alert('Account created successfully! Redirecting to sign in...');
            
            // Simulate redirect to signin page
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1000);
        }
    });
    
    // Add real-time validation feedback
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Clear previous errors
        clearError(field);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showError(field, `${getFieldLabel(fieldName)} is required`);
            return false;
        }
        
        // Specific validations
        switch (fieldName) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'password':
                if (value && value.length < 6) {
                    showError(field, 'Password must be at least 6 characters');
                    return false;
                }
                break;
                
            case 'username':
                if (value && value.length < 3) {
                    showError(field, 'Username must be at least 3 characters');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    function showError(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.background = 'rgba(239, 68, 68, 0.1)';
        
        // Create error message element if it doesn't exist
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ef4444';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '4px';
            errorElement.style.display = 'block';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function clearError(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.background = 'rgba(255, 255, 255, 0.05)';
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function getFieldLabel(fieldName) {
        const labels = {
            'full-name': 'Full Name',
            'username': 'Username',
            'email': 'Email',
            'password': 'Password',
            'user-type': 'User Type',
            'department': 'Department',
            'semester': 'Semester'
        };
        
        return labels[fieldName] || fieldName;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
