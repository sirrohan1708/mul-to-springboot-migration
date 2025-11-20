# 🚀 MuleSoft to Spring Boot Migration Prototype

A comprehensive Spring Boot 3.3+ microservice demonstrating how to replace MuleSoft integration flows with modern, cloud-native Spring Boot architecture.

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [MuleSoft to Spring Boot Mapping](#mulesoft-to-spring-boot-mapping)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)

## 🎯 Overview

This project demonstrates a complete migration from MuleSoft integration patterns to Spring Boot, implementing:

- ✅ REST API exposure (MuleSoft HTTP Listener)
- ✅ External API integration (MuleSoft HTTP Connector)
- ✅ Data transformation (MuleSoft DataWeave)
- ✅ Kafka messaging (MuleSoft VM/JMS)
- ✅ Error handling & retry (MuleSoft Error Handlers)
- ✅ Logging & observability (MuleSoft Logger)
- ✅ Health checks (MuleSoft Monitoring)

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ HTTP GET /api/customer/{id}
       ▼
┌─────────────────────────────────┐
│  IntegrationController          │  ← MuleSoft HTTP Listener
│  @GetMapping("/api/customer")   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  IntegrationService             │  ← MuleSoft Flow
│  - processCustomer()            │
│  - transformCustomerData()      │  ← MuleSoft DataWeave
└────────┬────────────────────────┘
         │
         ├──────────────┬─────────────┐
         ▼              ▼             ▼
┌─────────────┐  ┌──────────────┐  ┌─────────────────┐
│ External    │  │ Transform    │  │ Kafka           │
│ API Client  │  │ Logic        │  │ Producer        │
│ (WebClient) │  │ (Java)       │  │ (KafkaTemplate) │
└─────────────┘  └──────────────┘  └─────────────────┘
      │                                     │
      │                                     ▼
      ▼                            ┌─────────────────┐
┌─────────────┐                   │ Kafka Broker    │
│ External    │                   │ Topic:          │
│ REST API    │                   │ customer-events │
└─────────────┘                   └─────────────────┘
```

## 🔄 MuleSoft to Spring Boot Mapping

| MuleSoft Component | Spring Boot Equivalent | Implementation |
|-------------------|------------------------|----------------|
| **MuleSoft Flow** | `@Service` class | `IntegrationService.processCustomer()` |
| **HTTP Listener** | `@RestController` | `IntegrationController` |
| **HTTP Request Connector** | `WebClient` | `ExternalApiClient` |
| **DataWeave Transformation** | Java methods | `transformCustomerData()` |
| **VM Publish / JMS Send** | `KafkaTemplate` | `CustomerEventProducer` |
| **Logger Component** | `Slf4j` logging | `log.info()` throughout |
| **Error Handler** | `@RestControllerAdvice` | `GlobalExceptionHandler` |
| **On-Error-Continue** | `@ExceptionHandler` | Exception handling methods |
| **Retry Policy** | `@Retryable` | `@Retryable` on methods |
| **Connector Config** | `@Configuration` | `KafkaConfig`, `WebClientConfig` |
| **Variables** | Method variables | Local variables in methods |
| **Monitoring** | Spring Actuator | `/actuator/health` endpoint |

## 📦 Prerequisites

- **Java 17+**
- **Maven 3.6+**
- **Docker** (for Kafka)
- **Docker Compose**

## 🚀 Quick Start

### 1. Start Kafka using Docker Compose

```powershell
docker-compose up -d kafka zookeeper kafka-ui
```

This starts:
- Kafka broker on `localhost:9092`
- Zookeeper on `localhost:2181`
- Kafka UI on `http://localhost:8090`

### 2. Build the Application

```powershell
mvn clean install
```

### 3. Run the Application

```powershell
mvn spring-boot:run
```

Or run with Java:

```powershell
java -jar target/integration-service-1.0.0.jar
```

The application will start on `http://localhost:8080`

### 4. Test the API

```powershell
# Get customer by ID
curl http://localhost:8080/api/customer/1

# Check service status
curl http://localhost:8080/api/status

# Check health
curl http://localhost:8080/actuator/health

# Get API info
curl http://localhost:8080/api/info
```

## 📁 Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/integrationservice/
│   │       ├── IntegrationServiceApplication.java  # Main entry point
│   │       ├── controller/
│   │       │   └── IntegrationController.java      # REST endpoints (HTTP Listener)
│   │       ├── service/
│   │       │   └── IntegrationService.java         # Business logic (Flow)
│   │       ├── client/
│   │       │   └── ExternalApiClient.java          # API client (HTTP Connector)
│   │       ├── producer/
│   │       │   └── CustomerEventProducer.java      # Kafka producer (VM Publish)
│   │       ├── config/
│   │       │   ├── KafkaConfig.java                # Kafka configuration
│   │       │   └── WebClientConfig.java            # WebClient configuration
│   │       ├── model/
│   │       │   ├── Customer.java                   # Input model
│   │       │   └── CustomerResponse.java           # Output model
│   │       └── exception/
│   │           └── GlobalExceptionHandler.java     # Error handlers
│   └── resources/
│       └── application.yml                          # Application configuration
└── test/
    └── java/
        └── com/example/integrationservice/
            └── service/
                └── IntegrationServiceTest.java      # Unit tests
```

## 🌐 API Endpoints

### Get Customer by ID
```http
GET /api/customer/{id}
```

**Response:**
```json
{
  "customerId": 1,
  "fullName": "Emily Johnson",
  "email": "emily.johnson@example.com",
  "phoneNumber": "+1-555-0100",
  "customer_age": 28,
  "location": "Phoenix, Arizona",
  "companyName": "Dooley, Kozey and Cronin",
  "jobTitle": "Sales Manager",
  "loyaltyScore": "Silver",
  "processedAt": "2025-11-11T10:30:00",
  "status": "SUCCESS"
}
```

### Service Status
```http
GET /api/status
```

### Health Check
```http
GET /actuator/health
```

### API Information
```http
GET /api/info
```

## 🧪 Testing

### Run Unit Tests
```powershell
mvn test
```

### Run Integration Tests
```powershell
mvn verify
```

### Test Coverage
```powershell
mvn clean test jacoco:report
```

## 🐳 Docker Deployment

### Option 1: Run Full Stack with Docker Compose

```powershell
docker-compose up --build
```

This starts:
- Zookeeper
- Kafka
- Kafka UI
- Integration Service

### Option 2: Build and Run Manually

```powershell
# Build Docker image
docker build -t integration-service:latest .

# Run container
docker run -p 8080:8080 `
  -e SPRING_KAFKA_BOOTSTRAP_SERVERS=host.docker.internal:9092 `
  integration-service:latest
```

## 📊 Monitoring Kafka Messages

Access Kafka UI at `http://localhost:8090` to:
- View topics
- Monitor messages in `customer-events` topic
- Check consumer groups
- Inspect message payloads

## 🔍 Logging

The application uses structured logging similar to MuleSoft's visual flow trace:

```
🌊 [MuleSoft Flow START] Processing customer ID: 1
📍 [MuleSoft Flow - Step 1] Calling external API...
🔌 [MuleSoft Connector] Fetching customer data for ID: 1
✅ [MuleSoft Connector] Successfully fetched customer: Emily Johnson
📍 [MuleSoft Flow - Step 2] Transforming customer data...
🔄 [MuleSoft Transformer] Applying DataWeave transformation...
🔄 [MuleSoft Transformer] Transformation complete: Emily Johnson → loyalty score: Silver
📍 [MuleSoft Flow - Step 3] Publishing to Kafka topic...
📤 [MuleSoft VM Publish] Publishing event for customer ID: 1
✅ [MuleSoft VM Publish] Successfully published event
✅ [MuleSoft Logger] Successfully processed customer: Emily Johnson
🌊 [MuleSoft Flow END] Completed processing for customer ID: 1
```

## 🔧 Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
external:
  api:
    base-url: https://dummyjson.com/users/
server:
  port: 8080
```

## 🎯 Key Features Demonstrated

### 1. **Async External API Calls**
- WebClient for non-blocking REST calls
- Timeout configuration
- Error handling

### 2. **Data Transformation**
- Field mapping and renaming
- Computed fields (loyalty score)
- Null safety

### 3. **Kafka Integration**
- Asynchronous message publishing
- Partitioning by customer ID
- JSON serialization

### 4. **Error Handling**
- Retry logic with exponential backoff
- Circuit breaker pattern ready
- Comprehensive error responses

### 5. **Observability**
- Structured logging
- Health checks
- Actuator endpoints

## 📈 Performance Considerations

- **Reactive Programming**: WebFlux for non-blocking I/O
- **Connection Pooling**: WebClient reuses connections
- **Async Messaging**: Kafka for decoupled communication
- **Retry Mechanism**: Resilient to transient failures

## 🚀 Next Steps for Production

1. **Add Circuit Breaker**: Use Resilience4j
2. **Add Metrics**: Integrate Micrometer/Prometheus
3. **Add Tracing**: OpenTelemetry or Zipkin
4. **Add Security**: OAuth2/JWT authentication
5. **Add Caching**: Redis for frequently accessed data
6. **Add API Gateway**: Spring Cloud Gateway
7. **Add Service Discovery**: Eureka or Consul

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Kafka](https://spring.io/projects/spring-kafka)
- [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html)
- [MuleSoft Migration Guide](https://docs.mulesoft.com/)

## 📝 License

This is a prototype for demonstration purposes.

---

**Built with ❤️ using Spring Boot 3.3.5**
