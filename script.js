const faqData = {
    "what is codealpha?":
        "CodeAlpha is an organization that provides internship and learning opportunities for students and beginners.",

    "how can i contact support?":
        "You can contact the support team through the official contact details provided by CodeAlpha.",

    "what tasks are available?":
        "The internship provides different project-based tasks. You can complete the tasks assigned in your internship instructions.",

    "what technologies can i use?":
        "You can use suitable web technologies such as HTML, CSS, JavaScript, Node.js, Python, and other technologies depending on the task."
};

function sendMessage() {
    const input = document.getElementById("userInput");
    const question = input.value.trim();

    if (question === "") {
        return;
    }

    addMessage(question, "user-message");

    const answer = getAnswer(question);

    setTimeout(() => {
        addMessage(answer, "bot-message");
    }, 500);

    input.value = "";
}

function getAnswer(question) {
    const normalizedQuestion = question.toLowerCase().trim();

    if (faqData[normalizedQuestion]) {
        return faqData[normalizedQuestion];
    }

    if (
        normalizedQuestion.includes("codealpha") &&
        (normalizedQuestion.includes("what") ||
            normalizedQuestion.includes("who"))
    ) {
        return faqData["what is codealpha?"];
    }

    if (
        normalizedQuestion.includes("support") ||
        normalizedQuestion.includes("contact")
    ) {
        return faqData["how can i contact support?"];
    }

    if (
        normalizedQuestion.includes("task") ||
        normalizedQuestion.includes("tasks")
    ) {
        return faqData["what tasks are available?"];
    }

    if (
        normalizedQuestion.includes("technology") ||
        normalizedQuestion.includes("technologies") ||
        normalizedQuestion.includes("language")
    ) {
        return faqData["what technologies can i use?"];
    }

    return "Sorry, I don't have an answer for that question. Please try one of the Quick Questions below.";
}

function addMessage(message, className) {
    const chatBox = document.getElementById("chatBox");

    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function askQuestion(question) {
    document.getElementById("userInput").value = question;
    sendMessage();
}

document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});