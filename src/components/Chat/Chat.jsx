import ReactMarkdown from "react-markdown";
import styles from "./Chat.module.css";
import { useEffect, useRef, useState } from "react";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: `🤑 **Hey there! Welcome to PocketPal** 🎒💰  
I’m **Pally**, your personal finance buddy! I can help you: 
💰 **Plan your budget** based on your expenses 
📊 **Track your spending** to see where your money goes 
💡 **Find smart ways to save** without missing out on fun!  
Just ask me anything about money, savings, or spending, and I’ve got you! 🚀🔥`,
};

export function Chat({ messages }) {
  const chatRef = useRef(null);
  const [bitmojiState, setBitmojiState] = useState("/normal_state.png");

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        setBitmojiState("/thinking_state.png"); // AI is "thinking"
      } else {
        setBitmojiState("/normal_state.png"); // AI has responded
      }
    }
  }, [messages]);

  useEffect(() => {
    if (chatRef.current) {
      const lastMessage = chatRef.current.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [messages]);

  return (
    <div className={styles.ChatContainer}>
      <div ref={chatRef} className={styles.Chat}>
        {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
          <div key={index} className={styles.MessageWrapper} data-role={role}>
            <div className={styles.Name}>
              {role === "user" ? "User" : "Pally"}
            </div>
            <div className={styles.Message}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamically changing Bitmoji */}
      <img
        src={bitmojiState}
        alt="Squirrel Bitmoji"
        className={styles.Bitmoji}
      />
    </div>
  );
}
