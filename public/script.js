let conversationHistory = [];

async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Display user message
    addMessage(message, 'user-message');
    input.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                conversationHistory: conversationHistory
            })
        });

        // Modify the sendMessage function
        const data = await response.json();
        
        // Display bot response
        addMessage(data.response, 'bot-message');
        
        // Handle image if present
        if (data.imageUrl) {
            addImage(data.imageUrl);
        }
        
        // Display follow-up question only when needed
        if (data.followUp) {
            addMessage("Is there anything else I can help you with?", 'bot-message');
        }

        conversationHistory.push(data);
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error. Please try again.', 'bot-message');
    }
}

function addMessage(text, className) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = text;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addImage(imageUrl) {
    const messagesDiv = document.getElementById('chatMessages');
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.className = 'chat-image';
    messagesDiv.appendChild(imageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Handle Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


// Add this at the top of your file
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Add these event listeners after your existing ones
document.addEventListener('DOMContentLoaded', initializeTheme);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);