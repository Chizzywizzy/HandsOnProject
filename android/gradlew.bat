@echo off
setlocal
set "APP_HOME=%~dp0"
set "GRADLE_HOME=%LOCALAPPDATA%\Gradle\gradle-8.7"
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "ANDROID_SDK_ROOT=%LOCALAPPDATA%\Android\Sdk"
"%GRADLE_HOME%\bin\gradle.bat" %*
