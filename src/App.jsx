import styles from "./App.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from "./components/Chat/Chat";
import { useState } from "react";
import { Controls } from "./components/Controls/Controls";

const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
const gemini = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = gemini.startChat({ history: [] });

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ role: "user", content });
    try {
      const result = await chat.sendMessage(content);
      addMessage({ role: "assitant", content: result.response.text() });
    } catch (error) {
      addMessage({
        role: "system",
        content: "Sorry, I couldn't process your request. Please Try Again",
      });
    }
  }
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img src="/chatbot.png" alt="chatbot" className={styles.logo} />
        <h1 className={styles.Title}>Pal AI</h1>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
