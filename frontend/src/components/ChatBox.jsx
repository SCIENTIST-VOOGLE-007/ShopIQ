import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { chatApi } from "../services/api"

function ChatBox() {

  const { user } = useContext(AuthContext)

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! 👋 I'm ShopIQ, your AI shopping assistant. What can I help you find today?" }
  ])
  const [loading, setLoading] = useState(false)
  const [showVoiceNote, setShowVoiceNote] = useState(false)

  const sendMessage = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) return

    const userMsg = { sender: "user", text: message }
    setMessages(prev => [...prev, userMsg])
    setMessage("")
    setLoading(true)

    try {
      // Pass user profile to AI for personalized responses
      const res = await chatApi(message, user?.profile || {})
      const data = res.data
      
      // Display the main AI response
      const botMsg = {
        sender: "bot",
        text: data.response || "I'm having trouble processing your request. Please try again.",
        recommendations: data.recommendations || [],
        understanding: data.understanding,
        suggestions: data.suggestions
      }
      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      console.error("Chat error:", error)
      const botMsg = {
        sender: "bot",
        text: `⚠️ AI Engine not available. Make sure:\n1. Python AI engine is running (python ai-engine/api.py)\n2. Ollama is running with llama3 model\n3. Restart the backend\n\nFor now, you can still search by category or view recommendations from your profile.`
      }
      setMessages(prev => [...prev, botMsg])
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="glass-card chatbox">

      <div className="chat-header" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "10px",
        paddingBottom: "10px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <h3 style={{ margin: 0 }}>ShopIQ Assistant</h3>
        <button 
          onClick={() => setShowVoiceNote(!showVoiceNote)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px"
          }}
          title="Voice feature coming soon"
        >
          🎤
        </button>
      </div>

      {showVoiceNote && (
        <div style={{
          background: "rgba(255, 193, 7, 0.1)",
          border: "1px solid rgba(255, 193, 7, 0.3)",
          borderRadius: "6px",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "12px",
          color: "#ffc107"
        }}>
          🎙️ Voice input coming soon! Type your queries for now.
        </div>
      )}

      <div className="chat-messages" style={{ minHeight: "300px" }}>

        {messages.map((msg, i) => (
          <div key={i}>
            <div className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
              {msg.text}
              
              {/* Show understanding if present */}
              {msg.understanding && (
                <div style={{ 
                  fontSize: "12px", 
                  marginTop: "8px", 
                  opacity: 0.8,
                  fontStyle: "italic"
                }}>
                  💡 {msg.understanding}
                </div>
              )}
            </div>

            {/* Show recommendations if present */}
            {msg.recommendations && msg.recommendations.length > 0 && (
              <div style={{
                background: "rgba(99, 102, 241, 0.1)",
                borderLeft: "3px solid rgba(99, 102, 241, 0.5)",
                padding: "10px",
                marginTop: "8px",
                marginBottom: "8px",
                borderRadius: "4px",
                fontSize: "12px"
              }}>
                <strong>📦 Found {msg.recommendations.length} products:</strong>
                {msg.recommendations.slice(0, 2).map((prod, idx) => (
                  <div key={idx} style={{ marginTop: "6px", paddingLeft: "10px" }}>
                    • {prod.name || prod.title} - {prod.price ? `₹${prod.price}` : ""}
                  </div>
                ))}
                {msg.recommendations.length > 2 && (
                  <div style={{ marginTop: "6px", paddingLeft: "10px", opacity: 0.7 }}>
                    + {msg.recommendations.length - 2} more products
                  </div>
                )}
              </div>
            )}

            {/* Show suggestions if present */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "10px",
                marginBottom: "10px"
              }}>
                {msg.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(sug)}
                    style={{
                      background: "rgba(99, 102, 241, 0.2)",
                      border: "1px solid rgba(99, 102, 241, 0.5)",
                      color: "inherit",
                      padding: "6px 12px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "rgba(99, 102, 241, 0.3)"}
                    onMouseLeave={(e) => e.target.style.background = "rgba(99, 102, 241, 0.2)"}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <div className="bot-msg">⏳ Thinking...</div>}

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
