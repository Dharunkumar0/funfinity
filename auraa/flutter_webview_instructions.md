Goal

Embed your existing static HTML/CSS/JS pages into a Flutter app without changing the web files. This document shows the exact steps and provides a small Flutter example (main.dart + LocalWebPage) that loads local HTML assets using webview_flutter.

Recommended approach

- Fast and reliable: Use webview_flutter to load local asset files (no change to your HTML/CSS/JS).
- Keep your site files in an assets folder inside your Flutter project and reference them by path.

Steps

1) Copy your web files into the Flutter project's assets folder

Inside your Flutter project's root (where pubspec.yaml lives), create:
  assets/www/

Copy these files (from your current workspace) into that folder. Example files to copy:
  - chapter1-numbers.html
  - math-chapters.html
  - practice.html
  - practice-styles.css
  - math-chapters-styles.css
  - any images or media files referenced by the HTML

2) pubspec.yaml changes

Add the webview dependency and declare the assets. Example snippet to merge into your pubspec.yaml:

dependencies:
  flutter:
    sdk: flutter
  webview_flutter: ^4.0.7

flutter:
  assets:
    - assets/www/

After editing run:

flutter pub get

3) Example Flutter code (drop into lib/)

I included a small example in this repo under `lib/` (see files `main.dart` and `screens/local_web_page.dart`). The example shows how to load an asset web page using WebViewController.loadFlutterAsset(). It uses `webview_flutter` 4.x API.

Notes and gotchas

- Keep relative paths inside your HTML unchanged. If an HTML file loads `practice-styles.css` with a plain href, make sure that file sits in the same folder (assets/www/) so the WebView can resolve it.
- Android: loading local assets with webview_flutter works out of the box.
- iOS: local assets also work, but if your page loads external resources, you may need ATS configuration.
- Interaction: to call JS from Flutter or receive messages from the page, use runJavaScript / addJavaScriptChannel.

Optional enhancements

- Preload the local asset into memory and use `loadHtmlString` if you need transformations.
- Use WebView's JavaScript channels to communicate (unlock levels, send events).

If you want, I can:
- Initialize a simple Flutter project skeleton here (lib/, pubspec.yaml) for you to copy into your real Flutter app, or
- Convert one of your pages (practice.html) to a native Flutter screen.

