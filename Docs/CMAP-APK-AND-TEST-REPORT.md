# CMAP APK & Test Report (Oct 2026)

## Build environment (all observed)
- Windows, Node v24.21.0, Microsoft OpenJDK 17.0.20.1, Android SDK cmdline-tools 12.0
  (platform-tools 1.0.41, android-34, build-tools 34.0.0, licenses accepted),
  Gradle 8.7 + AGP 8.5.2, all user-local, no admin.
- Wrapper: `android/` (native WebView → production URL, Java, minSdk 24 / targetSdk 34).
- Signing: NEW project release key, RSA-2048, cert valid 2026–2056, stored OUTSIDE the repo at
  `%USERPROFILE%\.cmap-android\` (keystore + password files, never committed).
- Rebuild: `powershell -ExecutionPolicy Bypass -File android-release\build-apk.ps1`

## Commands & results
- `gradlew assembleRelease` — BUILD SUCCESSFUL (fixed along the way: Kotlin-DSL extensions,
  kotlin-stdlib duplicates exclusion, absolute keystore path with forward slashes).
- `apksigner verify` — exit 0; v2 scheme true; 1 signer; cert SHA-256 matches keystore.
- `aapt dump badging` — package `com.chizzywizzy.cmap`, versionCode 2, versionName 1.1,
  launchable `MainActivity`, min Android 7.0, target Android 14.
- v1.1 file SHA-256: `D343096497A55890CC3B977F6FD3A8015F8D4F29D66277C394B0445F5C82190B`
  (v1.0: `65816A7C...BE1322`, same key — clean update path).

## Deliverables
- `android-release/CMAP-v1.1.apk` (2.43 MB, local folder) + `build-apk.ps1` + `README.md`
  (install steps, key-backup warning, internet-required note).
- GitHub Release v1.1: `https://github.com/Chizzywizzy/HandsOnProject/releases/tag/v1.1`
- Sources committed: `android/`, `assetlinks.json` (live, verified 200).

## Test results
- Auth gates: 401 logged-out (members/dashboard/reports), 200 logged-in, attendance POST open
  by design (kiosk), wrong password rejected.
- E2E (browser, local): login → dashboard cards → add member → add task → reports reflect →
  EVAL rows cleaned, counts back to 0.
- Web checks: `tsc` clean, `next build` passes, AI unit tests 5/5, Gemini summary live 200s.
- Install/launch on device: BLOCKED — `adb devices` empty, no emulator here. Not performed;
  signature + badging + checksum verification above is the completed evidence.

## Blockers & notes
- APK needs internet (loads hosted site); offline shows PWA fallback only where cached.
- Back up `%USERPROFILE%\.cmap-android\` to USB — losing it breaks update continuity.
