// Signin form functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.querySelector('.signin-form');
    const inputs = signinForm.querySelectorAll('input[type="email"], input[type="password"]');
    
    // Add form validation
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Form is valid, you can submit to server here
            console.log('Signin form submitted successfully!');
            showLoadingState();
            
            // Simulate login process
            setTimeout(() => {
                hideLoadingState();
                alert('Login successful! Redirecting to dashboard...');
                
                // Simulate redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }, 2000);
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
        const fieldType = field.type;
        
        // Clear previous errors
        clearError(field);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showError(field, `${getFieldLabel(fieldType)} is required`);
            return false;
        }
        
        // Specific validations
        if (fieldType === 'email' && value && !isValidEmail(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (fieldType === 'password' && value && value.length < 6) {
            showError(field, 'Password must be at least 6 characters');
            return false;
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
    
    function getFieldLabel(fieldType) {
        const labels = {
            'email': 'Email',
            'password': 'Password'
        };
        
        return labels[fieldType] || fieldType;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showLoadingState() {
        const submitBtn = document.querySelector('.signin-btn');
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    }
    
    function hideLoadingState() {
        const submitBtn = document.querySelector('.signin-btn');
        submitBtn.textContent = 'Sign In';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});
