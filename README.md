# DSA Teaching Assistant 🤖

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.17.1-green)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT_4-purple)](https://openai.com/)

An AI-powered mentor that helps students learn Data Structures & Algorithms through guided problem-solving without direct solutions.

![App Preview](./screenshot.png) <!-- Replace with actual screenshot path -->

## Features ✨

- **Guided Learning Framework**  
  Receive hints & thought-provoking questions instead of direct answers
- **LeetCode Integration**  
  Analyze problems using shared LeetCode URLs
- **Context-Aware Dialog**  
  Maintains conversation context across multiple questions
- **Interactive UI**  
  Beautiful animations & markdown support with code highlighting
- **Smart Prevention System**  
  Blocks code solutions, enforces conceptual understanding

## Tech Stack 🛠️

**Frontend**  
- React + Vite
- Tailwind CSS
- Framer Motion
- React Markdown

**Backend**  
- Node.js + Express
- OpenAI API
- RESTful API Design

## Installation 💻

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/dsa-teaching-assistant.git
cd dsa-teaching-assistant
2. Backend Setup
bash
Copy
cd server
npm install
Create .env file:

env
Copy
OPENAI_API_KEY=your_openai_key_here
PORT=5000
Start server:

bash
Copy
npm start
3. Frontend Setup
bash
Copy
cd ../client
npm install
Start development server:

bash
Copy
npm run dev
Architecture 🏗️
mermaid
Copy
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant OpenAI
    
    User->>Frontend: Submits question with LeetCode URL
    Frontend->>Backend: POST /api/chat
    Backend->>OpenAI: API request with formatted prompt
    OpenAI->>Backend: Structured response
    Backend->>Frontend: Filtered & validated answer
    Frontend->>User: Display interactive response
Usage Guide 📚
Start Session

bash
Copy
# Run both services
cd server && npm start
cd client && npm run dev
Ask Questions

Paste LeetCode URL in first input

Type your doubt in second input

Click send (⮐) button

Example Workflow

Copy
[User] How to optimize Two Sum?
[Assistant] Let's explore efficient lookups. What data structure helps 
with O(1) lookups? (Hint: Think about tradeoffs between time and space)

[User] Maybe use a hash table?
[Assistant] Good direction! How would tracking complements help? 
Let's walk through example [2,7,11,15] with target 9...
