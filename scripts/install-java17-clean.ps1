# PowerShell script to download and install Java 17
# This script downloads OpenJDK 17 from Adoptium and installs it

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Java 17 Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "This script requires administrator privileges." -ForegroundColor Red
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Enter to exit..."
    Read-Host
    exit 1
}

try {
    Write-Host "Step 1: Downloading Java 17..." -ForegroundColor Yellow
    Write-Host "Source: Adoptium (Eclipse Temurin)" -ForegroundColor Gray
    Write-Host ""
    
    $downloadUrl = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jdk_x64_windows_hotspot_17.0.13_11.msi"
    $installerPath = "$env:TEMP\OpenJDK17-installer.msi"
    
    Write-Host "Downloading from: $downloadUrl" -ForegroundColor Gray
    Write-Host "Saving to: $installerPath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "This may take 2-3 minutes (approx 160 MB)..." -ForegroundColor Yellow
    
    Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
    
    Write-Host "Download complete!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Step 2: Installing Java 17..." -ForegroundColor Yellow
    Write-Host "Installation directory: C:\Program Files\Eclipse Adoptium\" -ForegroundColor Gray
    Write-Host ""
    
    $arguments = @(
        "/i"
        "`"$installerPath`""
        "/quiet"
        "/norestart"
        "INSTALLDIR=`"C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot\`""
        "ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome"
        "JAVA_HOME=`"C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot\`""
    )
    
    Start-Process "msiexec.exe" -ArgumentList $arguments -Wait -NoNewWindow
    
    Write-Host "Installation complete!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Step 3: Cleaning up..." -ForegroundColor Yellow
    Remove-Item $installerPath -Force -ErrorAction SilentlyContinue
    Write-Host "Cleanup done!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Step 4: Verifying installation..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try to find Java 17
    $java17Paths = @(
        "C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot\bin\java.exe",
        "C:\Program Files\Eclipse Adoptium\jdk-17*\bin\java.exe",
        "C:\Program Files\Java\jdk-17*\bin\java.exe"
    )
    
    $java17Found = $false
    foreach ($path in $java17Paths) {
        $resolvedPaths = Resolve-Path $path -ErrorAction SilentlyContinue
        if ($resolvedPaths) {
            foreach ($resolvedPath in $resolvedPaths) {
                if (Test-Path $resolvedPath) {
                    Write-Host "Found Java 17 at: $resolvedPath" -ForegroundColor Green
                    & $resolvedPath -version
                    $java17Found = $true
                    break
                }
            }
        }
        if ($java17Found) { break }
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Installation Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: You MUST restart PowerShell!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Close this PowerShell window" -ForegroundColor White
    Write-Host "2. Open a NEW PowerShell window" -ForegroundColor White
    Write-Host "3. Run: java -version" -ForegroundColor White
    Write-Host "   (Should show: openjdk version 17.0.13)" -ForegroundColor Gray
    Write-Host "4. Navigate to project: cd c:\Users\r.vijay.sirsulwar\Videos\mul_to_springboot" -ForegroundColor White
    Write-Host "5. Build project: mvn clean install" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Installation failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install manually:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://adoptium.net/temurin/releases/?version=17" -ForegroundColor White
    Write-Host "2. Download: Windows x64 MSI (OpenJDK17U-jdk_x64_windows_hotspot)" -ForegroundColor White
    Write-Host "3. Double-click the downloaded MSI file" -ForegroundColor White
    Write-Host "4. Follow the installation wizard" -ForegroundColor White
    Write-Host "5. Check 'Set JAVA_HOME' and 'Add to PATH' options" -ForegroundColor White
    Write-Host "6. Restart PowerShell after installation" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press Enter to exit..."
Read-Host
