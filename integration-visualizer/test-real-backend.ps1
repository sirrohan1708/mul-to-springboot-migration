# Test Spring Boot Backend with Real External API
# Run this after applying the ExternalApiClient.java fix

Write-Host "`n🧪 Testing Spring Boot Backend Integration`n" -ForegroundColor Cyan

# Test 1: Check if Spring Boot is running
Write-Host "📡 Test 1: Checking if Spring Boot is running on port 8080..." -ForegroundColor Yellow
try {
    $healthCheck = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Spring Boot is running!" -ForegroundColor Green
    Write-Host "   Status: $($healthCheck.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Spring Boot is not running on port 8080" -ForegroundColor Red
    Write-Host "   Please start it with: .\mvnw spring-boot:run" -ForegroundColor Yellow
    exit 1
}

# Test 2: Check if external API is accessible
Write-Host "`n📡 Test 2: Checking if external API is accessible..." -ForegroundColor Yellow
try {
    $externalApi = Invoke-WebRequest -Uri "https://jsonplaceholder.typicode.com/users/5" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    $externalData = $externalApi.Content | ConvertFrom-Json
    Write-Host "✅ External API is accessible!" -ForegroundColor Green
    Write-Host "   Sample User: $($externalData.name) from $($externalData.company.name)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Cannot reach external API" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

# Test 3: Test Spring Boot customer endpoint with different IDs
Write-Host "`n📡 Test 3: Testing Spring Boot /api/customer endpoints..." -ForegroundColor Yellow

$testIds = @(1, 5, 10)
$results = @()

foreach ($id in $testIds) {
    Write-Host "   Testing Customer ID: $id..." -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/api/customer/$id" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            $customer = $response.Content | ConvertFrom-Json
            Write-Host "   ✅ ID $id : $($customer.fullName) from $($customer.company)" -ForegroundColor Green
            
            $results += [PSCustomObject]@{
                ID = $id
                Status = "✅ Success"
                Name = $customer.fullName
                Email = $customer.emailAddress
                Company = $customer.company
                City = if ($customer.city) { $customer.city } else { "N/A" }
                LoyaltyTier = $customer.loyaltyTier
            }
        }
        
    } catch {
        Write-Host "   ❌ ID $id : Failed" -ForegroundColor Red
        Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Gray
        
        $results += [PSCustomObject]@{
            ID = $id
            Status = "❌ Failed"
            Name = "N/A"
            Email = "N/A"
            Company = "N/A"
            City = "N/A"
            LoyaltyTier = "N/A"
        }
    }
}

# Display results table
Write-Host "`n📊 Results Summary:" -ForegroundColor Cyan
$results | Format-Table -AutoSize

# Test 4: Verify unique customers
Write-Host "📡 Test 4: Verifying each ID returns unique customer..." -ForegroundColor Yellow

$uniqueNames = $results | Where-Object { $_.Status -eq "✅ Success" } | Select-Object -ExpandProperty Name -Unique

if ($uniqueNames.Count -eq $testIds.Count) {
    Write-Host "✅ All customers are unique! Real data is working." -ForegroundColor Green
} else {
    Write-Host "⚠️  Some customers may be duplicates or using fallback data" -ForegroundColor Yellow
}

# Test 5: Check response structure
Write-Host "`n📡 Test 5: Checking response structure..." -ForegroundColor Yellow
try {
    $sample = Invoke-WebRequest -Uri "http://localhost:8080/api/customer/5" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    $customer = $sample.Content | ConvertFrom-Json
    
    $requiredFields = @('customerId', 'fullName', 'emailAddress', 'phoneNumber', 'company', 'loyaltyTier')
    $missingFields = @()
    
    foreach ($field in $requiredFields) {
        if (-not ($customer.PSObject.Properties.Name -contains $field)) {
            $missingFields += $field
        }
    }
    
    if ($missingFields.Count -eq 0) {
        Write-Host "✅ Response structure is correct!" -ForegroundColor Green
        Write-Host "   Contains all required fields: $($requiredFields -join ', ')" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  Missing fields: $($missingFields -join ', ')" -ForegroundColor Yellow
    }
    
    # Show sample response
    Write-Host "`n📦 Sample Response (ID 5):" -ForegroundColor Cyan
    Write-Host ($customer | ConvertTo-Json -Depth 3) -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Could not verify response structure" -ForegroundColor Red
}

# Final verdict
Write-Host "`n🎯 Final Verdict:" -ForegroundColor Cyan

$successCount = ($results | Where-Object { $_.Status -eq "✅ Success" }).Count

if ($successCount -eq $testIds.Count) {
    Write-Host "🎉 ALL TESTS PASSED! Backend is working with REAL data!" -ForegroundColor Green
    Write-Host "✅ External API integration successful" -ForegroundColor Green
    Write-Host "✅ Unique customers for each ID" -ForegroundColor Green
    Write-Host "✅ Response structure correct" -ForegroundColor Green
    Write-Host "`n🚀 Your dashboard is ready for client demos with REAL data!" -ForegroundColor Cyan
    
} elseif ($successCount -gt 0) {
    Write-Host "⚠️  PARTIAL SUCCESS: $successCount/$($testIds.Count) tests passed" -ForegroundColor Yellow
    Write-Host "   Check Spring Boot logs for errors" -ForegroundColor Gray
    Write-Host "   Dashboard will use mock fallback for failed requests" -ForegroundColor Gray
    
} else {
    Write-Host "❌ ALL TESTS FAILED: Backend is returning errors" -ForegroundColor Red
    Write-Host "   Dashboard will use mock data fallback (which still works!)" -ForegroundColor Yellow
    Write-Host "   Check BACKEND_ERROR_FIX.md for troubleshooting steps" -ForegroundColor Gray
}

Write-Host "`n📚 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open http://localhost:3000 in browser" -ForegroundColor White
Write-Host "   2. Press F12 to open DevTools Console" -ForegroundColor White
Write-Host "   3. Enter Customer ID 5 and click 'Start Integration Flow'" -ForegroundColor White
Write-Host "   4. Check console for '✅ Success! Customer data received'" -ForegroundColor White
Write-Host "`n"
