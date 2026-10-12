# Reusable CMAP release build (Windows PowerShell).
# Prerequisites (one-time, already done on this machine):
#   JDK 17, Android SDK cmdline-tools + platform-tools + platforms;android-34 +
#   build-tools;34.0.0, release keystore at $HOME\.cmap-android\cmap-release.keystore
#   with passwords in $HOME\.cmap-android\keystore.properties (forward slashes).
# Usage: run from the android/ folder:  ..\android-release\build-apk.ps1
# Output: ..\android-release\CMAP-v1.apk (bumped manually per release).
$ErrorActionPreference = "Stop"
if (-not $env:JAVA_HOME) { $env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot" }
if (-not $env:ANDROID_HOME) { $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk" }
if (-not $env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME }
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$proj = Join-Path (Split-Path -Parent $root) "android"
Set-Location $proj
.\gradlew.bat assembleRelease
$apk = Join-Path $proj "app\build\outputs\apk\release\app-release.apk"
$bt = Join-Path $env:ANDROID_HOME "build-tools\34.0.0"
& "$bt\apksigner.bat" verify --print-certs $apk
Copy-Item $apk (Join-Path $root "CMAP-v1.apk") -Force
Get-FileHash (Join-Path $root "CMAP-v1.apk") -Algorithm SHA256
