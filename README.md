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
git clone https://github.com/anuj1o0/Scalar-assignment.git
cd Scalar-assignment
```
### 2. Backend Setup
```bash
cd gpt-backend
npm install
Start server: node index.js
```

### 3. Frontend Setup
```bash

cd ../gpt-teaching-assitant
npm install
npm run dev
```

### Usage Guide 📚

Start Session
Ask Questions
Paste LeetCode URL in first input
Type your doubt in second input
Click send (⮐) button

Example Workflow

[User] How to optimize Two Sum?
[Assistant] Let's explore efficient lookups. What data structure helps 
with O(1) lookups? (Hint: Think about tradeoffs between time and space)

[User] Maybe use a hash table?
[Assistant] Good direction! How would tracking complements help? 
Let's walk through example [2,7,11,15] with target 9...
