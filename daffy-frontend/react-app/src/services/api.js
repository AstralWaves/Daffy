// API service for connecting to Daffy Backend
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('authToken');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // Clear authentication token
    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // Get headers with authentication
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (response.status === 401) {
                // Token expired or invalid
                this.clearToken();
                window.location.href = '/signin';
                return null;
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication endpoints
    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async refreshToken(refreshToken) {
        return this.request('/auth/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
        });
    }

    // User endpoints
    async getCurrentUser() {
        return this.request('/users/me');
    }

    async getUserById(id) {
        return this.request(`/users/${id}`);
    }

    async getUserProfile(id) {
        return this.request(`/users/${id}/profile`);
    }

    async updateUserProfile(id, profileData) {
        return this.request(`/users/${id}/profile`, {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    async searchUsers(keyword, page = 0, size = 10) {
        return this.request(`/users/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
    }

    async getActiveUsers(page = 0, size = 10) {
        return this.request(`/users/active?page=${page}&size=${size}`);
    }

    // Admin endpoints (requires admin role)
    async getAdminDashboard() {
        return this.request('/admin/dashboard');
    }

    async getAllUsers(page = 0, size = 20) {
        return this.request(`/admin/users?page=${page}&size=${size}`);
    }

    async suspendUser(userId) {
        return this.request(`/admin/users/${userId}/suspend`, {
            method: 'POST',
        });
    }

    async activateUser(userId) {
        return this.request(`/admin/users/${userId}/activate`, {
            method: 'POST',
        });
    }

    async deleteUser(userId) {
        return this.request(`/admin/users/${userId}/delete`, {
            method: 'POST',
        });
    }

    async getUserStats() {
        return this.request('/admin/users/stats');
    }

    async getSystemHealth() {
        return this.request('/admin/system/health');
    }

    // Test endpoints
    async getHealth() {
        return this.request('/test/health');
    }

    async getInfo() {
        return this.request('/test/info');
    }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
