# 🚀 DAFFY SOCIAL NETWORK SYSTEM - STARTUP GUIDE

This guide will help you start and run the complete Daffy Social Network system with both frontend and backend components.

## 🎯 System Overview

The Daffy system consists of:
- **Backend**: Spring Boot Java application (Port 8080)
- **Frontend**: React application (Port 3000)
- **Admin Panel**: Web-based admin interface (Port 8080)
- **Database**: H2 in-memory database (Development)

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Java 17** or higher installed
- ✅ **Maven 3.6** or higher installed
- ✅ **Node.js 16** or higher installed
- ✅ **Git** installed
- ✅ All project files downloaded

## 🚀 Quick Start (Windows)

### Option 1: Automated Script (Recommended)

1. **Double-click** the `run-system.bat` file
2. Wait for both systems to start
3. The script will automatically open your browser

### Option 2: Manual Startup

#### Step 1: Start Backend
```bash
cd daffy-backend
mvn spring-boot:run
```

Wait until you see:
```
Started DaffyBackendApplication in X.XXX seconds
```

#### Step 2: Start Frontend
```bash
cd daffy-frontend/react-app
npm start
```

Wait until you see:
```
Local:            http://localhost:3000
```

## 🌐 Access Points

Once both systems are running:

| Component | URL | Description |
|-----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main React application |
| **Backend API** | http://localhost:8080/api | REST API endpoints |
| **Admin Panel** | http://localhost:8080/admin-panel | Admin interface |
| **H2 Database Console** | http://localhost:8080/h2-console | Database management |

## 🔐 Default Accounts

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@daffy.edu`

### Test User Account
You can register new users through the frontend signup form.

## 🧪 Testing the System

### 1. Backend Health Check
```bash
curl http://localhost:8080/api/test/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Daffy Backend is running successfully!",
  "timestamp": 1234567890
}
```

### 2. Frontend Connection
- Open http://localhost:3000
- Try to sign in with admin credentials
- Navigate through different pages

### 3. Admin Panel
- Open http://localhost:8080/admin-panel
- Login with admin credentials
- Check dashboard statistics

## 🔧 Troubleshooting

### Common Issues

#### Backend Won't Start
- **Port 8080 in use**: Change port in `application.properties`
- **Java version**: Ensure Java 17+ is installed
- **Maven issues**: Run `mvn clean install` first

#### Frontend Won't Start
- **Port 3000 in use**: Change port in package.json
- **Node modules**: Run `npm install` first
- **Dependencies**: Check package.json for missing packages

#### Connection Issues
- **CORS errors**: Backend CORS is configured for localhost:3000
- **API calls failing**: Ensure backend is running on port 8080
- **Database errors**: H2 database is in-memory, restarts with backend

### Port Conflicts

If ports are in use, you can change them:

#### Backend Port
Edit `daffy-backend/src/main/resources/application.properties`:
```properties
server.port=8081
```

#### Frontend Port
Edit `daffy-frontend/react-app/package.json`:
```json
"scripts": {
  "start": "set PORT=3001 && react-scripts start"
}
```

## 📊 System Monitoring

### Backend Logs
- Check console output for Spring Boot logs
- Logs are also written to `logs/daffy.log`

### Frontend Logs
- Check browser console (F12)
- Check terminal running npm start

### Database
- H2 console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:daffydb`
- Username: `daffy`
- Password: `daffy123`

## 🛠️ Development Mode

### Backend Development
- Auto-reload enabled with Spring Boot DevTools
- Database resets on each restart
- H2 console available for data inspection

### Frontend Development
- Hot reload enabled
- Source maps for debugging
- Error overlay for runtime errors

## 🔄 Restarting the System

### Full Restart
1. Stop both frontend and backend (Ctrl+C)
2. Wait a few seconds
3. Restart backend first
4. Restart frontend

### Backend Only
- Restart Spring Boot application
- Database will be reinitialized with sample data

### Frontend Only
- Restart React application
- No data loss, just UI refresh

## 📱 Mobile Testing

The system is responsive and works on mobile devices:
- Open http://localhost:3000 on mobile browser
- Use browser dev tools to simulate mobile viewport
- Test admin panel on mobile devices

## 🚀 Production Deployment

For production deployment:

1. **Database**: Switch to MySQL/PostgreSQL
2. **Security**: Change default passwords and JWT secrets
3. **Environment**: Set production profiles
4. **SSL**: Enable HTTPS
5. **Monitoring**: Add application monitoring

## 📞 Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all prerequisites are met
3. Check port availability
4. Review the troubleshooting section
5. Check the backend README.md for detailed information

## 🎉 Success Indicators

Your system is running correctly when:

- ✅ Backend shows "Started DaffyBackendApplication"
- ✅ Frontend shows "Local: http://localhost:3000"
- ✅ http://localhost:8080/api/test/health returns success
- ✅ http://localhost:3000 loads without errors
- ✅ Admin panel login works with admin/admin123

---

**🎯 You're all set! The Daffy Social Network is now running successfully! 🐤✨**
