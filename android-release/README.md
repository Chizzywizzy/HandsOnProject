# CMAP Android APK

## Install (phone must allow the file + have internet — the app loads the live CMAP site)
1. Copy `CMAP-v1.apk` to your Android phone (USB, WhatsApp, Drive, or download from the GitHub Release below).
2. On the phone, open it → allow **Install unknown apps** for that source → Install → Open.
3. Sign in with your CMAP account. Internet required (church data stays on the server).

## This build
- Package `com.chizzywizzy.cmap`, versionCode 1, versionName 1.0, min Android 7.0 (SDK 24), target Android 14 (SDK 34).
- Signed with the project's release key (v2 scheme). Updates install cleanly **only** if signed with the same key.

## Signing key — BACK THIS UP
- Keystore: `%USERPROFILE%\.cmap-android\cmap-release.keystore` (alias `cmap`, RSA-2048, valid to 2056)
- Passwords: `%USERPROFILE%\.cmap-android\keystore-password.txt` + `keystore.properties`
- These files are OUTSIDE the repo and never committed. Lose them = cannot update this app listing; you'd republish under a new package name. Copy both to a USB drive today.

## Rebuild
From repo root on Windows: `powershell -ExecutionPolicy Bypass -File android-release\build-apk.ps1`

## Source
Wrapper code: `android/` (WebView + branded icons/splash). PWA origin: `https://neducmap-1207.netlify.app/`.
