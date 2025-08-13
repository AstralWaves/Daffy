# Daffy Social Media Platform - React Frontend

A modern, responsive React-based frontend for the Daffy social media platform, built with React 18, React Router, and styled with CSS custom properties.

## 🚀 Features

### Authentication System
- **User Registration**: Complete signup form with validation
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Persistent Sessions**: Remember user login state

### User Interface
- **Modern Design**: Dark theme with yellow accent colors
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Real-time Notifications**: Toast notifications for user feedback
- **Smooth Animations**: CSS transitions and hover effects

### Social Features
- **Post Creation**: Create and share posts with text content
- **Stories Section**: Instagram-style stories interface
- **News Feed**: Display posts from users
- **User Profiles**: View and manage user information
- **Department Updates**: University-specific content

### Navigation
- **Top Navigation**: Search, notifications, and user menu
- **Sidebar Navigation**: Quick access to main sections
- **Breadcrumb Navigation**: Clear page hierarchy

## 🛠️ Technology Stack

- **React 18**: Latest React with hooks and functional components
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API communication
- **Font Awesome**: Icon library
- **CSS Custom Properties**: Theme variables for consistent styling

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Left sidebar navigation
│   ├── SignIn.jsx      # Login form
│   ├── SignUp.jsx      # Registration form
│   └── Notification.jsx # Toast notifications
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── NotificationContext.jsx # Notification system
├── pages/              # Main page components
│   ├── Home.jsx        # Main feed page
│   ├── Trends.jsx      # Trending content
│   ├── Clubs.jsx       # University clubs
│   ├── Profile.jsx     # User profile
│   └── Settings.jsx    # User settings
├── styles/             # CSS stylesheets
│   ├── App.css         # Main app styles
│   ├── auth.css        # Authentication pages
│   ├── home.css        # Home page styles
│   ├── header.css      # Header component styles
│   ├── sidebar.css     # Sidebar styles
│   └── notification.css # Notification styles
└── App.jsx             # Main app component
```

## 🎨 Design System

### Color Palette
- **Primary**: #FFD700 (Yellow)
- **Background**: #000000 (Black)
- **Secondary Background**: #1a1a1a (Dark Gray)
- **Text Primary**: #ffffff (White)
- **Text Secondary**: #cccccc (Light Gray)
- **Border**: #333333 (Medium Gray)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: 12px, 14px, 16px, 18px, 24px, 28px, 32px
- **Line Height**: 1.6

### Spacing
- **Container Padding**: 20px
- **Component Gap**: 8px, 12px, 16px, 20px, 24px
- **Border Radius**: 4px, 8px, 12px, 20px

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔐 Authentication Flow

1. **Registration**: Users fill out comprehensive signup form
2. **Email Verification**: Backend sends verification email
3. **Login**: Users authenticate with email/password
4. **JWT Token**: Secure token-based authentication
5. **Protected Routes**: Automatic redirection for security

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1200px (Full layout with right sidebar)
- **Tablet**: 768px - 1200px (Hidden right sidebar)
- **Mobile**: < 768px (Collapsible left sidebar)

### Mobile Features
- Touch-friendly interface
- Swipe gestures for navigation
- Optimized touch targets
- Mobile-first responsive design

## 🎯 Key Components

### AuthContext
Manages global authentication state:
- User login/logout
- Token management
- Protected route access
- Session persistence

### NotificationContext
Handles user feedback:
- Success messages
- Error notifications
- Warning alerts
- Info messages

### Header Component
Top navigation with:
- Brand logo
- Search functionality
- Theme toggle
- User dropdown menu
- Notification bell

### Sidebar Component
Left navigation with:
- Home, Trends, Clubs, Settings
- Active state indicators
- Responsive collapse

## 🔄 State Management

- **React Context**: Global state for auth and notifications
- **Local State**: Component-specific state with useState
- **Local Storage**: Persistent user data and preferences
- **Session Management**: Automatic token refresh

## 🎨 Styling Approach

- **CSS Custom Properties**: Theme variables for consistency
- **Component-Specific CSS**: Modular styling approach
- **Responsive Design**: Mobile-first methodology
- **Dark Theme**: Primary design with light theme support
- **Smooth Animations**: CSS transitions and transforms

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Memoization**: React.memo for expensive components
- **CSS Containment**: Layout and paint optimizations
- **Image Optimization**: Placeholder images with lazy loading
- **Bundle Optimization**: Tree shaking and minification

## 🔧 Development Guidelines

### Code Style
- Functional components with hooks
- Consistent naming conventions
- Proper error handling
- Comprehensive comments

### Component Structure
- Single responsibility principle
- Reusable and composable design
- Props validation
- Clean separation of concerns

### State Management
- Context for global state
- Local state for component-specific data
- Proper state updates
- Avoid prop drilling

## 📋 Future Enhancements

- [ ] Real-time messaging
- [ ] Video/audio posts
- [ ] Advanced search filters
- [ ] User blocking/reporting
- [ ] Push notifications
- [ ] Offline support
- [ ] Progressive Web App features
- [ ] Accessibility improvements
- [ ] Internationalization
- [ ] Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the Daffy Social Media Platform**
