async function sendMessage() {
	const input = document.getElementById('userInput');
	const chatBox = document.getElementById('chatBox');
	const userText = input.value.trim();

	if (!userText) return;

	appendMessage(userText, 'user');
	input.value = '';

	try {
		const res = await fetch('https://ai-mentor-serenity-backend.onrender.com/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: 'user123', message: userText }),
		});

		// ✅ handle backend errors properly
		if (!res.ok) {
			const errText = await res.text();
			console.error("Backend error:", errText);
			appendMessage('Server error 💔', 'bot');
			return;
		}

		const data = await res.json();
		appendMessage(data.response, 'bot');

	} catch (err) {
		console.error(err);
		appendMessage('Network error 💔', 'bot');
	}
}

function appendMessage(text, sender) {
	const chatBox = document.getElementById('chatBox');
	const messageEl = document.createElement('div');
	messageEl.classList.add('message', sender);

	const avatar = document.createElement('div');
	avatar.classList.add('avatar');
	avatar.textContent = sender === 'user' ? 'U' : 'S';

	const bubble = document.createElement('div');
	bubble.classList.add('bubble');
	bubble.textContent = text;

	messageEl.appendChild(sender === 'user' ? bubble : avatar);
	messageEl.appendChild(sender === 'user' ? avatar : bubble);

	chatBox.appendChild(messageEl);
	chatBox.scrollTop = chatBox.scrollHeight;
}
