// Chat functionality
class ChatApp {
    constructor() {
        this.messages = [{ role: "assistant", content: "Ask me anything, cutie?" }];
        this.isThinking = false;
        this.init();
    }

    init() {
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatModal = document.getElementById('chat-modal');
        this.chatClose = document.getElementById('chat-close');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');
        this.chatMessages = document.getElementById('chat-messages');

        this.bindEvents();
        this.renderMessages();
    }

    bindEvents() {
        this.chatToggle.addEventListener('click', () => this.openChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close modal when clicking overlay
        this.chatModal.addEventListener('click', (e) => {
            if (e.target === this.chatModal) {
                this.closeChat();
            }
        });
    }

    openChat() {
        this.chatModal.classList.add('active');
    }

    closeChat() {
        this.chatModal.classList.remove('active');
    }

    async sendMessage() {
        const input = this.chatInput.value.trim();
        if (!input || this.isThinking) return;

        const userMessage = { role: "user", content: input };
        this.messages.push(userMessage);
        this.chatInput.value = "";
        this.renderMessages();
        this.isThinking = true;

        // Add thinking indicator
        this.addThinkingIndicator();

        try {
            const aiResponse = await this.sendToAPI([...this.messages]);
            this.messages.push({ role: "assistant", content: aiResponse });
        } catch (error) {
            this.messages.push({ role: "assistant", content: "Sorry, I encountered an error. Please try again." });
        } finally {
            this.isThinking = false;
            this.renderMessages();
        }
    }

    async sendToAPI(messages) {
        try {
            const response = await fetch("https://llm-chat-app-template-haieqa.npam10710.workers.dev/aichat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP Error: ${response.status}`);
            }

            // Get the response text
            const responseText = await response.text();
            
            // Check if it's SSE format (starts with "data: ")
            if (responseText.trim().startsWith('data:')) {
                return this.parseSSE(responseText);
            }
            
            // Try to parse as regular JSON
            try {
                const data = JSON.parse(responseText);
                // Extract the response from Cloudflare AI response
                if (data.response) {
                    return data.response;
                } else if (data.result?.response) {
                    return data.result.response;
                } else if (data.result && data.result.response) {
                    return data.result.response;
                } else if (Array.isArray(data) && data.length > 0) {
                    return typeof data[0] === 'string' ? data[0] : JSON.stringify(data[0]);
                }
                return JSON.stringify(data);
            } catch (e) {
                // If not JSON, return as plain text
                return responseText || 'No response received';
            }
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }

    parseSSE(text) {
        // Parse Server-Sent Events format
        const lines = text.split('\n');
        let fullResponse = '';
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data:')) {
                try {
                    // Remove 'data: ' or 'data:' prefix
                    let jsonStr = trimmedLine.substring(5).trim();
                    if (jsonStr) {
                        const data = JSON.parse(jsonStr);
                        if (typeof data === 'string') {
                            fullResponse += data;
                        } else if (data.content) {
                            fullResponse += data.content;
                        } else if (data.response) {
                            fullResponse += data.response;
                        }
                    }
                } catch (e) {
                    console.error('Error parsing SSE line:', e);
                }
            }
        }
        return fullResponse || text;
    }

    addThinkingIndicator() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'chat-message assistant thinking';
        thinkingDiv.innerHTML = `
            <div class="thinking-indicator">
                <span>🤔</span>
                <span class="thinking-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
            <div class="thinking-text">AI is thinking...</div>
        `;
        this.chatMessages.appendChild(thinkingDiv);
        this.scrollToBottom();
    }

    renderMessages() {
        this.chatMessages.innerHTML = '';
        this.messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${message.role}`;
            messageDiv.textContent = message.content;
            this.chatMessages.appendChild(messageDiv);
        });
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});