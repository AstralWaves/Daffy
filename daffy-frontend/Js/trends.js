// Trends JavaScript - Dark Theme with Yellow Accents

// Trends data (will be loaded from backend)
let trendsData = {
  posts: [],
  topics: [],
  currentFilter: 'all',
  currentPage: 1,
  isLoading: false,
  hasMore: true
};

// DOM Elements
const trendsContainer = document.getElementById('trendsContainer');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const trendsPosts = document.getElementById('trendsPosts');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const retryBtn = document.getElementById('retryBtn');
const searchInput = document.querySelector('.search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const topicsList = document.getElementById('topicsList');

// Sample data for demonstration
const samplePosts = [
  {
    id: 1,
    author: {
      name: "John Developer",
      avatar: "https://via.placeholder.com/40x40"
    },
    content: "Just finished building an amazing AI-powered web application! The possibilities are endless with modern technology. #AI #WebDevelopment #Innovation",
    hashtags: ["#AI", "#WebDevelopment", "#Innovation"],
    image: "https://via.placeholder.com/600x300",
    stats: {
      likes: 1200,
      comments: 234,
      shares: 89
    },
    timestamp: "2 hours ago",
    category: "tech"
  },
  {
    id: 2,
    author: {
      name: "Tech Enthusiast",
      avatar: "https://via.placeholder.com/40x40"
    },
    content: "The future of online learning is here! Interactive courses, AI tutors, and personalized learning paths are revolutionizing education. #OnlineLearning #Education #FutureOfLearning",
    hashtags: ["#OnlineLearning", "#Education", "#FutureOfLearning"],
    stats: {
      likes: 856,
      comments: 156,
      shares: 67
    },
    timestamp: "4 hours ago",
    category: "education"
  },
  {
    id: 3,
    author: {
      name: "Sports Fan",
      avatar: "https://via.placeholder.com/40x40"
    },
    content: "What an incredible match! The World Cup 2024 is heating up with some amazing performances. Can't wait for the next games! #WorldCup2024 #Football #Sports",
    hashtags: ["#WorldCup2024", "#Football", "#Sports"],
    image: "https://via.placeholder.com/600x300",
    stats: {
      likes: 2100,
      comments: 445,
      shares: 123
    },
    timestamp: "6 hours ago",
    category: "sports"
  },
  {
    id: 4,
    author: {
      name: "Movie Critic",
      avatar: "https://via.placeholder.com/40x40"
    },
    content: "Just watched the latest blockbuster and it exceeded all expectations! The special effects and storytelling were phenomenal. #NewMovies #Cinema #Entertainment",
    hashtags: ["#NewMovies", "#Cinema", "#Entertainment"],
    stats: {
      likes: 1567,
      comments: 289,
      shares: 98
    },
    timestamp: "8 hours ago",
    category: "entertainment"
  }
];

const sampleTopics = [
  { name: "#AI", posts: 32100, number: 1 },
  { name: "#WebDevelopment", posts: 25400, number: 2 },
  { name: "#WorldCup2024", posts: 18700, number: 3 },
  { name: "#OnlineLearning", posts: 15800, number: 4 },
  { name: "#NewMovies", posts: 12300, number: 5 }
];

// Initialize trends page
function initTrends() {
  loadTrendsData();
  setupEventListeners();
  setupSearch();
  setupFilters();
  setupTopics();
}

// Load trends data
async function loadTrendsData() {
  try {
    showLoading();
    
    try {
      // Use the API service to load trends
      const data = await window.apiService.getTrends();
      if (data && data.posts && data.topics) {
        trendsData.posts = data.posts;
        trendsData.topics = data.topics;
      } else {
        // Fallback to sample data if API doesn't return expected format
        console.log('API returned unexpected data format, using sample data');
        trendsData.posts = samplePosts;
        trendsData.topics = sampleTopics;
      }
    } catch (error) {
      console.log('Error fetching from API, using sample data:', error);
      // Fallback to sample data
      trendsData.posts = samplePosts;
      trendsData.topics = sampleTopics;
    }
    
    renderPosts();
    renderTopics();
    hideLoading();
    
  } catch (error) {
    console.error('Error loading trends:', error);
    showError();
  }
}

// Show loading state
function showLoading() {
  loadingState.style.display = 'flex';
  errorState.style.display = 'none';
  trendsPosts.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

// Hide loading state
function hideLoading() {
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  trendsPosts.style.display = 'block';
  loadMoreBtn.style.display = 'flex';
}

// Show error state
function showError() {
  loadingState.style.display = 'none';
  errorState.style.display = 'flex';
  trendsPosts.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

// Render posts
function renderPosts() {
  const filteredPosts = filterPosts(trendsData.posts, trendsData.currentFilter);
  
  if (filteredPosts.length === 0) {
    trendsPosts.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <p>No posts found for the selected filter.</p>
      </div>
    `;
    return;
  }
  
  trendsPosts.innerHTML = filteredPosts.map(post => createPostHTML(post)).join('');
}

// Filter posts
function filterPosts(posts, filter) {
  if (filter === 'all') {
    return posts;
  }
  return posts.filter(post => post.category === filter);
}

// Create post HTML
function createPostHTML(post) {
  const imageHTML = post.image ? `
    <div class="post-media">
      <img src="${post.image}" alt="Post Image" class="post-image">
    </div>
  ` : '';
  
  const hashtagsHTML = post.hashtags.map(tag => 
    `<span class="hashtag" onclick="searchHashtag('${tag}')">${tag}</span>`
  ).join('');
  
  return `
    <article class="trend-post" data-post-id="${post.id}">
      <div class="post-header">
        <div class="post-author">
          <img src="${post.author.avatar}" alt="User Avatar" class="author-avatar">
          <div class="author-info">
            <h4 class="author-name">${post.author.name}</h4>
            <span class="post-time">${post.timestamp}</span>
          </div>
        </div>
        <div class="post-actions">
          <button class="action-btn" onclick="showPostActions(${post.id})">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      
      <div class="post-content">
        <p class="post-text">${post.content}</p>
        <div class="post-hashtags">
          ${hashtagsHTML}
        </div>
      </div>
      
      ${imageHTML}
      
      <div class="post-stats">
        <div class="stat-item" onclick="toggleLike(${post.id})">
          <i class="fas fa-heart"></i>
          <span>${formatNumber(post.stats.likes)}</span>
        </div>
        <div class="stat-item" onclick="showComments(${post.id})">
          <i class="fas fa-comment"></i>
          <span>${formatNumber(post.stats.comments)}</span>
        </div>
        <div class="stat-item" onclick="sharePost(${post.id})">
          <i class="fas fa-share"></i>
          <span>${formatNumber(post.stats.shares)}</span>
        </div>
      </div>
    </article>
  `;
}

// Render topics
function renderTopics() {
  topicsList.innerHTML = trendsData.topics.map(topic => `
    <div class="topic-item" onclick="searchHashtag('${topic.name}')">
      <span class="topic-number">${topic.number}</span>
      <div class="topic-info">
        <span class="topic-name">${topic.name}</span>
        <span class="topic-posts">${formatNumber(topic.posts)} posts</span>
      </div>
    </div>
  `).join('');
}

// Setup event listeners
function setupEventListeners() {
  // Load more button
  loadMoreBtn.addEventListener('click', loadMorePosts);
  
  // Retry button
  retryBtn.addEventListener('click', loadTrendsData);
  
  // Post interactions
  document.addEventListener('click', handlePostInteraction);
}

// Setup search functionality
function setupSearch() {
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    
    searchTimeout = setTimeout(() => {
      if (query.length > 2) {
        searchPosts(query);
      } else if (query.length === 0) {
        renderPosts(); // Reset to show all posts
      }
    }, 500);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        searchPosts(query);
      }
    }
  });
}

// Setup filters
function setupFilters() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Apply filter
      trendsData.currentFilter = filter;
      renderPosts();
    });
  });
}

// Setup topics
function setupTopics() {
  // Topics are already clickable from the HTML
}

// Search posts
async function searchPosts(query) {
  try {
    showLoading();
    
    // TODO: Search backend API
    // const response = await fetch(`http://localhost:8080/api/trends/search?q=${encodeURIComponent(query)}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const data = await response.json();
    //   trendsData.posts = data.posts;
    //   renderPosts();
    // } else {
    //   throw new Error('Search failed');
    // }
    
    // For now, filter existing posts
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate search
    
    const filteredPosts = trendsData.posts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    trendsData.posts = filteredPosts;
    renderPosts();
    hideLoading();
    
  } catch (error) {
    console.error('Search error:', error);
    showError();
  }
}

// Search hashtag
function searchHashtag(hashtag) {
  searchInput.value = hashtag;
  searchPosts(hashtag);
}

// Load more posts
async function loadMorePosts() {
  if (trendsData.isLoading || !trendsData.hasMore) return;
  
  try {
    trendsData.isLoading = true;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // TODO: Load more from backend API
    // const response = await fetch(`http://localhost:8080/api/trends?page=${trendsData.currentPage + 1}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const data = await response.json();
    //   trendsData.posts.push(...data.posts);
    //   trendsData.currentPage++;
    //   trendsData.hasMore = data.hasMore;
    //   renderPosts();
    // } else {
    //   throw new Error('Failed to load more posts');
    // }
    
    // For now, simulate loading more
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add more sample posts
    const newPosts = samplePosts.map((post, index) => ({
      ...post,
      id: trendsData.posts.length + index + 1,
      timestamp: `${Math.floor(Math.random() * 24) + 1} hours ago`
    }));
    
    trendsData.posts.push(...newPosts);
    trendsData.currentPage++;
    trendsData.hasMore = trendsData.currentPage < 5; // Limit to 5 pages for demo
    
    renderPosts();
    
  } catch (error) {
    console.error('Error loading more posts:', error);
    showNotification('Failed to load more posts', 'error');
  } finally {
    trendsData.isLoading = false;
    loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Load More Posts';
  }
}

// Handle post interactions
function handlePostInteraction(e) {
  const target = e.target;
  
  // Like button
  if (target.closest('.stat-item') && target.closest('.stat-item').querySelector('.fa-heart')) {
    const postId = target.closest('.trend-post').dataset.postId;
    toggleLike(postId);
  }
  
  // Comment button
  if (target.closest('.stat-item') && target.closest('.stat-item').querySelector('.fa-comment')) {
    const postId = target.closest('.trend-post').dataset.postId;
    showComments(postId);
  }
  
  // Share button
  if (target.closest('.stat-item') && target.closest('.stat-item').querySelector('.fa-share')) {
    const postId = target.closest('.trend-post').dataset.postId;
    sharePost(postId);
  }
}

// Toggle like
function toggleLike(postId) {
  const post = trendsData.posts.find(p => p.id == postId);
  if (post) {
    // TODO: Send to backend
    // await fetch(`http://localhost:8080/api/posts/${postId}/like`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    
    // For now, just update locally
    post.stats.likes += Math.random() > 0.5 ? 1 : -1;
    renderPosts();
    showNotification('Post liked!', 'success');
  }
}

// Show comments
function showComments(postId) {
  // TODO: Implement comments modal
  showNotification('Comments feature coming soon!', 'info');
}

// Share post
function sharePost(postId) {
  const post = trendsData.posts.find(p => p.id == postId);
  if (post) {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(post.content);
      showNotification('Post content copied to clipboard!', 'success');
    }
  }
}

// Show post actions
function showPostActions(postId) {
  // TODO: Implement post actions menu
  showNotification('Post actions coming soon!', 'info');
}

// Format number
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Show notification
function showNotification(message, type = 'success') {
  const colors = {
    success: '#4CAF50',
    error: '#f44336',
    info: '#2196F3',
    warning: '#ff9800'
  };
  
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: bold;
    max-width: 300px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Check if user is authenticated
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn !== 'true' || !currentUser) {
        // Redirect to signin page if not logged in
        window.location.href = 'signin.html';
        return;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  initTrends();
});

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

// Export functions for external use
window.trendsManager = {
  loadTrendsData,
  searchPosts,
  searchHashtag,
  toggleLike,
  showComments,
  sharePost,
  showNotification,
  logout
};
