// Handle key press for sending messages
async function handleKey(e) {
  if (e.key === "Enter") {
    await sendMessage();
  }
}

// Send message to backend and update chat
async function sendMessage() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addMessage("You", text, "user");

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    addMessage("Pierre Luxure", data.reply, "bot");
  } catch (err) {
    addMessage("Pierre Luxure", "Oops! Something went wrong.", "bot");
  }
}

// Add a new message to the chat
function addMessage(sender, text, cls) {
  const chat = document.getElementById("chat");
  const message = document.createElement("div");
  message.className = "message " + cls;
  message.textContent = `${sender}: ${text}`;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight; // Auto-scroll to the bottom
}

// Send button click handler
document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("send-button");
  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }
});

// Scroll behavior for unicorn image
window.addEventListener("scroll", function () {
  const unicorn = document.getElementById("unicorn-image");
  const scrollPosition = window.scrollY;
  const moveAmount = scrollPosition * 0.3;
  unicorn.style.transform = `translateX(${moveAmount}px)`;
});
