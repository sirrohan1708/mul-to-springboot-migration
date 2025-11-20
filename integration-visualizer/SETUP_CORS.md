# 🔧 CORS Configuration Setup

## Step 1: Add CORS to Spring Boot Backend

Navigate to your Spring Boot project and open:
```
c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration\src\main\java\com\example\integrationservice\IntegrationServiceApplication.java
```

### Add these imports at the top:
```java
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
```

### Add this method inside the `IntegrationServiceApplication` class:
```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
        }
    };
}
```

### Complete Example:
```java
package com.example.integrationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class IntegrationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntegrationServiceApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## Step 2: Restart Spring Boot Backend

```powershell
# Navigate to Spring Boot project
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration

# Stop current process (Ctrl+C in the terminal)
# Then restart
mvnw spring-boot:run
```

---

## Step 3: Verify Backend is Running

Open a browser or use PowerShell:
```powershell
# Test health endpoint
curl http://localhost:8080/actuator/health

# Expected output:
# {"status":"UP"}
```

Or open in browser: http://localhost:8080/actuator/health

---

## Step 4: Test Integration from Dashboard

1. **Open Dashboard**: http://localhost:3000 (should already be running)
2. **Enter Customer ID**: Try IDs 1-10
3. **Click "Run Integration Flow"**
4. **Watch the animation**:
   - ✅ Fetch Customer Data (calls Spring Boot API)
   - ✅ Transform Data (applies business rules)
   - ✅ Publish to Kafka (sends message)
5. **Check Logs**: Real-time logs appear in the console
6. **View Data**: Customer data appears in the table

---

## Step 5: Test Different Customer IDs

Try these customer IDs to see different data:
- **ID 1**: John Doe (PLATINUM tier)
- **ID 2**: Jane Smith (GOLD tier)
- **ID 3**: Bob Johnson (SILVER tier)
- **ID 4**: Alice Williams (BRONZE tier)
- **ID 5**: Charlie Brown (SILVER tier)
- **ID 6-10**: More sample customers

---

## Troubleshooting

### ❌ Error: "Network Error" or "Connection Refused"
**Cause**: Spring Boot backend is not running
**Solution**: 
```powershell
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration
mvnw spring-boot:run
```

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Cause**: CORS not configured in Spring Boot
**Solution**: Follow Step 1 above to add CORS configuration

### ❌ Dashboard shows mock data only
**Cause**: Backend is down, but this is expected behavior
**Solution**: The dashboard works with mock data. To use real data, start the backend.

### ❌ Kafka warnings in Spring Boot logs
**Cause**: Kafka not installed (expected on corporate laptops)
**Solution**: These warnings are non-blocking. The app works fine without Kafka.

---

## Verification Checklist

- [ ] CORS configuration added to `IntegrationServiceApplication.java`
- [ ] Spring Boot restarted successfully
- [ ] Health endpoint returns `{"status":"UP"}`
- [ ] Next.js dashboard running on http://localhost:3000
- [ ] "Run Integration Flow" button works
- [ ] Real-time logs appear in console
- [ ] Customer data displays in table
- [ ] No CORS errors in browser console (F12)

---

## Quick Copy-Paste Commands

```powershell
# Terminal 1: Start Spring Boot (if not running)
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration
mvnw spring-boot:run

# Terminal 2: Dashboard should already be running
# If not, start it:
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\integration-visualizer
npm run dev

# Test backend from PowerShell:
curl http://localhost:8080/actuator/health
curl http://localhost:8080/api/customer/1
```

---

## Success! ✅

When everything is working, you should see:
1. **Spring Boot logs** showing incoming HTTP requests
2. **Dashboard animations** smoothly transitioning through steps
3. **Real-time logs** with emoji matching MuleSoft patterns
4. **Customer data** populating the table
5. **No errors** in browser console (F12 → Console tab)

---

**Ready to demo!** 🚀 Your integration flow visualizer is fully operational.
