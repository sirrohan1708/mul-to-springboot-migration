# 🚀 Quick Start Guide - Integration Flow Visualizer

## Current Status
✅ Next.js Dashboard: **RUNNING** on http://localhost:3000  
❌ Spring Boot Backend: **NOT RUNNING** - needs to be started

---

## ⚡ Quick Start (3 Steps)

### Step 1: Add CORS to Spring Boot

**File**: `c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration\src\main\java\com\example\integrationservice\IntegrationServiceApplication.java`

**Add this method** to the `IntegrationServiceApplication` class:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
        }
    };
}
```

**Add imports** at the top:
```java
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
```

---

### Step 2: Start Spring Boot Backend

Open a **NEW PowerShell terminal** and run:

```powershell
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration
mvnw spring-boot:run
```

Wait for:
```
Started IntegrationServiceApplication in X.XXX seconds
```

---

### Step 3: Test the Dashboard

1. **Open browser**: http://localhost:3000
2. **Enter Customer ID**: 1
3. **Click**: "Run Integration Flow"
4. **Watch**: Animated flow with real data from Spring Boot!

---

## 🧪 Testing Without Backend (Mock Data)

The dashboard **works without the backend** using mock data!

- Just go to http://localhost:3000
- Click "Run Integration Flow"
- You'll see mock customer data and animations
- Perfect for UI demos when backend is unavailable

---

## 🎯 Customer IDs to Try

Once backend is running, test with these IDs:

| ID | Name | Tier | Loyalty Score |
|----|------|------|---------------|
| 1 | John Doe | PLATINUM | 850 |
| 2 | Jane Smith | GOLD | 720 |
| 3 | Bob Johnson | SILVER | 580 |
| 4 | Alice Williams | BRONZE | 450 |
| 5 | Charlie Brown | SILVER | 620 |

---

## 📋 Copy-Paste Commands

### Terminal 1: Spring Boot Backend
```powershell
cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot\spring-boot-integration
mvnw spring-boot:run
```

### Terminal 2: Next.js Dashboard (Already Running)
```powershell
# Already running on http://localhost:3000
# If stopped, restart with:
npm run dev
```

### Test Backend:
```powershell
curl http://localhost:8080/actuator/health
# Should return: {"status":"UP"}

curl http://localhost:8080/api/customer/1
# Should return customer data
```

---

## 🔍 Verification Steps

1. **Backend Running?**
   - Open: http://localhost:8080/actuator/health
   - Should see: `{"status":"UP"}`

2. **Dashboard Running?**
   - Open: http://localhost:3000
   - Should see: Integration Flow Visualizer

3. **CORS Working?**
   - Open browser DevTools (F12)
   - Run a flow
   - Check Console tab - no CORS errors

4. **Real Data?**
   - Run flow with ID 1
   - Should show "John Doe" in logs and table
   - If shows mock data, backend isn't connected

---

## 🎨 Demo Tips

### For Executive Presentations:
1. Start with Customer ID 1 (John Doe - PLATINUM tier)
2. Highlight the **animated flow diagram**
3. Point out **real-time logs** mimicking MuleSoft
4. Show the **data table** with results
5. Run again with ID 2 to show different tier

### For Technical Audiences:
1. Open **Browser DevTools** (F12 → Network tab)
2. Run a flow and show the **HTTP requests** to Spring Boot
3. Show the **Spring Boot logs** in the terminal
4. Explain the **MuleSoft → Spring Boot mapping**
5. Demonstrate **error handling** (try invalid ID like 999)

---

## ⚠️ Common Issues

### Issue: "CORS error" in browser console
**Solution**: Add CORS configuration to Spring Boot (see Step 1)

### Issue: "Connection refused" error
**Solution**: Start Spring Boot backend (see Step 2)

### Issue: Port 8080 already in use
**Solution**: Stop other Java processes or change Spring Boot port:
```properties
# In application.properties:
server.port=8081
```

### Issue: Shows mock data instead of real data
**Cause**: This is expected! Backend is not running
**Solution**: Either start backend OR continue with mock data demo

---

## 🎉 Success Indicators

✅ No errors in browser console  
✅ Logs show emoji (🌐, ✅, 📤)  
✅ Real customer names appear (not "Mock Customer")  
✅ Flow animations complete smoothly  
✅ Data table populates with results  

---

## 📚 Files Created

- `README.md` - Full documentation
- `SETUP_CORS.md` - Detailed CORS setup
- `QUICK_START.md` - This file
- `test-backend.ps1` - Backend connectivity test
- `.env.local` - Environment configuration

---

**Ready to go!** 🚀

1. Add CORS to Spring Boot
2. Start backend: `mvnw spring-boot:run`
3. Open: http://localhost:3000
4. Click "Run Integration Flow"
5. **Enjoy the magic!** ✨
