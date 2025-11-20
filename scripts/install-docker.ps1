# PowerShell script to download and install Docker Desktop
# Requires Administrator privileges

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Docker Desktop Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script requires administrator privileges." -ForegroundColor Red
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Enter to exit..."
    Read-Host
    exit 1
}

try {
    Write-Host "Step 1: Downloading Docker Desktop..." -ForegroundColor Yellow
    Write-Host "Source: Docker Official Website" -ForegroundColor Gray
    Write-Host ""
    
    $downloadUrl = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
    $installerPath = "$env:TEMP\DockerDesktopInstaller.exe"
    
    Write-Host "Downloading from: $downloadUrl" -ForegroundColor Gray
    Write-Host "Saving to: $installerPath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "This may take 5-10 minutes (approx 600 MB)..." -ForegroundColor Yellow
    Write-Host ""
    
    # Download with progress
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
    $ProgressPreference = 'Continue'
    
    Write-Host "Download complete!" -ForegroundColor Green
    Write-Host ""
    
    $fileSize = (Get-Item $installerPath).Length / 1MB
    Write-Host "File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "Step 2: Installing Docker Desktop..." -ForegroundColor Yellow
    Write-Host "Installation directory: C:\Program Files\Docker\Docker\" -ForegroundColor Gray
    Write-Host ""
    Write-Host "This may take 5-10 minutes..." -ForegroundColor Yellow
    Write-Host "The installer will run silently in the background." -ForegroundColor Gray
    Write-Host ""
    
    # Install Docker Desktop silently
    # install --quiet --accept-license --backend=wsl-2
    Start-Process -FilePath $installerPath -ArgumentList "install --quiet --accept-license" -Wait -NoNewWindow
    
    Write-Host ""
    Write-Host "Installation complete!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Step 3: Cleaning up..." -ForegroundColor Yellow
    Remove-Item $installerPath -Force -ErrorAction SilentlyContinue
    Write-Host "Cleanup done!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Installation Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT NEXT STEPS:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. RESTART YOUR COMPUTER" -ForegroundColor White
    Write-Host "   (Docker Desktop requires a system restart)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. After restart, Docker Desktop will start automatically" -ForegroundColor White
    Write-Host "   (You'll see the Docker whale icon in your system tray)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Wait for Docker to finish starting (about 1-2 minutes)" -ForegroundColor White
    Write-Host "   (The whale icon will stop animating when ready)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Open PowerShell and verify Docker:" -ForegroundColor White
    Write-Host "   docker --version" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "5. Navigate to project and start Kafka:" -ForegroundColor White
    Write-Host "   cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot" -ForegroundColor Cyan
    Write-Host "   .\scripts\start-kafka.ps1" -ForegroundColor Cyan
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Installation failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install manually:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://www.docker.com/products/docker-desktop" -ForegroundColor White
    Write-Host "2. Click 'Download for Windows'" -ForegroundColor White
    Write-Host "3. Run the downloaded installer" -ForegroundColor White
    Write-Host "4. Follow the installation wizard" -ForegroundColor White
    Write-Host "5. Accept the license agreement" -ForegroundColor White
    Write-Host "6. Choose 'Use WSL 2 instead of Hyper-V' (recommended)" -ForegroundColor White
    Write-Host "7. Restart your computer when prompted" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press Enter to exit..."
Read-Host
