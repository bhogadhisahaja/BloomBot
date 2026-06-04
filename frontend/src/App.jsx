import { useState, useRef, useEffect } from "react"
import axios from "axios"

const SUGGESTED_QUESTIONS = [
  "What bouquets do you offer? 💐",
  "How can I customize my order?",
  "What are your prices?",
  "Do you offer wedding arrangements?",
  "How long does delivery take?",
]

const TypingDots = () => (
  <div className="typing-indicator">
    <span></span><span></span><span></span>
  </div>
)

const FlowerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 10 5 10 7C10 8.1 10.9 9 12 9C13.1 9 14 8.1 14 7C14 5 12 2 12 2Z" fill="currentColor" opacity="0.8"/>
    <path d="M12 22C12 22 10 19 10 17C10 15.9 10.9 15 12 15C13.1 15 14 15.9 14 17C14 19 12 22 12 22Z" fill="currentColor" opacity="0.8"/>
    <path d="M2 12C2 12 5 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14C5 14 2 12 2 12Z" fill="currentColor" opacity="0.8"/>
    <path d="M22 12C22 12 19 10 17 10C15.9 10 15 10.9 15 12C15 13.1 15.9 14 17 14C19 14 22 12 22 12Z" fill="currentColor" opacity="0.8"/>
    <path d="M4.93 4.93C4.93 4.93 6.34 8.17 7.76 9.59C8.54 10.37 9.63 10.37 10.41 9.59C11.19 8.81 11.19 7.72 10.41 6.94C8.99 5.52 4.93 4.93 4.93 4.93Z" fill="currentColor" opacity="0.6"/>
    <path d="M19.07 19.07C19.07 19.07 17.66 15.83 16.24 14.41C15.46 13.63 14.37 13.63 13.59 14.41C12.81 15.19 12.81 16.28 13.59 17.06C15.01 18.48 19.07 19.07 19.07 19.07Z" fill="currentColor" opacity="0.6"/>
    <path d="M4.93 19.07C4.93 19.07 8.17 17.66 9.59 16.24C10.37 15.46 10.37 14.37 9.59 13.59C8.81 12.81 7.72 12.81 6.94 13.59C5.52 15.01 4.93 19.07 4.93 19.07Z" fill="currentColor" opacity="0.6"/>
    <path d="M19.07 4.93C19.07 4.93 15.83 6.34 14.41 7.76C13.63 8.54 13.63 9.63 14.41 10.41C15.19 11.19 16.28 11.19 17.06 10.41C18.48 8.99 19.07 4.93 19.07 4.93Z" fill="currentColor" opacity="0.6"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
  </svg>
)

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi there! 🌸 I'm Bloom, your Twistnbloom assistant. I'm here to help you explore our handmade pipe cleaner floral gifts — from custom bouquets to home décor. What can I help you with today?",
    }
  ])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const msgText = (text || message).trim()
    if (!msgText) return

    const updatedMessages = [...messages, { role: "user", text: msgText }]
    setMessages(updatedMessages)
    setMessage("")
    setLoading(true)
    setShowSuggestions(false)

    // Build history to send (exclude the current message, send prior turns)
    const historyToSend = messages.map(m => ({ role: m.role, text: m.text }))

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: msgText,
        history: historyToSend
      })
      setMessages([...updatedMessages, { role: "assistant", text: response.data.response }])
    } catch {
      setMessages([...updatedMessages, {
        role: "assistant",
        text: "Oops! Something went wrong on my end 🌷 Please try again in a moment, or reach us on Instagram @_twistnbloom.co"
      }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --blush:      #f9e8e8;
          --rose:       #e8b4b8;
          --deep-rose:  #c97d84;
          --petal:      #f2d0d3;
          --sage:       #b5c4b1;
          --cream:      #fdf6f0;
          --soft-brown: #8b6f6f;
          --warm-white: #fefaf8;
          --text-dark:  #3d2b2b;
          --text-mid:   #7a5c5c;
          --text-light: #b89090;
          --shadow:     rgba(201, 125, 132, 0.15);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 0%, rgba(249,232,232,0.9) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 100%, rgba(232,180,184,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(181,196,177,0.15) 0%, transparent 70%),
            #fdf6f0;
        }

        .petal-deco {
          position: fixed; pointer-events: none; z-index: 0; opacity: 0.07;
          font-size: 120px; line-height: 1; user-select: none;
        }
        .petal-deco.tl { top: -20px; left: -20px; transform: rotate(-20deg); }
        .petal-deco.br { bottom: -20px; right: -20px; transform: rotate(160deg); }

        .chat-wrapper {
          position: relative; z-index: 1;
          width: 100%; max-width: 760px;
          height: 100vh; max-height: 780px;
          display: flex; flex-direction: column;
          border-radius: 28px;
          background: rgba(255,252,250,0.92);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 40px var(--shadow), 0 0 0 1px rgba(232,180,184,0.25), inset 0 1px 0 rgba(255,255,255,0.8);
          overflow: hidden;
          margin: 0 16px;
        }

        .chat-header {
          background: linear-gradient(135deg, #e8b4b8 0%, #d4898f 50%, #c97d84 100%);
          padding: 20px 24px;
          display: flex; align-items: center; gap: 14px;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .chat-header::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .avatar {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          color: white; flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          border: 2px solid rgba(255,255,255,0.4);
        }
        .header-info { flex: 1; }
        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 500;
          color: white; letter-spacing: 0.3px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .header-sub {
          font-size: 12px; color: rgba(255,255,255,0.8);
          margin-top: 2px; font-weight: 300;
          display: flex; align-items: center; gap: 5px;
        }
        .online-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #7ee8a2;
          box-shadow: 0 0 0 2px rgba(126,232,162,0.3);
          animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green { 0%,100%{opacity:1}50%{opacity:0.5} }
        .header-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px; color: rgba(255,255,255,0.75);
          font-style: italic; letter-spacing: 1px;
        }

        .messages-area {
          flex: 1; overflow-y: auto;
          padding: 20px 20px 8px;
          display: flex; flex-direction: column; gap: 12px;
          scroll-behavior: smooth;
        }
        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 4px; }

        .msg-row {
          display: flex; gap: 10px; align-items: flex-end;
          animation: fadeUp 0.3s ease;
        }
        .msg-row.user { flex-direction: row-reverse; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, var(--rose), var(--deep-rose));
          display: flex; align-items: center; justify-content: center;
          color: white; flex-shrink: 0; font-size: 13px;
          box-shadow: 0 2px 8px var(--shadow);
        }
        .msg-row.user .msg-avatar { background: linear-gradient(135deg, var(--sage), #8ea88a); }

        .msg-bubble {
          max-width: 72%; padding: 11px 16px;
          border-radius: 18px; font-size: 14px; line-height: 1.65;
          color: var(--text-dark); position: relative;
          white-space: pre-wrap; word-break: break-word;
        }
        .msg-row.assistant .msg-bubble {
          background: white;
          box-shadow: 0 1px 12px var(--shadow), 0 0 0 1px rgba(232,180,184,0.12);
          border-bottom-left-radius: 5px;
        }
        .msg-row.user .msg-bubble {
          background: linear-gradient(135deg, #d4898f, #c97d84);
          color: white;
          box-shadow: 0 2px 12px rgba(201,125,132,0.3);
          border-bottom-right-radius: 5px;
        }

        .typing-indicator { display: flex; align-items: center; gap: 4px; padding: 4px 2px; }
        .typing-indicator span {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--deep-rose); opacity: 0.5;
          animation: bounce 1.2s infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%,60%,100%{transform:translateY(0);opacity:0.5}
          30%{transform:translateY(-6px);opacity:1}
        }

        .suggestions-wrap {
          padding: 0 20px 12px;
          display: flex; flex-wrap: wrap; gap: 7px;
          animation: fadeUp 0.4s ease 0.2s both; flex-shrink: 0;
        }
        .suggestion-chip {
          font-size: 12px; padding: 6px 13px;
          border-radius: 20px; cursor: pointer;
          background: white; color: var(--deep-rose);
          border: 1.5px solid var(--rose);
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .suggestion-chip:hover {
          background: var(--blush); border-color: var(--deep-rose);
          transform: translateY(-1px); box-shadow: 0 3px 10px var(--shadow);
        }

        .input-area {
          padding: 12px 16px 16px;
          background: rgba(255,252,250,0.95);
          border-top: 1px solid rgba(232,180,184,0.2);
          flex-shrink: 0;
        }
        .input-row {
          display: flex; gap: 10px; align-items: flex-end;
          background: white; border-radius: 20px;
          padding: 8px 8px 8px 16px;
          box-shadow: 0 1px 16px var(--shadow), 0 0 0 1.5px rgba(232,180,184,0.25);
          transition: box-shadow 0.2s;
        }
        .input-row:focus-within {
          box-shadow: 0 2px 20px var(--shadow), 0 0 0 2px var(--rose);
        }
        .msg-input {
          flex: 1; border: none; outline: none; resize: none;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: var(--text-dark); background: transparent;
          max-height: 100px; line-height: 1.5; padding: 4px 0;
        }
        .msg-input::placeholder { color: var(--text-light); }

        .send-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: none; cursor: pointer; flex-shrink: 0;
          background: linear-gradient(135deg, var(--rose), var(--deep-rose));
          color: white; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(201,125,132,0.35);
        }
        .send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 14px rgba(201,125,132,0.5); }
        .send-btn:active { transform: scale(0.95); }
        .send-btn:disabled { opacity: 0.5; cursor: default; transform: none; }

        .input-hint {
          font-size: 11px; color: var(--text-light);
          text-align: center; margin-top: 7px; letter-spacing: 0.2px;
        }

        .date-divider {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; color: var(--text-light);
          letter-spacing: 0.5px; text-transform: uppercase; margin: 4px 0;
        }
        .date-divider::before, .date-divider::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, var(--rose), transparent);
        }

        @media (max-width: 500px) {
          .chat-wrapper { border-radius: 0; margin: 0; max-height: 100vh; height: 100vh; }
          .msg-bubble { max-width: 85%; font-size: 13px; }
          .header-title { font-size: 18px; }
        }
      `}</style>

      <div className="page-bg" />
      <div className="petal-deco tl">🌸</div>
      <div className="petal-deco br">🌺</div>

      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="avatar"><FlowerIcon /></div>
          <div className="header-info">
            <div className="header-title">Bloom</div>
            <div className="header-sub">
              <span className="online-dot" />
              Twistnbloom AI Assistant
            </div>
          </div>
          <div className="header-brand">twistnbloom.co</div>
        </div>

        <div className="messages-area">
          <div className="date-divider">Handmade with love ✦</div>

          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role}`}>
              <div className="msg-avatar">
                {msg.role === "assistant" ? "🌸" : "✦"}
              </div>
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}

          {loading && (
            <div className="msg-row assistant">
              <div className="msg-avatar">🌸</div>
              <div className="msg-bubble"><TypingDots /></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showSuggestions && (
          <div className="suggestions-wrap">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button key={i} className="suggestion-chip" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="input-area">
          <div className="input-row">
            <textarea
              ref={inputRef}
              className="msg-input"
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about bouquets, prices, custom orders..."
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !message.trim()}
            >
              <SendIcon />
            </button>
          </div>
          <div className="input-hint">Press Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </>
  )
}
