document.getElementById('send-btn').addEventListener('click', async () => {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-box');
  const typingIndicator = document.getElementById('typing-indicator');

  // Display user's message
  chatBox.innerHTML += `<div class="text-right"><strong>You:</strong> ${message}</div>`;
  input.value = '...';

  // Show typing indicator
  typingIndicator.style.display = 'block';

  try {
    const res = await fetch('https://ashein-chat-backened-1.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatBox.innerHTML += `<div><strong>Ashein AI:</strong> ${data.reply}</div>`;
  } catch (err) {
    chatBox.innerHTML += `<div><em>Failed to get a response. Try again later.</em></div>`;
  }

  // Hide typing indicator and reset input
  typingIndicator.style.display = 'none';
  input.value = '';
})
