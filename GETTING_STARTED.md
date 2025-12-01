# 🎯 GETTING STARTED - Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        MuleSoft to Spring Boot Migration Prototype           ║
║                                                               ║
║                    🚀 QUICK START CARD                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

## ⚡ 60-Second Checklist

```
☐ Java 17+ installed?          → java -version
☐ Maven installed?             → mvn -version
☐ Docker installed?            → docker --version
☐ Docker Compose installed?    → docker-compose --version
```

---

## 🚀 3-Step Launch

### 1️⃣ START KAFKA
```powershell
cd scripts
.\start-kafka.ps1
```
⏱️ Wait ~30 seconds for "✅ Kafka is ready!"

### 2️⃣ RUN APPLICATION
```powershell
.\run-demo.ps1
```
⏱️ Wait ~1 minute for build and startup

### 3️⃣ TEST IT
```powershell
.\test-api.ps1
```
⏱️ Instant - See results!

---

## 🎯 What Just Happened?

```
1. Kafka Started     → Message broker ready on port 9092
2. App Built         → Maven compiled your code
3. App Started       → Spring Boot running on port 8080
4. API Tested        → Customer data fetched, transformed, published
```

---

## 🔗 Quick URLs

| Service | URL | What it does |
|---------|-----|--------------|
| **Customer API** | `http://localhost:8080/api/customer/1` | Get customer data |
| **Health Check** | `http://localhost:8080/actuator/health` | Check if app is up |
| **Status** | `http://localhost:8080/api/status` | Service status |

---

## 📋 Quick Commands

### Test Customer Endpoint
```powershell
curl http://localhost:8080/api/customer/1
```

### Check Health
```powershell
curl http://localhost:8080/actuator/health
```

### View Kafka Messages
```powershell
docker exec -it kafka kafka-console-consumer.sh `
  --bootstrap-server localhost:9092 `
  --topic customer-events `
  --from-beginning
```

### Stop Everything
```powershell
# Stop Application: Press Ctrl+C in app window

# Stop Kafka:
cd scripts
.\stop-kafka.ps1
```

---

## 🎓 What to Explore Next?

### 1. View Logs
Look for emoji indicators:
- 🌊 Flow start/end
- 📍 Flow steps
- 🔌 API calls
- 🔄 Transformations
- 📤 Kafka publishing

### 2. Try Different Customer IDs
```powershell
curl http://localhost:8080/api/customer/2
curl http://localhost:8080/api/customer/5
curl http://localhost:8080/api/customer/10
```

### 3. Test Error Handling
```powershell
# Invalid ID
curl http://localhost:8080/api/customer/999
```

### 4. Explore the Code
```
IntegrationController.java   → REST endpoints
IntegrationService.java      → Business logic
ExternalApiClient.java       → HTTP calls
CustomerEventProducer.java   → Kafka publishing
```

---

## 📚 Documentation Quick Links

```
START HERE → README.md                           (Main documentation)
           → QUICKSTART.md                       (Fast setup guide)
           → COPILOT_INTEGRATION_SUMMARY.md      (GitHub Copilot overview)

LEARN      → docs/MIGRATION_GUIDE.md             (MuleSoft → Spring Boot)
           → docs/GITHUB_COPILOT_APPROACH.md     (AI-accelerated migration)
           → DIAGRAMS.md                         (Visual architecture)

DEVELOP    → docs/COPILOT_PROMPTS_LIBRARY.md     (30+ ready-to-use prompts)
           → CONTRIBUTING.md                     (Development workflow)
```

---

## 🐛 Quick Troubleshooting

### Port 8080 in use?
```powershell
netstat -ano | findstr :8080
taskkill /F /PID <PID>
```

### Port 9092 in use?
```powershell
cd scripts
.\stop-kafka.ps1
.\start-kafka.ps1
```

### Build fails?
```powershell
mvn clean install -U
```

### Maven not found?
Install Maven:
```powershell
choco install maven
# OR download from: https://maven.apache.org/download.cgi
```

---

## 🎯 Success Indicators

✅ **Kafka Started**
```
✅ Kafka is ready!
```

✅ **Application Started**
```
Started IntegrationServiceApplication in X.XXX seconds
```

✅ **API Working**
```json
{
  "customerId": 1,
  "fullName": "Emily Johnson",
  "loyaltyScore": "GOLD",
  ...
}
```

---

## 📊 Project at a Glance

```
Technology:     Spring Boot 3.3.5 + Java 17
Integration:    REST API → Transform → Kafka
External API:   https://dummyjson.com/users
Kafka Topic:    customer-events
App Port:       8080
Kafka Port:     9092
```

---

## 🎓 MuleSoft Equivalents

```
MuleSoft Flow       →  @RestController method
HTTP Listener       →  @GetMapping
HTTP Request        →  WebClient.get()
Transform Message   →  Service.transform()
Logger             →  @Slf4j + log.info()
Kafka Publish      →  KafkaTemplate.send()
Error Handler      →  @ControllerAdvice
Retry              →  @Retryable
```

---

## 💡 Pro Tips

1. **Keep terminal windows organized**
   - Window 1: Kafka logs
   - Window 2: Application logs
   - Window 3: Testing commands

2. **Watch the emoji logs**
   - They show the flow progression
   - Easy to debug issues

3. **Use the test script**
   - Tests multiple scenarios
   - Shows expected output

4. **Read the docs**
   - README.md is your starting point
   - docs/MIGRATION_GUIDE.md explains concepts

---

## 🎉 You're Ready!

```
┌─────────────────────────────────────────┐
│  ✅ Kafka Running                        │
│  ✅ Application Running                  │
│  ✅ API Working                          │
│  ✅ Kafka Messages Publishing           │
│                                         │
│     YOU'RE ALL SET! 🚀                  │
└─────────────────────────────────────────┘
```

**Now explore, customize, and build! 💪**

---

## 📞 Need Help?

1. **Quick help**: QUICKSTART.md → Troubleshooting
2. **Build help**: CONTRIBUTING.md → Development Setup
3. **Understanding**: docs/MIGRATION_GUIDE.md
4. **Visual aid**: DIAGRAMS.md

---

**Keep this card handy for quick reference!** 📌
