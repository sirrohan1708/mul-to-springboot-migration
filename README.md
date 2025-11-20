# 🌐 MuleSoft ➜ Spring Boot Migration & Integration Visualizer

A leadership-ready monorepo showcasing how to modernize MuleSoft-style integration flows using pure open-source Spring Boot + Next.js.

---
## 🧭 Executive Summary
This prototype demonstrates a phased, low-risk migration from MuleSoft proprietary orchestration to a cloud‑native, Java 17 / Spring Boot 3.3.x stack with a companion Next.js dashboard for transparent flow visualization.

Key Outcomes:
- Eliminates license dependency for core integration patterns (HTTP, transformation, messaging, logging)
- Improves observability (structured emoji logs + Actuator + visual dashboard)
- Aligns with enterprise Java skill sets (Spring ecosystem)
- Ready for expansion to resilience, security, and platform ops (Resilience4j, OpenTelemetry, OAuth2)

---
## 🏗️ High-Level Architecture
```
+----------------------+           +---------------------------+
|   Next.js Dashboard  |  HTTP     |  Spring Boot Integration  |
| (integration-visualizer) ------->|  Service (Reactive/Web)   |
|  Port 3000           |           |  Port 8080                |
+----------+-----------+           +-----------+---------------+
           |                                       |
           | (Optional Kafka events)               | KafkaTemplate (async publish)
           |                                       v
           |                               +---------------+
           |                               |   Kafka       |
           |                               | customer-*    |
           |                               +---------------+
           |                                              
           | Fallback / Demo Mode (if backend down)        
           v                                              
   Mock Data / Simulated Logs                              
```

Mermaid (optional for GitHub rich view):
```mermaid
flowchart LR
  A[Client / Dashboard] --> B[/GET /api/customer/{id}/]
  B --> C{IntegrationService (Flow)}
  C --> D[ExternalApiClient (WebClient)]
  C --> E[transformCustomerData()]
  C --> F[CustomerEventProducer (Kafka)]
  F --> K[(Kafka Topic)]
```
---
## 🔄 MuleSoft ➜ Spring Boot Mapping
| MuleSoft | Spring Boot | Location |
|----------|-------------|----------|
| Flow | Service orchestration | `IntegrationService` |
| HTTP Listener | `@RestController` | `IntegrationController` |
| HTTP Connector | `WebClient` | `ExternalApiClient` |
| DataWeave | Java transform method | `transformCustomerData()` |
| VM/JMS Publish | Kafka producer | `CustomerEventProducer` |
| Logger | SLF4J + emoji pattern | throughout code |
| Error Handler | `@RestControllerAdvice` | `GlobalExceptionHandler` |
| Retry Policy | `@Retryable` | methods in client/service |
| Connector Config | `@Configuration` beans | `KafkaConfig`, `WebClientConfig` |
| Monitoring | Actuator endpoints | `/actuator/*` |

Emoji Log Semantics:
- 🌊 Flow boundary start/end
- 📍 Step markers
- 🔌 Connector operations (external call)
- 🔄 Transformation
- 📤 Publish/send
- ✅ Success
- ❌ Error

---
## 📂 Repository Structure
```
/ (root)
├── src/main/java/com/example/integrationservice/
│   ├── IntegrationServiceApplication.java               # Main entry + CORS config
│   ├── controller/IntegrationController.java            # REST endpoints (@RestController)
│   ├── service/IntegrationService.java                  # Flow orchestration
│   ├── mapper/CustomerMapper.java                       # DataWeave → Java transformation
│   ├── client/ExternalApiClient.java                    # WebClient for external APIs
│   ├── producer/CustomerEventProducer.java              # Kafka publisher
│   ├── config/                                          # Kafka, WebClient config
│   ├── model/                                           # Customer, CustomerResponse DTOs
│   └── exception/GlobalExceptionHandler.java            # Centralized error handling
├── src/test/java/...                                    # Unit & integration tests
├── integration-visualizer/                              # Next.js 16 dashboard
│   ├── src/components/                                  # FlowCard, DataTable, LogConsole
│   ├── src/lib/api.ts                                   # API client + mock data
│   └── package.json
├── scripts/
│   ├── setup-git-repo.sh                                # Git repository initialization
│   ├── install-java17-*.ps1                             # Java 17 setup
│   └── test-api.ps1                                     # API testing script
├── docker-compose.yml                                   # Optional Kafka + Zookeeper
├── MIGRATION_ANALYSIS.md                                # Cost-benefit, mapping, AI prompts
├── LEADERSHIP_PRESENTATION.md                           # Executive summary + ROI
├── MIGRATION_GUIDE.md                                   # Step-by-step patterns
└── README.md                                            # This file
```

Recommended Cleanup Before Publishing:
1. Remove nested Git repo (embedded warning):
   ```powershell
   Remove-Item -Recurse -Force .\integration-visualizer\.git
   git add .
   git commit -m "Remove embedded .git from integration-visualizer"
   ```
2. Add root `.editorconfig`, `LICENSE`, `CONTRIBUTING.md` (optional).
3. Unify versions: ensure Next.js README reflects actual version (currently 16+/App Router).
4. Optionally move backend into `/backend/` and dashboard into `/dashboard/` for clarity (update paths in docs).

---
## ✅ Prerequisites
Backend:
- Java 17
- Maven 3.8+
Frontend:
- Node.js 18+
Optional:
- Docker Desktop (Kafka) – not required for demo

---
## 🚀 Quick Start (No Kafka Required)
```powershell
# 1. Build backend
mvn clean install

# 2. Run backend
mvn spring-boot:run
# or
java -jar target/integration-service-1.0.0.jar

# 3. Start dashboard
cd integration-visualizer
npm install
npm run dev
```
Access:
- API: http://localhost:8080/api/customer/1
- Health: http://localhost:8080/actuator/health
- Dashboard: http://localhost:3000

Full Stack with Kafka (optional):
```powershell
docker-compose up -d kafka zookeeper kafka-ui
```
Kafka UI: http://localhost:8090

---
## 🔐 CORS Configuration
Defined in `IntegrationServiceApplication` via a `WebMvcConfigurer` bean allowing `http://localhost:3000`.

---
## 🧪 Testing & Quality
```powershell
# Unit tests
mvn test

# (Add Jacoco if coverage needed)
# mvn clean test jacoco:report
```
Add future pipeline (GitHub Actions) for CI: build → test → security scan (OWASP dep check) → optional Docker build.

---
## 📡 API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/customer/{id}` | Process customer through flow |
| GET | `/api/status` | Simple status payload |
| GET | `/api/info` | Metadata + mapping |
| GET | `/actuator/health` | Health status |

Sample Response (simplified):
```json
{
  "customerId": 1,
  "fullName": "Emily Johnson",
  "loyaltyScore": "Silver",
  "processedAt": "2025-11-20T10:30:00",
  "status": "SUCCESS"
}
```

---
## 🔍 Error & Retry Strategy
- Transient external call failures retried (`@Retryable`).
- Central exception mapping to HTTP responses (`GlobalExceptionHandler`).
- MuleSoft correspondence commented in controller & service for traceability.

---
## 📤 Messaging (Kafka)
- Topic: `customer-events` (configurable once broker available)
- Non-blocking: application operates even if broker unreachable (logs warnings).

---
## 🧪 Dashboard Behavior
Mode | Trigger | Behavior
-----|---------|---------
Live | Backend reachable | Real HTTP calls & real data
Demo | Backend down | Mock data + simulated logs

---
## 📈 Performance & Future Enhancements
Planned upgrades:
1. Resilience4j Circuit Breakers
2. Micrometer + Prometheus / Grafana
3. OpenTelemetry tracing
4. OAuth2/JWT security layer
5. Async streaming (WebSocket/SSE) for live logs
6. Redis caching for frequent customers
7. GitHub Actions CI/CD pipeline

---
## 💼 Leadership Talking Points
- Cost Efficiency: Replace per-user or per-transaction licensing with commodity cloud + open-source.
- Talent Alignment: Leverages existing internal Java/Spring expertise.
- Incremental Migration: Coexistence possible—wrap Mule endpoints, gradually redirect traffic.
- Observability: Visual dashboard accelerates onboarding & decision-making.
- Extensibility: Kafka enables event-driven expansion (analytics, notifications).

---
## 🔒 Security Considerations (Roadmap)
| Area | Planned Control |
|------|-----------------|
| AuthN/AuthZ | Spring Security + OAuth2 Provider |
| Secrets | Externalize via Vault / Azure Key Vault |
| Dependency Risk | OWASP / SCA scanning in CI |
| Transport | Enforce HTTPS + TLS termination |

---
## 🤝 Contributing (Internal Prototype)
1. Fork or branch `main`
2. Create feature branch: `git checkout -b feature/kafka-consumer`
3. Commit with conventional messages: `feat: add consumer for loyalty enrichment`
4. PR requires: tests green + README section updates if new features.

---
## 📜 License
Prototype – add proper LICENSE (e.g., MIT/Apache-2.0) before external publication.

---
## 🗺️ Presentation Flow (Demo Script)
1. Show architecture & mapping table.
2. Run `/api/customer/5` – display dashboard updates.
3. Highlight emoji logs (flow semantics).
4. Show Actuator health & retry behavior (temporarily disable network).
5. Optional: enable Kafka and show published events.
6. Conclude with future enhancements slide.

---
## 🧩 Known Tasks Before External Sharing
- [ ] Remove embedded `.git` under `integration-visualizer/`
- [ ] Add LICENSE
- [ ] Add CI workflow
- [ ] Add security placeholders (`application.yml` profile separation)
- [ ] Add README badges (build, version, license)

---
## ❓ Troubleshooting
Issue | Resolution
------|-----------
Port 8080 busy | Terminate stale Java process; retry run
Port 3000 busy | `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
Cannot read dashboard folder | Remove nested `.git` or adjust permissions
Kafka warnings | Safe to ignore for demo; start broker when ready

---
## 📑 Appendix: MuleSoft Equivalency Comment Pattern
Example in controller:
```java
// Equivalent to MuleSoft Flow
// MuleSoft HTTP Listener → @RestController
// MuleSoft Connector → WebClient
// MuleSoft Transformer → Java transformation logic
// MuleSoft Logger → Slf4j logging
```
Ensure new code additions maintain this header where applicable.

---
**Built with ❤️ using Spring Boot 3.3.x, Java 17, Next.js, and open-source tooling**
