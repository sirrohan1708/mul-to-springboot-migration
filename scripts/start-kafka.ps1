# Start Kafka Infrastructure
Write-Host "🚀 Starting Kafka infrastructure..." -ForegroundColor Green
docker-compose up -d zookeeper kafka kafka-ui

Write-Host "`n⏳ Waiting for Kafka to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host "`n✅ Kafka infrastructure started!" -ForegroundColor Green
Write-Host "   Kafka Broker: http://localhost:9092" -ForegroundColor Cyan
Write-Host "   Kafka UI: http://localhost:8090" -ForegroundColor Cyan
Write-Host "`n📊 Opening Kafka UI in browser..." -ForegroundColor Yellow
Start-Process "http://localhost:8090"
