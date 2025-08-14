@echo off
echo ========================================
echo    DAFFY SOCIAL NETWORK SYSTEM
echo ========================================
echo.
echo Starting both Frontend and Backend...
echo.

echo [1/3] Starting Backend (Spring Boot)...
start "Daffy Backend" cmd /k "cd daffy-backend && mvn spring-boot:run"

echo [2/3] Waiting for backend to start...
timeout /t 15 /nobreak > nul

echo [3/3] Starting Frontend (React)...
start "Daffy Frontend" cmd /k "cd daffy-frontend/react-app && npm start"

echo.
echo ========================================
echo    SYSTEM STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:8080/admin-panel
echo.
echo Default Admin Login:
echo Username: admin
echo Password: admin123
echo.
echo Press any key to open the applications...
pause > nul

echo Opening applications in browser...
start http://localhost:3000
start http://localhost:8080/admin-panel

echo.
echo System is running! Keep these command windows open.
echo To stop the system, close the command windows.
echo.
pause
