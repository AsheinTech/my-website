// Toggle chat window open/close
function toggleChat() {
  const chat = document.getElementById("chat-container");
  chat.classList.toggle("hidden");
}

// Send button & Enter key listener
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Send message to backend
function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => appendMessage("Ashein", data.reply))
    .catch(err => appendMessage("Ashein", "⚠️ Sorry, something went wrong."));
}

// Display messages
function appendMessage(sender, text) {
  const container = document.getElementById("chat-messages");
  const bubble = document.createElement("div");
  bubble.innerHTML = `<strong>${sender}:</strong> ${text}`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
