# 🚀 Quick Start Guide - MuleSoft to Spring Boot Migration

This guide will get you up and running with the integration service in **under 5 minutes**.

---

## 📋 Prerequisites

Ensure you have the following installed:
- ☕ **Java 17+** (JDK)
- 🔧 **Maven 3.8+**
- 🐳 **Docker & Docker Compose**
- 💻 **PowerShell** (for Windows users)

Check your installations:
```powershell
java -version
mvn -version
docker --version
docker-compose --version
```

---

## 🎯 3-Step Launch

### Step 1: Start Kafka
```powershell
cd scripts
.\start-kafka.ps1
```

Wait until you see:
```
✅ Kafka is ready!
```

### Step 2: Build & Run the Application
```powershell
.\run-demo.ps1
```

This will:
1. Clean and build the project
2. Run tests
3. Start the Spring Boot application on port 8080

### Step 3: Test the API
Open a new PowerShell window:
```powershell
cd scripts
.\test-api.ps1
```

---

## 🧪 Manual Testing

### Test Customer Retrieval
```powershell
# Get customer with ID 1
curl http://localhost:8080/api/customer/1

# Get customer with ID 5
curl http://localhost:8080/api/customer/5
```

### Check Health Status
```powershell
curl http://localhost:8080/api/status
```

### View Actuator Health
```powershell
curl http://localhost:8080/actuator/health
```

---

## 📊 View Kafka Messages

### Option 1: Use Docker Exec
```powershell
docker exec -it kafka kafka-console-consumer.sh `
  --bootstrap-server localhost:9092 `
  --topic customer-events `
  --from-beginning
```

### Option 2: Use Kafka UI (Optional)
Access Kafka UI at: http://localhost:8080/actuator/kafka

---

## 🔍 Application Flow

When you hit `/api/customer/{id}`, the following happens:

1. **🌊 Flow Starts** - Controller receives request
2. **📍 Step 1** - External API called via WebClient
3. **🔄 Step 2** - Data transformed (DataWeave equivalent)
4. **📤 Step 3** - Message published to Kafka topic
5. **✅ Response** - Transformed customer data returned

---

## 📝 View Logs

### Application Logs
The application logs show emoji-based flow visualization:
```
🌊 [MuleSoft Flow START] Processing customer ID: 1
📍 [MuleSoft Flow - Step 1] Calling external API...
🔌 [MuleSoft Connector] Fetching customer from: https://dummyjson.com/users/1
📍 [MuleSoft Flow - Step 2] Transforming customer data...
🔄 [MuleSoft Transformer] Mapped: Terrill Hills → loyaltyScore=GOLD
📍 [MuleSoft Flow - Step 3] Publishing to Kafka topic...
📤 [MuleSoft Publisher] Event sent to topic customer-events
✅ [MuleSoft Flow END] Successfully processed customer: Terrill Hills
```

---

## 🛑 Shutdown

### Stop Application
Press `Ctrl+C` in the application terminal

### Stop Kafka
```powershell
cd scripts
.\stop-kafka.ps1
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 or 9092 is already in use:

**For Application (8080):**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

**For Kafka (9092):**
```powershell
.\stop-kafka.ps1
.\start-kafka.ps1
```

### Kafka Not Ready
If Kafka fails to start:
```powershell
# Remove old volumes
docker-compose down -v

# Restart Kafka
.\start-kafka.ps1
```

### Build Failures
```powershell
# Clean Maven cache
mvn clean

# Build with dependency update
mvn clean install -U
```

### Connection Timeout
If external API times out:
- Check internet connection
- The external API (dummyjson.com) might be down
- Retry after a few seconds

---

## 📚 Next Steps

1. ✅ **Read the Migration Guide** - `docs/MIGRATION_GUIDE.md`
2. ✅ **Explore the Code** - Start with `IntegrationController.java`
3. ✅ **Review Tests** - Check `IntegrationServiceTest.java`
4. ✅ **Customize** - Modify transformation logic in `IntegrationService.java`
5. ✅ **Extend** - Add your own endpoints and Kafka topics

---

## 🎓 Understanding the Migration

| MuleSoft Component | Spring Boot Equivalent | File Location |
|-------------------|------------------------|---------------|
| Flow | `@RestController` method | `IntegrationController.java` |
| HTTP Listener | `@GetMapping` | `IntegrationController.java` |
| HTTP Request | `WebClient` | `ExternalApiClient.java` |
| Transform Message | Service method | `IntegrationService.java` |
| Logger | `@Slf4j` + `log.info()` | All files |
| Kafka Publish | `KafkaTemplate` | `CustomerEventProducer.java` |
| Error Handler | `@ControllerAdvice` | `GlobalExceptionHandler.java` |
| Retry | `@Retryable` | `ExternalApiClient.java` |

---

## 🔗 Useful URLs

- **Application**: http://localhost:8080
- **API Endpoint**: http://localhost:8080/api/customer/{id}
- **Health Check**: http://localhost:8080/actuator/health
- **Status Check**: http://localhost:8080/api/status

---

## 💡 Tips

1. **Use Test Script**: The `test-api.ps1` script tests multiple scenarios
2. **Watch Logs**: Keep an eye on emoji indicators for flow tracking
3. **Check Kafka**: Messages are visible in Kafka topic `customer-events`
4. **Modify Customer IDs**: Valid IDs are 1-30 from dummyjson.com
5. **Error Testing**: Try invalid IDs (e.g., 999) to see error handling

---

## 📞 Support

For issues or questions:
1. Check `docs/MIGRATION_GUIDE.md` for detailed explanations
2. Review `README.md` for architecture overview
3. Examine test files for usage examples
4. Check application logs for error details

---

**Happy Integrating! 🎉**
