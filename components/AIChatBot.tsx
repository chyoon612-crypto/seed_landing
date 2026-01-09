
import React, { useState, useRef, useEffect } from 'react';
import { getProgramRecommendation } from '../services/geminiService';
import { Message } from '../types';

const AIChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '안녕하세요! 다가치나눔교육플랫폼 씨드입니다. 어떤 교육 프로그램에 대해 궁금하신가요?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getProgramRecommendation(input);
    const aiMsg: Message = { role: 'model', text: response || '답변을 생성하는 중에 오류가 발생했습니다.' };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[500px] border border-gray-100">
      <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
        <h3 className="font-bold flex items-center">
          <span className="mr-2">🌱</span>
          씨드 AI 맞춤 추천
        </h3>
        <span className="text-xs bg-emerald-500 px-2 py-1 rounded-full">실시간 상담</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user' 
              ? 'bg-emerald-600 text-white rounded-br-none' 
              : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-400 rounded-2xl px-4 py-3 text-sm animate-pulse border border-gray-100">
              씨드가 생각하는 중...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="관심 있는 교육 분야를 말씀해주세요..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChatBot;
