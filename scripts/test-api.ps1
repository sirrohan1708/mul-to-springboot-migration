# Test the Integration Service
param(
    [int]$CustomerId = 1
)

Write-Host "🧪 Testing Integration Service..." -ForegroundColor Green
Write-Host "   Customer ID: $CustomerId" -ForegroundColor Cyan

Write-Host "`n📨 Calling GET /api/customer/$CustomerId" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "http://localhost:8080/api/customer/$CustomerId" -Method Get

Write-Host "`n✅ Response received:" -ForegroundColor Green
$response | ConvertTo-Json -Depth 10

Write-Host "`n📊 Check Kafka UI for the published event:" -ForegroundColor Cyan
Write-Host "   http://localhost:8090" -ForegroundColor Cyan
Write-Host "   Topic: customer-events" -ForegroundColor Cyan
