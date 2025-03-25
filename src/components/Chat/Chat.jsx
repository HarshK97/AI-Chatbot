//
// const WELCOME_MESSAGE = {
//   role: "assistant",
//   content: "Hello! How can I help you today?",
// };
//
// export function Chat({ messages }) {
//   return (
//     <div className={styles.Chat}>
//       {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
//         <div key={index} className={styles.Message} data-role={role}>
//           {content}
//         </div>
//       ))}
//     </div>
//   );
// }

import ReactMarkdown from "react-markdown";
import styles from "./Chat.module.css";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: `**Hello! Welcome to PocketPal 🎒💰**  

I can help you with:  
- 📊 **Generating a budget plan** tailored to your expenses  
- 📉 **Analyzing your spending** to find ways to save  
- 💡 **Providing financial tips** to manage money better  

Just type what you need help with! 🚀`,
};

export function Chat({ messages }) {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div key={index} className={styles.Message} data-role={role}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
