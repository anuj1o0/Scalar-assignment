import React from "react";
import { motion } from "framer-motion";

const MessageBubble = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-xs rounded-2xl px-4 py-2 text-white ${
          isUser ? "bg-blue-500" : "bg-gray-700"
        }`}
      >
        {message}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
