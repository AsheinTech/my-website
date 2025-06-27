document.getElementById('send-btn').addEventListener('click', async () => {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-messages');
  const typingIndicator = document.getElementById('typing-indicator');

  // Show user's message (bubble right)
  chatBox.innerHTML += `
    <div class="flex justify-end">
      <div class="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-xs text-right shadow">
        <span class="text-xs block mb-1">👤 You</span>
        ${message}
      </div>
    </div>
  `;
  input.value = '';

  // Show typing indicator
  typingIndicator.style.display = 'block';
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('https://ashein-chat-backened-1.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    // Show Ashein AI reply (bubble left)
    chatBox.innerHTML += `
      <div class="flex justify-start">
        <div class="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2 max-w-xs shadow">
          <span class="text-xs block mb-1">🤖 Ashein AI</span>
          ${data.reply}
        </div>
      </div>
    `;
  } catch (err) {
    chatBox.innerHTML += `
      <div class="flex justify-start">
        <div class="bg-red-100 text-red-700 rounded-2xl px-4 py-2 max-w-xs shadow">
          <em>❌ Failed to get a response. Try again later.</em>
        </div>
      </div>
    `;
  }

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Hide typing indicator
  typingIndicator.style.display = 'none';
});
