import { useState } from "react"

function ChatBox() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! 👋 I'm ShopIQ, your AI shopping assistant. What can I help you find today?" }
  ])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) return

    const userMsg = { sender: "user", text: message }
    setMessages(prev => [...prev, userMsg])
    setMessage("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      })

      const data = await response.json()
      const botMsg = { 
        sender: "bot", 
        text: data.reply || "I'm having trouble processing your request. Please try again."
      }
      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      const botMsg = { 
        sender: "bot", 
        text: "Sorry, I couldn't connect to the AI service. Please make sure the backend is running."
      }
      setMessages(prev => [...prev, botMsg])
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="glass-card chatbox">

      <div className="chat-messages">

        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="bot-msg">Thinking...</div>}

      </div>

      <form onSubmit={sendMessage} className="chat-input">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask ShopIQ anything..."
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>

      </form>

    </div>
  )
}

export default ChatBox