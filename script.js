<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const loadingSpinner = document.querySelector('.loading-spinner');
  const submitButton = document.querySelector('.btn-primary');
  const submitText = submitButton.querySelector('span');

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }

  function setLoading(isLoading) {
    loadingSpinner.style.display = isLoading ? 'block' : 'none';
    submitText.style.opacity = isLoading ? '0' : '1';
    submitButton.disabled = isLoading;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.includes('@diu.edu') && !emailRegex.test(email)) {
      showError('Please enter a valid DIU email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (email === 'test@diu.edu' && password === 'password123') {
        // Success
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'home.html';
      } else {
        showError('Invalid email or password');
      }
    } catch (error) {
      showError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  // Check if user is already logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'home.html';
  }
=======
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const loadingSpinner = document.querySelector('.loading-spinner');
  const submitButton = document.querySelector('.btn-primary');
  const submitText = submitButton.querySelector('span');

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }

  function setLoading(isLoading) {
    loadingSpinner.style.display = isLoading ? 'block' : 'none';
    submitText.style.opacity = isLoading ? '0' : '1';
    submitButton.disabled = isLoading;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.includes('@diu.edu') && !emailRegex.test(email)) {
      showError('Please enter a valid DIU email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (email === 'test@diu.edu' && password === 'password123') {
        // Success
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'home.html';
      } else {
        showError('Invalid email or password');
      }
    } catch (error) {
      showError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  // Check if user is already logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'home.html';
  }
>>>>>>> c387e841511f6a3a5c4b54e6051c8e91e8e26d18
}); 