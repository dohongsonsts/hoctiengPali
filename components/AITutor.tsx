
import React, { useState, useRef, useEffect } from 'react';
import { askTutor } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Chào mừng bạn đến với PāliSikkhā! Tôi là trợ lý AI chuyên về tiếng Pāli. Bạn muốn tìm hiểu gì hôm nay? (Ví dụ: "Giải thích cách chia động từ", "Pāli có bao nhiêu nguyên âm?", ...)' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const answer = await askTutor(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: answer || "Xin lỗi, tôi gặp chút trục trặc." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Tôi không thể trả lời lúc này. Vui lòng thử lại sau." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[70vh] flex flex-col bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <div className="bg-orange-600 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <i className="fas fa-user-graduate"></i>
        </div>
        <div>
          <h3 className="font-bold">Giảng sư Pāli AI</h3>
          <p className="text-xs text-orange-100">Luôn sẵn sàng giải đáp thắc mắc</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-orange-500 text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
            }`}>
              <div className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Hỏi về ngữ pháp, từ vựng hoặc kinh điển..."
          className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          className="w-12 h-12 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center disabled:bg-gray-400"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default AITutor;
