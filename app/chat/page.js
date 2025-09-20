// app/chat/page.js
'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { callGemini } from '@/lib/ai';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'नमस्ते! मैं आपका कृषि मित्र हूँ। मैं आपकी खेती से जुड़ी किसी भी समस्या में मदद कर सकता हूँ।' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setMessages(prev => [...prev, { sender: 'ai', text: '...' }]);

    const prompt = `आप एक कृषि विशेषज्ञ हैं। किसान ने पूछा: "${userMessage}"। सरल हिंदी में उत्तर दें।`;
    const response = await callGemini(prompt);

    setMessages(prev => prev.slice(0, -1)); // remove ...
    setMessages(prev => [...prev, { sender: 'ai', text: response }]);
  };

  const handleMicClick = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col h-screen">
      <div className="mb-4">
        <Link href="/" className="text-green-600 hover:text-green-800 flex items-center">
          ← वापस डैशबोर्ड
        </Link>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
          🤖
        </div>
        <div>
          <h1 className="text-xl font-bold">कृषि मित्र</h1>
          <p className="text-sm text-gray-500">आपका व्यक्तिगत AI सहायक</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-xl mb-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="पूछें... जैसे: टमाटर की फसल के लिए क्या खाद डालूं?"
          className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleMicClick}
          className={`px-4 bg-gray-200 hover:bg-gray-300 transition ${isListening ? 'text-red-500 animate-pulse' : ''}`}
        >
          🎤
        </button>
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
