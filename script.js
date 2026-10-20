const sourceLanguage = document.querySelector("#sourceLanguage");
const targetLanguage = document.querySelector("#targetLanguage");
const sourceText = document.querySelector("#sourceText");
const translatedText = document.querySelector("#translatedText");
const statusMessage = document.querySelector("#statusMessage");
const translateButton = document.querySelector("#translateButton");
const characterCount = document.querySelector("#characterCount");

const languageNames = {
  en: "English", hi: "Hindi", es: "Spanish", fr: "French",
  de: "German", it: "Italian", ja: "Japanese", zh: "Chinese",
  ar: "Arabic", pa: "Punjabi", bn: "Bengali", pt: "Portuguese",
  ru: "Russian", ko: "Korean"
};

sourceText.addEventListener("input", () => {
  characterCount.textContent = `${sourceText.value.length} / 3000 characters`;
});

document.querySelector("#swapButton").addEventListener("click", () => {
  const previousSource = sourceLanguage.value;
  sourceLanguage.value = targetLanguage.value;
  targetLanguage.value = previousSource;

  const previousText = sourceText.value;
  const previousResult = translatedText.textContent;
  if (previousResult !== "Your translated text will appear here." &&
      !previousResult.startsWith("Translation failed")) {
    sourceText.value = previousResult;
    translatedText.textContent = previousText || "Your translated text will appear here.";
    characterCount.textContent = `${sourceText.value.length} / 3000 characters`;
  }
  statusMessage.textContent = "Languages swapped.";
});

document.querySelector("#clearButton").addEventListener("click", () => {
  sourceText.value = "";
  characterCount.textContent = "0 / 3000 characters";
  translatedText.textContent = "Your translated text will appear here.";
  statusMessage.textContent = "Text cleared.";
  sourceText.focus();
});

translateButton.addEventListener("click", async () => {
  const text = sourceText.value.trim();
  const from = sourceLanguage.value;
  const to = targetLanguage.value;

  if (!text) {
    statusMessage.textContent = "Please enter some text first.";
    sourceText.focus();
    return;
  }
  if (from === to) {
    translatedText.textContent = text;
    statusMessage.textContent = "Both languages are the same.";
    return;
  }

  translateButton.disabled = true;
  translateButton.textContent = "Translating...";
  statusMessage.textContent = "Connecting to translation service...";

  try {
    const endpoint = new URL("https://api.mymemory.translated.net/get");
    endpoint.searchParams.set("q", text);
    endpoint.searchParams.set("langpair", `${from}|${to}`);

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("The translation service is unavailable.");
    const data = await response.json();
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || "Translation request failed.");
    }

    translatedText.textContent = data.responseData.translatedText;
    statusMessage.textContent = `${languageNames[from]} → ${languageNames[to]} · Translation complete.`;
  } catch (error) {
    translatedText.textContent = "Translation failed. Check your internet connection and try again.";
    statusMessage.textContent = error.message || "The translation service may be temporarily unavailable.";
  } finally {
    translateButton.disabled = false;
    translateButton.innerHTML = 'Translate text <span aria-hidden="true">→</span>';
  }
});

document.querySelector("#copyButton").addEventListener("click", async () => {
  const result = translatedText.textContent;
  if (!result || result === "Your translated text will appear here.") {
    statusMessage.textContent = "There is no translation to copy yet.";
    return;
  }

  try {
    await navigator.clipboard.writeText(result);
    statusMessage.textContent = "Translation copied to clipboard!";
  } catch {
    const temporary = document.createElement("textarea");
    temporary.value = result;
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.appendChild(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    statusMessage.textContent = copied ? "Translation copied to clipboard!" : "Please copy the result manually.";
  }
});
