function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    }
}

function isLoggedIn() {
    return !!localStorage.getItem('authToken');
}