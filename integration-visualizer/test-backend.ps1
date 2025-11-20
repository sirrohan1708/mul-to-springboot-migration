# Integration Flow Visualizer - Test Script
# This script tests the Spring Boot backend connectivity

Write-Host "`n🔍 Testing Spring Boot Backend Connection...`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "📍 Test 1: Health Check Endpoint" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -Method Get -TimeoutSec 5
    if ($health.status -eq "UP") {
        Write-Host "   ✅ Backend is UP and running!" -ForegroundColor Green
        Write-Host "   Response: $($health | ConvertTo-Json -Compress)" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️  Backend status: $($health.status)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Backend not accessible at http://localhost:8080" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n   💡 Solution: Start Spring Boot backend:" -ForegroundColor Cyan
    Write-Host "   cd ..\spring-boot-integration" -ForegroundColor White
    Write-Host "   mvnw spring-boot:run`n" -ForegroundColor White
    exit 1
}

# Test 2: Customer API
Write-Host "`n📍 Test 2: Customer API Endpoint" -ForegroundColor Yellow
try {
    $customer = Invoke-RestMethod -Uri "http://localhost:8080/api/customer/1" -Method Get -TimeoutSec 5
    Write-Host "   ✅ Customer API working!" -ForegroundColor Green
    Write-Host "   Customer: $($customer.fullName) | Tier: $($customer.tier) | Score: $($customer.loyaltyScore)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Customer API failed" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: CORS Check (simulated)
Write-Host "`n📍 Test 3: CORS Configuration" -ForegroundColor Yellow
try {
    $headers = @{
        "Origin" = "http://localhost:3000"
    }
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/customer/1" -Method Get -Headers $headers -TimeoutSec 5
    
    if ($response.Headers["Access-Control-Allow-Origin"]) {
        Write-Host "   ✅ CORS is configured!" -ForegroundColor Green
        Write-Host "   Allowed Origin: $($response.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️  CORS headers not found" -ForegroundColor Yellow
        Write-Host "   💡 You may need to add CORS configuration to Spring Boot" -ForegroundColor Cyan
        Write-Host "   See SETUP_CORS.md for instructions`n" -ForegroundColor White
    }
} catch {
    Write-Host "   ⚠️  Could not verify CORS (this may be okay)" -ForegroundColor Yellow
}

# Test 4: Application Info
Write-Host "`n📍 Test 4: Application Info" -ForegroundColor Yellow
try {
    $info = Invoke-RestMethod -Uri "http://localhost:8080/actuator/info" -Method Get -TimeoutSec 5
    Write-Host "   ✅ Application info retrieved" -ForegroundColor Green
    if ($info.PSObject.Properties.Count -gt 0) {
        Write-Host "   Info: $($info | ConvertTo-Json -Compress)" -ForegroundColor Gray
    } else {
        Write-Host "   (No custom info configured - this is normal)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ⚠️  Info endpoint not accessible" -ForegroundColor Yellow
}

# Summary
Write-Host "`n" + ("="*60) -ForegroundColor Cyan
Write-Host "✅ BACKEND CONNECTION TEST COMPLETE!" -ForegroundColor Green
Write-Host ("="*60) -ForegroundColor Cyan

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "   • Spring Boot Backend: ✅ Running on http://localhost:8080" -ForegroundColor Green
Write-Host "   • Customer API: ✅ Working" -ForegroundColor Green
Write-Host "   • Next.js Dashboard: http://localhost:3000" -ForegroundColor White

Write-Host "`n🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "   2. Enter a Customer ID (1-10)" -ForegroundColor White
Write-Host "   3. Click 'Run Integration Flow'" -ForegroundColor White
Write-Host "   4. Watch the magic happen! ✨`n" -ForegroundColor White

Write-Host "💡 Pro Tip: Open browser DevTools (F12) to see network requests`n" -ForegroundColor Yellow
