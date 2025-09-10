Quick start — run the local WebView app

This folder provides a minimal Flutter wrapper that loads your existing HTML/CSS/JS from `assets/www/`.

1) Ensure you have Flutter installed and configured on Windows. From PowerShell run:

```powershell
flutter --version
```

2) In your Flutter project folder (this repo root), fetch packages:

```powershell
flutter pub get
```

3) Run the app (connect an Android device or emulator):

```powershell
flutter run
```

Notes
- I added `lib/main.dart` and `lib/screens/local_web_page.dart` in this workspace. If you already have a Flutter app, copy those into your `lib/` directory.
- Place all web files under `assets/www/` — already done here.
- If `flutter create` previously failed, ensure your Flutter SDK path and environment are correct. If you want, I can scaffold a full Flutter project (android/ios folders), but that is larger.

If you want me to scaffold a full Flutter project here, say so and I'll create the necessary files (may take a couple of steps).
