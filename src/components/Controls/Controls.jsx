import { useState, useEffect, useRef } from "react";
import styles from "./Controls.module.css";

export function Controls({ onSend }) {
  const [content, setContent] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
      textAreaRef.current?.focus();
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea
          ref={textAreaRef}
          className={styles.TextArea}
          placeholder="Message Pally"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
          autoFocus
        />
      </div>
      <button className={styles.Button} onClick={handleContentSend}>
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
