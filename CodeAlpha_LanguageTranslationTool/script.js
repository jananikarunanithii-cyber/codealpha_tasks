async function translateText() {
    const inputText = document.getElementById("inputText").value.trim();
    const sourceLanguage = document.getElementById("sourceLanguage").value;
    const targetLanguage = document.getElementById("targetLanguage").value;
    const result = document.getElementById("result");

    if (inputText === "") {
        result.textContent = "Please enter some text to translate.";
        return;
    }

    if (sourceLanguage === targetLanguage) {
        result.textContent = inputText;
        return;
    }

    result.textContent = "Translating...";

    try {
        const url =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage}|${targetLanguage}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Translation request failed");
        }

        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
            result.textContent = data.responseData.translatedText;
        } else {
            result.textContent = "Translation could not be completed.";
        }

    } catch (error) {
        console.error(error);
        result.textContent =
            "Unable to translate right now. Please try again.";
    }
}

function copyText() {
    const result = document.getElementById("result").textContent;

    if (
        result &&
        result !== "Your translated text will appear here." &&
        result !== "Translation could not be completed."
    ) {
        navigator.clipboard.writeText(result);
        alert("Translation copied!");
    }
}