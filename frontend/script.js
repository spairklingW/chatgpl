// Handle key press for sending messages
async function handleKey(e) {
  if (e.key === "Enter") {
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

// Scroll behavior for unicorn image
window.addEventListener("scroll", function () {
  // Get the unicorn image element
  const unicorn = document.getElementById("unicorn-image");

  // Get the scroll position of the page
  const scrollPosition = window.scrollY;

  // Calculate the new position for the unicorn image based on the scroll position
  // We will move the unicorn between left and right based on the scroll amount
  const moveAmount = scrollPosition * 0.3; // Adjust multiplier for more or less movement

  // Set the transform to move the unicorn horizontally
  unicorn.style.transform = `translateX(${moveAmount}px)`;
});
