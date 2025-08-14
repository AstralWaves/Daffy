# 🐤 Daffy Social Network Backend

A comprehensive social media backend system built with Java, Spring Boot, and modern web technologies.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user CRUD operations with profile management
- **Admin Panel**: Beautiful web-based admin interface for system management
- **RESTful API**: Well-structured REST endpoints following best practices
- **Security**: Spring Security with JWT tokens and CORS configuration
- **Database**: JPA/Hibernate with H2 (development) and MySQL (production) support
- **Validation**: Comprehensive input validation and error handling
- **Logging**: Structured logging with configurable levels

## 🛠️ Technology Stack

- **Java 17**
- **Spring Boot 3.1.0**
- **Spring Security**
- **Spring Data JPA**
- **Hibernate**
- **H2 Database** (Development)
- **MySQL** (Production)
- **JWT** (JSON Web Tokens)
- **Lombok**
- **Maven**

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd daffy-backend
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 🔧 Configuration

### Development Configuration

The application uses H2 in-memory database by default for development. Key configuration:

```properties
# Server
server.port=8080
server.servlet.context-path=/api

# Database (H2)
spring.datasource.url=jdbc:h2:mem:daffydb
spring.datasource.username=daffy
spring.datasource.password=daffy123

# JWT
daffy.jwt.secret=your-secret-key
daffy.jwt.expiration=86400000
```

### Production Configuration

For production, uncomment and configure MySQL settings in `application.properties`:

```properties
# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/daffydb
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

## 🔐 Default Admin Account

The system automatically creates a default admin account:

- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@daffy.edu`

⚠️ **Important**: Change these credentials in production!

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

### Users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/{id}/profile` - Get user profile
- `PUT /api/users/{id}/profile` - Update user profile
- `GET /api/users/search` - Search users
- `GET /api/users/active` - Get active users
- `GET /api/users/me` - Get current user

### Admin (Requires ADMIN role)
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users/{id}/suspend` - Suspend user
- `POST /api/admin/users/{id}/activate` - Activate user
- `POST /api/admin/users/{id}/delete` - Delete user
- `GET /api/admin/users/stats` - User statistics
- `GET /api/admin/system/health` - System health check

### Test
- `GET /api/test/health` - Backend health check
- `GET /api/test/info` - Backend information

## 🎛️ Admin Panel

Access the admin panel at: `http://localhost:8080/admin-panel`

Features:
- **Dashboard**: Real-time system statistics
- **User Management**: View, suspend, activate, and delete users
- **System Health**: Monitor system status
- **Responsive Design**: Modern, mobile-friendly interface

## 🗄️ Database Schema

The system includes the following entities:

- **User**: User accounts with profiles and roles
- **Role**: User roles and permissions
- **Post**: Social media posts
- **Comment**: Post comments
- **Like**: Post likes/reactions
- **Club**: Social clubs/groups
- **Hashtag**: Post hashtags
- **Notification**: User notifications

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permission levels
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized exception handling

## 📁 Project Structure

```
src/main/java/com/daffy/
├── config/           # Configuration classes
├── controller/       # REST controllers
├── dto/             # Data Transfer Objects
├── entity/          # JPA entities
├── exception/       # Custom exceptions
├── repository/      # Data access layer
├── security/        # Security configuration
├── service/         # Business logic
└── DaffyBackendApplication.java
```

## 🧪 Testing

### Run Tests

```bash
mvn test
```

### Test Endpoints

1. **Health Check**: `GET http://localhost:8080/api/test/health`
2. **Backend Info**: `GET http://localhost:8080/api/test/info`

## 🚀 Deployment

### JAR Deployment

```bash
mvn clean package
java -jar target/daffy-backend-1.0.0.jar
```

### Docker Deployment

```bash
# Build Docker image
docker build -t daffy-backend .

# Run container
docker run -p 8080:8080 daffy-backend
```

## 🔧 Development

### Adding New Features

1. Create entity classes in `entity/` package
2. Create repository interfaces in `repository/` package
3. Create service classes in `service/` package
4. Create DTOs in `dto/` package
5. Create controllers in `controller/` package
6. Add proper validation and error handling

### Code Style

- Follow Java naming conventions
- Use Lombok annotations for boilerplate code
- Implement proper exception handling
- Add comprehensive logging
- Include input validation

## 📊 Monitoring

### Logs

Application logs are written to `logs/daffy.log` with configurable levels.

### Health Checks

- **Actuator Endpoints**: `/actuator/health`, `/actuator/info`
- **Custom Health**: `/api/admin/system/health`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

### Version 1.0.0
- Initial release
- Basic user management
- Admin panel
- JWT authentication
- RESTful API

---

**Happy Coding! 🐤✨**
