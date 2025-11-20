# Complete Demo Script
Write-Host "🎯 MuleSoft to Spring Boot Migration Demo" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

# Step 1: Start Kafka
Write-Host "`n📍 Step 1: Starting Kafka infrastructure..." -ForegroundColor Green
docker-compose up -d zookeeper kafka kafka-ui
Start-Sleep -Seconds 15
Write-Host "   ✅ Kafka started!" -ForegroundColor Green

# Step 2: Build the application
Write-Host "`n📍 Step 2: Building Spring Boot application..." -ForegroundColor Green
mvn clean package -DskipTests
Write-Host "   ✅ Build complete!" -ForegroundColor Green

# Step 3: Start the application
Write-Host "`n📍 Step 3: Starting Spring Boot application..." -ForegroundColor Green
Write-Host "   (Starting in background...)" -ForegroundColor Yellow
$job = Start-Job -ScriptBlock { 
    Set-Location "c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot"
    mvn spring-boot:run 
}
Start-Sleep -Seconds 20
Write-Host "   ✅ Application started!" -ForegroundColor Green

# Step 4: Test the endpoints
Write-Host "`n📍 Step 4: Testing the integration flow..." -ForegroundColor Green

Write-Host "`n   🧪 Test 1: Get Customer ID 1" -ForegroundColor Cyan
try {
    $response1 = Invoke-RestMethod -Uri "http://localhost:8080/api/customer/1" -Method Get
    Write-Host "      ✅ Customer: $($response1.fullName) - Loyalty: $($response1.loyaltyScore)" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Failed: $_" -ForegroundColor Red
}

Write-Host "`n   🧪 Test 2: Get Customer ID 2" -ForegroundColor Cyan
try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:8080/api/customer/2" -Method Get
    Write-Host "      ✅ Customer: $($response2.fullName) - Loyalty: $($response2.loyaltyScore)" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Failed: $_" -ForegroundColor Red
}

Write-Host "`n   🧪 Test 3: Check Service Status" -ForegroundColor Cyan
try {
    $status = Invoke-RestMethod -Uri "http://localhost:8080/api/status" -Method Get
    Write-Host "      ✅ Status: $($status.status)" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Failed: $_" -ForegroundColor Red
}

Write-Host "`n   🧪 Test 4: Check Health" -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method Get
    Write-Host "      ✅ Health: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Failed: $_" -ForegroundColor Red
}

# Step 5: Show results
Write-Host "`n📍 Step 5: Demo complete!" -ForegroundColor Green
Write-Host "`n📊 Access points:" -ForegroundColor Cyan
Write-Host "   API: http://localhost:8080/api/customer/1" -ForegroundColor White
Write-Host "   Status: http://localhost:8080/api/status" -ForegroundColor White
Write-Host "   Health: http://localhost:8080/actuator/health" -ForegroundColor White
Write-Host "   Kafka UI: http://localhost:8090" -ForegroundColor White

Write-Host "`n🎯 Check the Kafka UI to see published events!" -ForegroundColor Yellow
Write-Host "   Topic: customer-events" -ForegroundColor Yellow

Write-Host "`n⚠️  Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host "   Then run: docker-compose down" -ForegroundColor Yellow

# Keep the script running
Wait-Job $job
