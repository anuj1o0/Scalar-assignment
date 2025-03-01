import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PaperAirplaneIcon, SparklesIcon, CodeBracketIcon, CommandLineIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import BotIllustration from './BotIllustration';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !problemUrl.trim() || isLoading) return;

    const newUserMessage = {
      content: input,
      isBot: false,
      problemUrl
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        problemUrl,
        messages: [...messages, newUserMessage]
      });

      const botMessage = {
        content: response.data.reply,
        isBot: true
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: 'Error getting response. Please try again.',
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative group">
          <div className="absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <CodeBracketIcon className="w-4 h-4" />
            </button>
          </div>
          <SyntaxHighlighter
            style={oneLight}
            language={match[1]}
            PreTag="div"
            className="rounded-lg border border-gray-200 p-4 text-sm"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 px-2 py-1 rounded-md text-blue-600 font-mono">
          {children}
        </code>
      );
    },
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2 text-gray-800">
        <CommandLineIcon className="w-5 h-5 text-blue-600" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mt-4 mb-2 flex items-center gap-2 text-gray-700">
        <ListBulletIcon className="w-4 h-4 text-purple-600" />
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 marker:text-blue-600 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 marker:text-blue-600 text-gray-700">
        {children}
      </ol>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-spacing-0 my-4 border border-gray-200">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 bg-gray-100 text-left border-b border-gray-200 font-medium text-gray-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border-b border-gray-200 text-gray-700">{children}</td>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+DQo8L3N2Zz4=')] bg-[length:50px_50px] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col h-screen relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-5xl mx-auto w-full h-full flex flex-col gap-6"
        >
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full" 
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  <SparklesIcon className="h-6 w-6 text-blue-600 z-10" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 relative">
                    DSA Mentor
                    {/* <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    /> */}
                  </h1>
                  <p className="text-xs text-gray-500">Your algorithmic companion</p>
                </div>
              </motion.div>
              
              <motion.button
                onClick={() => setMessages([])}
                className="px-4 py-2 relative overflow-hidden rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                New Chat
              </motion.button>
            </div>
          </motion.header>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="flex-1 overflow-y-auto rounded-xl bg-white border border-gray-200 shadow-sm"
          >
            <div className="h-full p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center h-full space-y-8 text-center py-12"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -3, 3, -3, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full filter blur-xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      />
                      <BotIllustration className="w-48 h-48 text-blue-600 relative z-10" />
                    </motion.div>
                    
                    <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl font-bold text-gray-800">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          Get{" "}
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                        >
                          Unstuck{" "}
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                        >
                          Faster
                        </motion.span>
                      </h2>
                      <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                      >
                        Paste a LeetCode URL and ask any question about algorithms, time complexity, or coding approaches
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="flex justify-center"
                      >
                        <span className="text-blue-600 text-sm flex items-center gap-2">
                          <motion.span 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ↓
                          </motion.span> 
                          Start below 
                          <motion.span 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ↓
                          </motion.span>
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-6`}
                  >
                    <div
                      className={`max-w-sm md:max-w-lg lg:max-w-2xl p-5 rounded-lg ${
                        msg.isBot
                          ? 'bg-gray-100 border border-gray-200 text-gray-800'
                          : 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm'
                      } transition-all duration-200`}
                    >
                      {msg.problemUrl && !msg.isBot && (
                        <div className="text-sm opacity-90 mb-3 bg-white/20 p-2 rounded-lg">
                          <span className="font-medium">Problem: </span>
                          <a
                            href={msg.problemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-100 transition-colors"
                          >
                            {msg.problemUrl}
                          </a>
                        </div>
                      )}
                      <div className={`prose ${msg.isBot ? 'prose-blue' : 'prose-invert'} max-w-none ${msg.isBot ? 'prose-pre:bg-white prose-pre:border prose-pre:border-gray-200' : ''}`}>
                        <ReactMarkdown
                          components={MarkdownComponents}
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-md p-4 rounded-lg bg-gray-100 border border-gray-200 shadow-sm">
                      <div className="flex space-x-3">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-blue-500 rounded-full"
                            animate={{
                              y: [0, -8, 0],
                              opacity: [0.5, 1, 0.5],
                              backgroundColor: [
                                "rgb(59, 130, 246)", // blue-500
                                "rgb(147, 51, 234)", // purple-600
                                "rgb(59, 130, 246)" // blue-500
                              ]
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.15
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </motion.div>

          {/* Input Area */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <motion.div 
                className="relative flex-1 md:w-2/5 group"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <input
                  type="url"
                  value={problemUrl}
                  onChange={(e) => setProblemUrl(e.target.value)}
                  placeholder="LeetCode Problem URL"
                  className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm transition-all"
                  required
                />
              </motion.div>
              
              <div className="flex flex-1 gap-2">
                <motion.div 
                  className="relative flex-1 group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your doubt..."
                    className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm transition-all"
                    disabled={isLoading}
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="p-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <PaperAirplaneIcon className="h-6 w-6 text-white" />
                </motion.button>
              </div>
            </div>
            
            <motion.div 
              className="mt-4 text-center"
            >
              <p className="text-xs text-gray-400">
                Powered by GPT-4 • Your algorithmic challenges solved with AI
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatWindow;