# ⚙️ Build & Setup Instructions

## Option 1: Build with Maven (Recommended)

### Install Maven
If Maven is not installed:

**Windows (via Chocolatey):**
```powershell
choco install maven
```

**Windows (Manual):**
1. Download from: https://maven.apache.org/download.cgi
2. Extract to `C:\Program Files\Apache\maven`
3. Add to PATH: `C:\Program Files\Apache\maven\bin`
4. Verify: `mvn --version`

### Build Commands
```powershell
# Navigate to project root
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot

# Clean and compile
mvn clean compile

# Run tests
mvn test

# Package application
mvn clean package

# Run application
mvn spring-boot:run
```

---

## Option 2: Build with Docker

If you have Docker installed but not Maven:

```powershell
# Build Docker image (includes Maven build)
docker build -t integration-service .

# Run with Docker Compose
docker-compose up
```

---

## Option 3: Use IDE

### IntelliJ IDEA
1. Open project folder
2. Wait for Maven import
3. Right-click `IntegrationServiceApplication.java`
4. Select "Run"

### VS Code
1. Install Java Extension Pack
2. Open project folder
3. Press `F5` or click Run
4. Select "Spring Boot App"

### Eclipse
1. Import as "Existing Maven Project"
2. Wait for dependencies download
3. Right-click project → Run As → Spring Boot App

---

## 🔍 Verify Installation

### Check Java
```powershell
java -version
# Should show: Java 17 or higher
```

### Check Maven
```powershell
mvn --version
# Should show: Maven 3.8 or higher
```

### Check Docker
```powershell
docker --version
docker-compose --version
```

---

## 🎯 Quick Build Test

```powershell
# Test if project compiles
mvn clean compile

# Expected output:
# [INFO] BUILD SUCCESS
```

---

## 📦 Dependencies Download

First build will download dependencies (~200MB):
- Spring Boot 3.3.5
- Spring WebFlux
- Spring Kafka
- Lombok
- JUnit 5

This is normal and happens once.

---

## 🐛 Common Issues

### Issue: "mvn: command not found"
**Solution**: Install Maven or use Docker option

### Issue: "Java version mismatch"
**Solution**: 
```powershell
# Check Java version
java -version

# If < Java 17, download from:
# https://adoptium.net/
```

### Issue: "Port 8080 already in use"
**Solution**:
```powershell
# Find process
netstat -ano | findstr :8080

# Kill process
taskkill /F /PID <PID>
```

### Issue: "Dependencies download failed"
**Solution**:
```powershell
# Clear Maven cache
rmdir -r -Force $HOME\.m2\repository

# Retry build
mvn clean install -U
```

---

## 📚 Build Outputs

### Target Directory Structure
After successful build:
```
target/
├── classes/                          # Compiled .class files
├── integration-service-1.0.0.jar     # Executable JAR
└── integration-service-1.0.0.jar.original
```

### Running the JAR
```powershell
java -jar target/integration-service-1.0.0.jar
```

---

## 🚀 CI/CD Ready

The project includes:
- ✅ Maven build configuration
- ✅ Dockerfile for containerization
- ✅ docker-compose.yml for local testing
- ✅ Unit tests with JUnit 5
- ✅ Integration tests ready

Perfect for:
- Jenkins
- GitHub Actions
- GitLab CI
- Azure DevOps
- AWS CodePipeline

---

## 📊 Project Metrics

After build:
- **Compile time**: ~30 seconds (first time: ~2 minutes)
- **JAR size**: ~50MB
- **Test execution**: ~5 seconds
- **Startup time**: ~8 seconds

---

## 🔗 Next Steps

1. ✅ Complete build successfully
2. ✅ Run tests: `mvn test`
3. ✅ Start Kafka: `.\scripts\start-kafka.ps1`
4. ✅ Run application: `mvn spring-boot:run`
5. ✅ Test API: `.\scripts\test-api.ps1`

---

For detailed usage, see **QUICKSTART.md**
