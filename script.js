const tg = window.Telegram.WebApp;
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// Init Telegram WebApp
tg.expand();
document.body.style.backgroundColor = tg.themeParams.bg_color || '#121214';

function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    msgDiv.textContent = text;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // Display user message
    addMessage(text, true);
    userInput.value = '';

    // Show typing
    typingIndicator.classList.remove('hidden');

    try {
        // Here we would call our backend API
        // For now, simulate delay and echo
        // const response = await fetch('/api/chat', { ... });
        
        await new Promise(r => setTimeout(r, 1500)); 
        
        // Mock response
        const mockResponse = "Это демонстрационный ответ. В реальной версии здесь был бы ответ от RAG модели через n8n.";
        
        typingIndicator.classList.add('hidden');
        addMessage(mockResponse);

        // Optional: Provide soft conversion
        if (Math.random() > 0.7) {
            setTimeout(() => {
                addMessage("Хотите, чтобы наш эксперт связался с вами для более детальной консультации?");
            }, 1000);
        }

    } catch (e) {
        console.error(e);
        typingIndicator.classList.add('hidden');
        addMessage("Ошибка связи с сервером AI.");
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
