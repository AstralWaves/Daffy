// Clubs JavaScript - Dark Theme with Yellow Accents

// Clubs data (will be loaded from backend)
let clubsData = {
  posts: [],
  myClubs: [],
  popularClubs: [],
  currentFilter: 'all',
  currentPage: 1,
  isLoading: false,
  hasMore: true
};

// DOM Elements
const clubsContainer = document.getElementById('clubsContainer');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const clubPosts = document.getElementById('clubPosts');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const retryBtn = document.getElementById('retryBtn');
const searchInput = document.querySelector('.search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const myClubsList = document.getElementById('myClubsList');
const popularClubsList = document.getElementById('popularClubsList');
const createClubBtn = document.getElementById('createClubBtn');
const createClubModal = document.getElementById('createClubModal');
const closeCreateClubModal = document.getElementById('closeCreateClubModal');
const cancelCreateClub = document.getElementById('cancelCreateClub');
const createClubForm = document.getElementById('createClubForm');

// Sample data for demonstration
const sampleClubPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Developer",
      avatar: "https://via.placeholder.com/40x40"
    },
    club: {
      name: "Tech Innovators Club",
      icon: "📱"
    },
    content: "Just launched our new mobile app! The Tech Innovators Club has been working on this project for months. Check out the amazing features we've implemented! 🚀 #MobileApp #Innovation #TechClub",
    hashtags: ["#MobileApp", "#Innovation", "#TechClub"],
    image: "https://via.placeholder.com/600x300",
    stats: {
      likes: 2100,
      comments: 156,
      shares: 89
    },
    timestamp: "1 hour ago",
    category: "tech"
  },
  {
    id: 2,
    author: {
      name: "Mike Sports",
      avatar: "https://via.placeholder.com/40x40"
    },
    club: {
      name: "Football Fanatics Club",
      icon: "⚽"
    },
    content: "Amazing match today! The Football Fanatics Club organized a fantastic tournament. Great teamwork and sportsmanship from everyone! ⚽ #Football #Tournament #Sportsmanship",
    hashtags: ["#Football", "#Tournament", "#Sportsmanship"],
    stats: {
      likes: 1800,
      comments: 234,
      shares: 67
    },
    timestamp: "3 hours ago",
    category: "sports"
  },
  {
    id: 3,
    author: {
      name: "Emma Music",
      avatar: "https://via.placeholder.com/40x40"
    },
    club: {
      name: "Music Lovers Club",
      icon: "🎵"
    },
    content: "Incredible jam session tonight! The Music Lovers Club had an amazing acoustic night. So much talent in our community! 🎸 #Music #Acoustic #JamSession",
    hashtags: ["#Music", "#Acoustic", "#JamSession"],
    image: "https://via.placeholder.com/600x300",
    stats: {
      likes: 1450,
      comments: 189,
      shares: 45
    },
    timestamp: "5 hours ago",
    category: "music"
  },
  {
    id: 4,
    author: {
      name: "Alex Gamer",
      avatar: "https://via.placeholder.com/40x40"
    },
    club: {
      name: "Gaming Enthusiasts",
      icon: "🎮"
    },
    content: "Epic gaming tournament results are in! The Gaming Enthusiasts Club hosted an amazing competition. Congrats to all participants! 🏆 #Gaming #Tournament #Esports",
    hashtags: ["#Gaming", "#Tournament", "#Esports"],
    stats: {
      likes: 3200,
      comments: 456,
      shares: 123
    },
    timestamp: "7 hours ago",
    category: "gaming"
  }
];

const sampleMyClubs = [
  {
    id: 1,
    name: "Tech Innovators Club",
    icon: "fas fa-laptop-code",
    members: 1200,
    status: "admin"
  },
  {
    id: 2,
    name: "Music Lovers Club",
    icon: "fas fa-music",
    members: 856,
    status: "member"
  },
  {
    id: 3,
    name: "Gaming Enthusiasts",
    icon: "fas fa-gamepad",
    members: 2300,
    status: "member"
  }
];

const samplePopularClubs = [
  {
    id: 1,
    name: "Web Developers Hub",
    icon: "fas fa-code",
    members: 5400
  },
  {
    id: 2,
    name: "Creative Designers",
    icon: "fas fa-palette",
    members: 3800
  },
  {
    id: 3,
    name: "Fitness Warriors",
    icon: "fas fa-dumbbell",
    members: 4200
  },
  {
    id: 4,
    name: "Photography Masters",
    icon: "fas fa-camera",
    members: 2900
  }
];

// Initialize clubs page
function initClubs() {
  loadClubsData();
  setupEventListeners();
  setupSearch();
  setupFilters();
  setupModal();
  setupJoinButtons();
}

// Load clubs data
async function loadClubsData() {
  try {
    showLoading();
    
    // TODO: Load from backend API
    // const response = await fetch('/api/clubs', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const data = await response.json();
    //   clubsData.posts = data.posts;
    //   clubsData.myClubs = data.myClubs;
    //   clubsData.popularClubs = data.popularClubs;
    //   renderPosts();
    //   renderMyClubs();
    //   renderPopularClubs();
    // } else {
    //   throw new Error('Failed to load clubs');
    // }
    
    // For now, use sample data
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
    clubsData.posts = sampleClubPosts;
    clubsData.myClubs = sampleMyClubs;
    clubsData.popularClubs = samplePopularClubs;
    
    renderPosts();
    renderMyClubs();
    renderPopularClubs();
    hideLoading();
    
  } catch (error) {
    console.error('Error loading clubs:', error);
    showError();
  }
}

// Show loading state
function showLoading() {
  loadingState.style.display = 'flex';
  errorState.style.display = 'none';
  clubPosts.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

// Hide loading state
function hideLoading() {
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  clubPosts.style.display = 'block';
  loadMoreBtn.style.display = 'flex';
}

// Show error state
function showError() {
  loadingState.style.display = 'none';
  errorState.style.display = 'flex';
  clubPosts.style.display = 'none';
  loadMoreBtn.style.display = 'none';
}

// Render posts
function renderPosts() {
  const filteredPosts = filterPosts(clubsData.posts, clubsData.currentFilter);
  
  if (filteredPosts.length === 0) {
    clubPosts.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-users"></i>
        <p>No club posts found for the selected filter.</p>
      </div>
    `;
    return;
  }
  
  clubPosts.innerHTML = filteredPosts.map(post => createPostHTML(post)).join('');
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
    <article class="club-post" data-post-id="${post.id}">
      <div class="post-header">
        <div class="post-author">
          <img src="${post.author.avatar}" alt="User Avatar" class="author-avatar">
          <div class="author-info">
            <h4 class="author-name">${post.author.name}</h4>
            <span class="club-name">${post.club.icon} ${post.club.name}</span>
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
        <div class="stat-item">
          <i class="fas fa-users"></i>
          <span>${post.club.name}</span>
        </div>
      </div>
    </article>
  `;
}

// Render my clubs
function renderMyClubs() {
  myClubsList.innerHTML = clubsData.myClubs.map(club => `
    <div class="club-item" onclick="openClub(${club.id})">
      <div class="club-avatar">
        <i class="${club.icon}"></i>
      </div>
      <div class="club-info">
        <h4 class="club-name">${club.name}</h4>
        <span class="club-members">${formatNumber(club.members)} members</span>
      </div>
      <div class="club-status">
        <span class="status-badge ${club.status}">${club.status}</span>
      </div>
    </div>
  `).join('');
}

// Render popular clubs
function renderPopularClubs() {
  popularClubsList.innerHTML = clubsData.popularClubs.map(club => `
    <div class="club-item">
      <div class="club-avatar">
        <i class="${club.icon}"></i>
      </div>
      <div class="club-info">
        <h4 class="club-name">${club.name}</h4>
        <span class="club-members">${formatNumber(club.members)} members</span>
      </div>
      <button class="join-btn" onclick="joinClub(${club.id})">Join</button>
    </div>
  `).join('');
}

// Setup event listeners
function setupEventListeners() {
  // Load more button
  loadMoreBtn.addEventListener('click', loadMorePosts);
  
  // Retry button
  retryBtn.addEventListener('click', loadClubsData);
  
  // Post interactions
  document.addEventListener('click', handlePostInteraction);
  
  // Create club button
  createClubBtn.addEventListener('click', openCreateClubModal);
  
  // Modal close buttons
  closeCreateClubModal.addEventListener('click', closeCreateClubModal);
  cancelCreateClub.addEventListener('click', closeCreateClubModal);
  
  // Form submission
  createClubForm.addEventListener('submit', handleCreateClub);
  
  // Close modal when clicking outside
  createClubModal.addEventListener('click', (e) => {
    if (e.target === createClubModal) closeCreateClubModal();
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (createClubModal.classList.contains('show')) closeCreateClubModal();
    }
  });
}

// Setup search functionality
function setupSearch() {
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    
    searchTimeout = setTimeout(() => {
      if (query.length > 2) {
        searchClubs(query);
      } else if (query.length === 0) {
        renderPosts(); // Reset to show all posts
      }
    }, 500);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        searchClubs(query);
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
      clubsData.currentFilter = filter;
      renderPosts();
    });
  });
}

// Setup modal
function setupModal() {
  // Modal is already set up in setupEventListeners
}

// Setup join buttons
function setupJoinButtons() {
  // Join buttons are set up in renderPopularClubs
}

// Search clubs
async function searchClubs(query) {
  try {
    showLoading();
    
    // TODO: Search backend API
    // const response = await fetch(`/api/clubs/search?q=${encodeURIComponent(query)}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const data = await response.json();
    //   clubsData.posts = data.posts;
    //   renderPosts();
    // } else {
    //   throw new Error('Search failed');
    // }
    
    // For now, filter existing posts
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate search
    
    const filteredPosts = clubsData.posts.filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      post.club.name.toLowerCase().includes(query.toLowerCase())
    );
    
    clubsData.posts = filteredPosts;
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
  searchClubs(hashtag);
}

// Load more posts
async function loadMorePosts() {
  if (clubsData.isLoading || !clubsData.hasMore) return;
  
  try {
    clubsData.isLoading = true;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // TODO: Load more from backend API
    // const response = await fetch(`/api/clubs?page=${clubsData.currentPage + 1}`, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const data = await response.json();
    //   clubsData.posts.push(...data.posts);
    //   clubsData.currentPage++;
    //   clubsData.hasMore = data.hasMore;
    //   renderPosts();
    // } else {
    //   throw new Error('Failed to load more posts');
    // }
    
    // For now, simulate loading more
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add more sample posts
    const newPosts = sampleClubPosts.map((post, index) => ({
      ...post,
      id: clubsData.posts.length + index + 1,
      timestamp: `${Math.floor(Math.random() * 24) + 1} hours ago`
    }));
    
    clubsData.posts.push(...newPosts);
    clubsData.currentPage++;
    clubsData.hasMore = clubsData.currentPage < 5; // Limit to 5 pages for demo
    
    renderPosts();
    
  } catch (error) {
    console.error('Error loading more posts:', error);
    showNotification('Failed to load more posts', 'error');
  } finally {
    clubsData.isLoading = false;
    loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Load More Posts';
  }
}

// Handle post interactions
function handlePostInteraction(e) {
  const target = e.target;
  
  // Like button
  if (target.closest('.stat-item') && target.closest('.stat-item').querySelector('.fa-heart')) {
    const postId = target.closest('.club-post').dataset.postId;
    toggleLike(postId);
  }
  
  // Comment button
  if (target.closest('.stat-item') && target.closest('.stat-item').querySelector('.fa-comment')) {
    const postId = target.closest('.club-post').dataset.postId;
    showComments(postId);
  }
  
  // Share button
  if (target.closest('.stat-item') && target.closest('.stat-item').querySelector('.fa-share')) {
    const postId = target.closest('.club-post').dataset.postId;
    sharePost(postId);
  }
}

// Toggle like
function toggleLike(postId) {
  const post = clubsData.posts.find(p => p.id == postId);
  if (post) {
    // TODO: Send to backend
    // await fetch(`/api/clubs/posts/${postId}/like`, {
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
  const post = clubsData.posts.find(p => p.id == postId);
  if (post) {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.name} in ${post.club.name}`,
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

// Open create club modal
function openCreateClubModal() {
  createClubModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close create club modal
function closeCreateClubModal() {
  createClubModal.classList.remove('show');
  document.body.style.overflow = 'auto';
  createClubForm.reset();
}

// Handle create club form submission
async function handleCreateClub(e) {
  e.preventDefault();
  
  const formData = new FormData(createClubForm);
  const clubData = {
    name: formData.get('clubName'),
    description: formData.get('clubDescription'),
    category: formData.get('clubCategory'),
    privacy: formData.get('clubPrivacy'),
    avatar: formData.get('clubAvatar')
  };
  
  try {
    // TODO: Send to backend API
    // const response = await fetch('/api/clubs', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(clubData)
    // });
    // 
    // if (response.ok) {
    //   const newClub = await response.json();
    //   clubsData.myClubs.unshift(newClub);
    //   renderMyClubs();
    //   closeCreateClubModal();
    //   showNotification('Club created successfully!', 'success');
    // } else {
    //   throw new Error('Failed to create club');
    // }
    
    // For now, just add locally
    const newClub = {
      id: Date.now(),
      name: clubData.name,
      icon: getClubIcon(clubData.category),
      members: 1,
      status: 'admin'
    };
    
    clubsData.myClubs.unshift(newClub);
    renderMyClubs();
    closeCreateClubModal();
    showNotification('Club created successfully!', 'success');
    
  } catch (error) {
    console.error('Error creating club:', error);
    showNotification('Failed to create club', 'error');
  }
}

// Get club icon based on category
function getClubIcon(category) {
  const icons = {
    tech: 'fas fa-laptop-code',
    sports: 'fas fa-futbol',
    music: 'fas fa-music',
    gaming: 'fas fa-gamepad',
    art: 'fas fa-palette',
    fitness: 'fas fa-dumbbell',
    education: 'fas fa-graduation-cap',
    other: 'fas fa-users'
  };
  return icons[category] || 'fas fa-users';
}

// Join club
async function joinClub(clubId) {
  try {
    // TODO: Send to backend API
    // const response = await fetch(`/api/clubs/${clubId}/join`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // 
    // if (response.ok) {
    //   const club = await response.json();
    //   clubsData.myClubs.push(club);
    //   renderMyClubs();
    //   showNotification('Successfully joined the club!', 'success');
    // } else {
    //   throw new Error('Failed to join club');
    // }
    
    // For now, just update locally
    const club = clubsData.popularClubs.find(c => c.id === clubId);
    if (club) {
      const newClub = {
        ...club,
        status: 'member'
      };
      clubsData.myClubs.push(newClub);
      renderMyClubs();
      showNotification('Successfully joined the club!', 'success');
    }
    
  } catch (error) {
    console.error('Error joining club:', error);
    showNotification('Failed to join club', 'error');
  }
}

// Open club
function openClub(clubId) {
  // TODO: Navigate to club page
  showNotification('Club page coming soon!', 'info');
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initClubs();
});

// Export functions for external use
window.clubsManager = {
  loadClubsData,
  searchClubs,
  searchHashtag,
  toggleLike,
  showComments,
  sharePost,
  createClub: handleCreateClub,
  joinClub,
  openClub,
  showNotification
}; 