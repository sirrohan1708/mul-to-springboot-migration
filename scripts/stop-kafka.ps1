# Stop Kafka Infrastructure
Write-Host "🛑 Stopping Kafka infrastructure..." -ForegroundColor Yellow
docker-compose down

Write-Host "`n✅ Kafka infrastructure stopped!" -ForegroundColor Green
