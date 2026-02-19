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
        console.log("User message added:", userMessage);
        this.chatInput.value = "";
        this.renderMessages();
        this.isThinking = true;

        // Add thinking indicator
        this.addThinkingIndicator();

        try {
            const aiResponse = await this.sendToAPI([...this.messages]);
            console.log("AI response received:", aiResponse);
            console.log("AI response length:", aiResponse ? aiResponse.length : 0);
            
            if (aiResponse && aiResponse.trim() !== '') {
                const assistantMessage = { role: "assistant", content: aiResponse };
                this.messages.push(assistantMessage);
                console.log("Assistant message added to messages:", assistantMessage);
                console.log("Total messages now:", this.messages.length);
            } else {
                console.warn("Empty AI response received:", aiResponse);
                this.messages.push({ role: "assistant", content: "Sorry, I received an empty response. Please try again." });
            }
        } catch (error) {
            console.error("Error in sendMessage:", error);
            this.messages.push({ role: "assistant", content: "Sorry, I encountered an error. Please try again." });
        } finally {
            this.isThinking = false;
            console.log("About to render messages. Total messages:", this.messages.length);
            this.renderMessages();
        }
    }

    async sendToAPI(messages) {
        try {
            console.log("Sending request to API with", messages.length, "messages");
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
            console.log("Raw response received, length:", responseText.length);
            console.log("Raw response first 300 chars:", responseText.substring(0, 300));
            
            // Check if it's SSE format (starts with "data: ")
            if (responseText.trim().startsWith('data:')) {
                console.log("Detected SSE format, parsing...");
                const result = this.parseSSE(responseText);
                console.log("parseSSE returned:", result);
                console.log("Result length:", result ? result.length : 0);
                console.log("Result is empty?", !result || result.trim() === '');
                return result;
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
        // Parse Server-Sent Events format from Cloudflare AI
        let fullResponse = '';
        
        // Split by 'data:' to handle each chunk
        const parts = text.split('data:');
        console.log("Total parts after split:", parts.length);
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            
            // Skip empty parts
            if (!part) {
                console.log("Skipping empty part at index", i);
                continue;
            }
            
            // Skip the [DONE] marker and any non-JSON parts
            if (part === '[DONE]' || part.startsWith('[DONE]') || !part.startsWith('{')) {
                console.log("Skipping non-JSON part at index", i, ":", part.substring(0, 50));
                continue;
            }
            
            try {
                // Try to parse as JSON
                const data = JSON.parse(part);
                console.log("Successfully parsed chunk", i);
                
                // Extract response field
                if (data.response !== undefined && data.response !== null) {
                    console.log("Adding response:", JSON.stringify(data.response));
                    fullResponse += data.response;
                }
            } catch (e) {
                console.error('Error parsing chunk at index', i, ':', part.substring(0, 50), e.message);
            }
        }
        
        const result = fullResponse.trim() || 'No response received';
        console.log("Final accumulated response:", result);
        console.log("Response length:", result.length);
        return result;
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
        console.log("renderMessages called with", this.messages.length, "messages");
        this.chatMessages.innerHTML = '';
        this.messages.forEach((message, index) => {
            console.log("Rendering message", index, ":", message.role, "-", message.content.substring(0, 50));
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${message.role}`;
            messageDiv.textContent = message.content;
            this.chatMessages.appendChild(messageDiv);
        });
        this.scrollToBottom();
        console.log("renderMessages complete. DOM has", this.chatMessages.children.length, "children");
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});