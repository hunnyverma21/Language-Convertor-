# 🌐 Language Converter

A responsive language translation web app built with **HTML, CSS, and JavaScript**. Translate text between multiple languages using the MyMemory Translation API.

## Features

- Translate text between 14 languages
- Swap the source and target languages
- Copy the translated result
- Character counter (up to 3,000 characters)
- Clear input with one click
- Responsive layout for mobile and desktop
- Helpful status and error messages

## Languages

English, Hindi, Spanish, French, German, Italian, Japanese, Chinese (Simplified), Arabic, Punjabi, Bengali, Portuguese, Russian, and Korean.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in your browser.
3. Enter text, choose the source and target languages, then click **Translate text**.

An internet connection is required for translation because the app calls the MyMemory Translation API.

## Deploy with GitHub Pages

1. Create a new repository on GitHub, for example `language-converter`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/(root)`, then save.
6. Wait for GitHub Pages to publish your site. The URL will appear in the Pages section.

## Project structure

```text
language-converter/
├── index.html
├── style.css
├── script.js
└── README.md
```

## API and limitations

This project uses the public MyMemory Translation API (`https://api.mymemory.translated.net/get`). Translation availability, quotas, accuracy, and response times depend on the external service. Do not submit passwords or sensitive personal information.

## Future improvements

- Add voice input and text-to-speech
- Add recent translation history
- Add automatic language detection
- Improve accessibility and keyboard navigation

## License

This project is available for personal learning and portfolio use. Add a license file if you want to specify reuse permissions.
