# Install Java 17 (Eclipse Temurin) Automatically
# This script downloads and installs Java 17

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Java 17 Automatic Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  WARNING: Not running as Administrator" -ForegroundColor Yellow
    Write-Host "This script works better with Administrator privileges" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "Installation cancelled." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Checking for Chocolatey package manager..." -ForegroundColor Yellow

# Check if Chocolatey is installed
if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "✅ Chocolatey found!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Installing Java 17 via Chocolatey..." -ForegroundColor Cyan
    choco install temurin17 -y
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Java 17 installed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Refreshing environment variables..." -ForegroundColor Yellow
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        Write-Host ""
        Write-Host "Verifying installation..." -ForegroundColor Yellow
        java -version
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  Installation Complete!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Close and reopen PowerShell" -ForegroundColor White
        Write-Host "2. Run: java -version (should show Java 17)" -ForegroundColor White
        Write-Host "3. Run: mvn clean install" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "❌ Installation failed" -ForegroundColor Red
        Write-Host "Please install manually from: https://adoptium.net/" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Chocolatey not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installing Chocolatey first..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        
        Write-Host ""
        Write-Host "✅ Chocolatey installed!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Now installing Java 17..." -ForegroundColor Cyan
        
        # Refresh path
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        choco install temurin17 -y
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Java 17 installed successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "  Installation Complete!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Cyan
            Write-Host "1. Close and reopen PowerShell" -ForegroundColor White
            Write-Host "2. Run: java -version (should show Java 17)" -ForegroundColor White
            Write-Host "3. Run: mvn clean install" -ForegroundColor White
            Write-Host ""
        }
    } catch {
        Write-Host ""
        Write-Host "❌ Automated installation failed" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install Java 17 manually:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://adoptium.net/temurin/releases/?version=17" -ForegroundColor White
        Write-Host "2. Download: Windows x64 MSI installer" -ForegroundColor White
        Write-Host "3. Run the installer" -ForegroundColor White
        Write-Host "4. Restart PowerShell" -ForegroundColor White
        Write-Host ""
        Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
