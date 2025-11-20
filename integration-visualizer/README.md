# Integration Flow Visualizer 🚀

A modern **Next.js 14** dashboard that visualizes Spring Boot integration flows, demonstrating how open-source technologies can replace MuleSoft orchestration patterns.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Overview

This dashboard provides a **visual demonstration** of how Spring Boot microservices can replace MuleSoft integration flows with open-source alternatives:

- **MuleSoft HTTP Connector** → Spring Boot REST endpoints with resilience
- **MuleSoft DataWeave** → Spring Boot transformation services
- **MuleSoft Kafka Publisher** → Spring Kafka integration
- **MuleSoft Logger** → Real-time log visualization

Perfect for **executive presentations**, **migration planning**, and **proof-of-concept** demos.

### 🌐 Real Data Mode Available!

The external API (`jsonplaceholder.typicode.com`) is accessible from your network! 

**Want to use REAL data instead of mock fallback?**  
📘 See **[REAL_DATA_QUICKFIX.md](./REAL_DATA_QUICKFIX.md)** for a 5-minute fix to enable live API integration.

---

## ✨ Features

- 🎨 **Modern UI**: Beautiful gradient design with glassmorphism effects
- 🎬 **Smooth Animations**: Framer Motion for professional transitions
- 📊 **Flow Visualization**: SVG diagram showing integration steps
- 📝 **Real-time Logs**: Console output matching Spring Boot patterns
- 📈 **Data Tables**: Display processed customer data with loyalty badges
- ⚡ **Fast Development**: Hot reload with Turbopack
- 🎯 **Type-Safe**: Full TypeScript with strict mode
- 📱 **Responsive**: Works on desktop, tablet, and mobile

---

## 🏗️ Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│   Next.js 14 (UI)   │  HTTP   │  Spring Boot 3.3.5  │
│   localhost:3000    │ ──────> │   localhost:8080    │
│   - Dashboard       │         │   - REST API        │
│   - Flow Cards      │         │   - Kafka Producer  │
│   - Log Console     │         │   - Retry Logic     │
└─────────────────────┘         └─────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

Before running the dashboard, ensure you have:

1. **Node.js 18+** installed ([Download](https://nodejs.org/))
2. **Spring Boot backend** running on `http://localhost:8080`
   - Navigate to: `c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration`
   - Run: `mvnw spring-boot:run` (or `./mvnw spring-boot:run` on Mac/Linux)
3. **Java 17** (for Spring Boot backend)

### Installation

```powershell
# Clone or navigate to the project
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\integration-visualizer

# Install dependencies (already done if you followed setup)
npm install

# Start the development server
npm run dev
```

### Access the Dashboard

Open your browser to:
- **Local**: http://localhost:3000
- **Network**: http://192.168.56.1:3000

---

## 🎮 Usage

### Running an Integration Flow

1. **Start the Spring Boot backend** (required):
   ```powershell
   cd ..\spring-boot-integration
   mvnw spring-boot:run
   ```

2. **Verify backend health**:
   - Open http://localhost:8080/actuator/health
   - Should return: `{"status":"UP"}`

3. **Run a flow from the dashboard**:
   - Enter a customer ID (1-10)
   - Click **"Run Integration Flow"**
   - Watch the animated visualization:
     - ✅ **Step 1**: Fetch Customer Data (HTTP call)
     - ✅ **Step 2**: Transform Data (DataWeave equivalent)
     - ✅ **Step 3**: Publish to Kafka (Message broker)
   - View real-time logs in the console
   - See processed data in the table

### Mock Data Mode

If the Spring Boot backend is **not running**, the dashboard will automatically:
- Use **mock customer data** from `src/lib/api.ts`
- Display sample logs and animations
- Allow you to demo the UI without a backend

---

## 📁 Project Structure

```
integration-visualizer/
├── .github/
│   └── copilot-instructions.md  ← AI coding guidelines
├── public/                       ← Static assets
├── src/
│   ├── app/
│   │   ├── page.tsx             ← Main dashboard
│   │   ├── layout.tsx           ← Common layout
│   │   ├── globals.css          ← Global styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── FlowCard.tsx         ← Step card (Fetch/Transform/Publish)
│   │   ├── FlowDiagram.tsx      ← SVG flow visualization
│   │   ├── LogConsole.tsx       ← Real-time log viewer
│   │   ├── HealthCard.tsx       ← Status indicator
│   │   └── DataTable.tsx        ← Customer data table
│   └── lib/
│       └── api.ts               ← Axios client + mock data
├── .env.local                    ← Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md                     ← You are here
```

---

## 🔧 Configuration

### Environment Variables

Create or edit `.env.local`:

```bash
# Spring Boot Backend URL
NEXT_PUBLIC_API_URL=http://localhost:8080

# Application Name
NEXT_PUBLIC_APP_NAME=Integration Visualizer
```

### CORS Configuration (Spring Boot)

To allow requests from Next.js, add this to your Spring Boot application:

**File**: `IntegrationServiceApplication.java`

```java
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
---

## 🎨 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Recharts** - Data visualization

### Backend (Separate Project)
- **Spring Boot 3.3.5** - Microservice framework
- **Spring Web** - REST API
- **Spring Kafka** - Message broker integration
- **Spring Retry** - Resilience patterns
- **Lombok** - Boilerplate reduction
- **Java 17** - LTS version

---

## 🧪 Development

### Run Development Server

```powershell
npm run dev
# Opens on http://localhost:3000
```

### Build for Production

```powershell
npm run build
npm start
# Production-optimized build
```

### Lint Code

```powershell
npm run lint
# Checks for TypeScript and ESLint errors
```

---

## 📊 API Endpoints (Spring Boot)

The dashboard connects to these Spring Boot endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/customer/{id}` | GET | Fetch customer by ID (1-10) |
| `/actuator/health` | GET | Health check status |
| `/actuator/info` | GET | Application information |

### Example Response

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "loyaltyScore": 850,
  "tier": "PLATINUM",
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## 🎯 MuleSoft → Spring Boot Mapping

| MuleSoft Component | Spring Boot Equivalent | Dashboard Visual |
|--------------------|------------------------|------------------|
| HTTP Listener | `@RestController` | Flow Card #1 |
| HTTP Connector | `RestTemplate` / `WebClient` | Flow Card #1 |
| DataWeave Transform | Java transformation services | Flow Card #2 |
| Kafka Publisher | Spring Kafka `KafkaTemplate` | Flow Card #3 |
| Logger | SLF4J logging | Log Console |
| Error Handler | `@ExceptionHandler` | Error states |
| Flow | Service orchestration | Flow Diagram |

---

## 🐛 Troubleshooting

### Dashboard shows "Connection refused"
- **Solution**: Ensure Spring Boot is running on port 8080
- Check: http://localhost:8080/actuator/health

### Port 3000 already in use
```powershell
# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or run on different port
npm run dev -- -p 3001
```

### Spring Boot backend not starting
```powershell
# Check Java version
java -version
# Should be Java 17

# Navigate to Spring Boot project
cd ..\spring-boot-integration

# Clean and rebuild
mvnw clean install

# Run application
mvnw spring-boot:run
```

### Kafka warnings (non-blocking)
- The dashboard works **without Kafka** installed
- Kafka warnings are expected on corporate laptops
- Data will still be processed and displayed

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📝 License

MIT License - feel free to use this for demos, presentations, and proof-of-concepts.

---

## 👨‍💻 Author

Created as a demonstration of **MuleSoft to Spring Boot migration patterns** for enterprise integration scenarios.

---

## 🎉 Demo Tips

For **executive presentations**:
1. Start with backend running (shows real integration)
2. Run flows with different customer IDs (1-10)
3. Highlight the **animated flow diagram**
4. Show **real-time logs** matching MuleSoft patterns
5. Demonstrate **error handling** (use invalid ID)
6. Show **data table** with processed results

For **technical audiences**:
1. Open browser DevTools (Network tab)
2. Show actual HTTP calls to Spring Boot
3. Demonstrate **retry logic** (stop/start backend)
4. Highlight **type safety** in VSCode
5. Show component code structure
6. Discuss **migration mapping** table above

---

**Ready to run!** Start the backend, then enjoy the dashboard at http://localhost:3000 🚀
