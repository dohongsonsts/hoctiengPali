
import React, { useState, useEffect, useRef } from 'react';
import { PaliVerse, TypedHistoryItem } from '../types';
import { PALI_DIACRITICS, PALI_VERSES } from '../constants';
import { speakPali, getReadingInstruction } from '../services/geminiService';

interface TypingPracticeProps {
  verses?: PaliVerse[];
  history: TypedHistoryItem[];
  onWordComplete?: (wordId: string) => void;
}

const TypingPractice: React.FC<TypingPracticeProps> = ({ verses = PALI_VERSES, history, onWordComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showReadingHelp, setShowReadingHelp] = useState(false);
  const [readingHelp, setReadingHelp] = useState<string | null>(null);
  const [isLoadingHelp, setIsLoadingHelp] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentVerse = verses[currentIndex] || PALI_VERSES[0];

  // Tập trung vào ô nhập liệu khi click vào vùng hiển thị
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    // Giới hạn độ dài nhập liệu bằng độ dài câu gốc
    if (val.length <= currentVerse.text.length) {
      setInput(val);
      
      if (val === currentVerse.text) {
        handleSuccess();
      }
    }
  };

  const handleSuccess = () => {
    if (onWordComplete) {
      onWordComplete(currentVerse.id);
    }
    // Hiệu ứng hoàn thành nhẹ nhàng
    setTimeout(() => {
      nextVerse();
    }, 1200);
  };

  const nextVerse = () => {
    setCurrentIndex((prev) => (prev + 1) % verses.length);
    setInput('');
    setReadingHelp(null);
    setShowReadingHelp(false);
  };

  const handleGetHelp = async () => {
    if (readingHelp) {
      setShowReadingHelp(!showReadingHelp);
      return;
    }
    setIsLoadingHelp(true);
    try {
      const help = await getReadingInstruction(currentVerse.text);
      setReadingHelp(help);
      setShowReadingHelp(true);
    } catch (e) {
      setReadingHelp("Không thể tải hướng dẫn đọc.");
    } finally {
      setIsLoadingHelp(false);
    }
  };

  const insertChar = (char: string) => {
    const newVal = input + char;
    if (newVal.length <= currentVerse.text.length) {
      setInput(newVal);
      if (newVal === currentVerse.text) handleSuccess();
    }
    inputRef.current?.focus();
  };

  // Render ký tự với màu sắc tương ứng - Tăng cường độ tương phản
  const renderTypingArea = () => {
    return (
      <div 
        onClick={focusInput}
        className="relative min-h-[160px] p-8 md:p-10 bg-white rounded-[2rem] border-2 border-orange-100 shadow-inner cursor-text group hover:border-orange-300 transition-all flex items-center justify-center"
      >
        <div className="serif-font text-3xl md:text-5xl leading-relaxed tracking-wide text-gray-800 flex flex-wrap justify-center gap-x-1 gap-y-3">
          {currentVerse.text.split('').map((char, index) => {
            let state = 'idle'; // Chưa gõ
            if (index < input.length) {
              state = input[index] === char ? 'correct' : 'wrong';
            } else if (index === input.length) {
              state = 'active'; // Vị trí hiện tại
            }

            return (
              <span 
                key={index} 
                className={`relative inline-block min-w-[0.6rem] transition-all duration-150 px-0.5 rounded ${
                  state === 'correct' ? 'text-emerald-700 bg-emerald-50 font-bold drop-shadow-sm' :
                  state === 'wrong' ? 'text-white bg-rose-500 font-bold shadow-md' :
                  state === 'active' ? 'text-orange-600 border-b-4 border-orange-400 bg-orange-50 animate-pulse' :
                  'text-gray-300 opacity-60'
                }`}
              >
                {char}
                {/* Nếu gõ sai, hiển thị ký tự người dùng đã gõ mờ ở phía trên để đối chiếu */}
                {state === 'wrong' && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-sans text-rose-400 bg-white px-1.5 py-0.5 rounded-full border border-rose-100 shadow-sm font-bold whitespace-nowrap">
                    Bạn gõ: {input[index]}
                  </span>
                )}
              </span>
            );
          })}
        </div>
        
        {/* Input thật ẩn bên dưới nhưng vẫn nhận sự kiện */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-default resize-none overflow-hidden"
          spellCheck={false}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
      <div className="bg-white rounded-[3.5rem] shadow-2xl border border-orange-50 p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-orange-100/20 text-9xl pointer-events-none">
          <i className="fas fa-dharmachakra"></i>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-100 text-orange-700 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
              {currentVerse.source}
            </span>
            <span className="bg-amber-100 text-amber-700 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
              Level {currentVerse.level}
            </span>
          </div>
          
          {/* Vùng luyện gõ chính */}
          <div className="w-full max-w-3xl mb-10">
            {renderTypingArea()}
            <p className="mt-6 text-gray-400 text-xs font-medium italic">
              <i className="fas fa-info-circle mr-1"></i> Gõ trực tiếp vào khung trên. Ký tự <span className="text-emerald-600 font-bold">đúng (Xanh)</span>, ký tự <span className="text-rose-500 font-bold">sai (Đỏ)</span>.
            </p>
          </div>
          
          <p className="text-2xl text-orange-800 font-semibold mb-10 italic serif-font max-w-2xl leading-relaxed">
            "{currentVerse.meaning}"
          </p>

          <div className="flex gap-4 mb-12">
            <button 
              onClick={() => speakPali(currentVerse.text)}
              className="group flex items-center gap-3 bg-white text-orange-600 px-6 py-3 rounded-2xl shadow-md border border-orange-100 hover:bg-orange-600 hover:text-white transition-all transform hover:-translate-y-1"
            >
              <i className="fas fa-volume-up text-xl"></i>
              <span className="font-bold text-sm uppercase tracking-widest">Phát âm AI</span>
            </button>
            <button 
              onClick={handleGetHelp}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-md border transition-all transform hover:-translate-y-1 ${
                showReadingHelp ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-500 hover:text-white'
              }`}
            >
              {isLoadingHelp ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-graduation-cap text-xl"></i>}
              <span className="font-bold text-sm uppercase tracking-widest">Phân tích §</span>
            </button>
          </div>

          {showReadingHelp && readingHelp && (
            <div className="w-full max-w-2xl mb-10 p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 text-left animate-fade-in shadow-inner relative">
               <div className="absolute top-4 right-6 text-amber-200 text-4xl"><i className="fas fa-quote-right"></i></div>
              <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-4">Hướng dẫn chi tiết giáo trình:</h4>
              <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line serif-font">{readingHelp}</div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {PALI_DIACRITICS.map(char => (
              <button
                key={char}
                onClick={() => insertChar(char)}
                className="w-10 h-10 md:w-12 md:h-12 bg-white border border-orange-100 rounded-xl text-gray-700 font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm text-lg"
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-orange-50 pt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>Tiến độ bài kệ: {currentIndex + 1} / {verses.length}</span>
          <div className="flex gap-6">
             <button onClick={() => setCurrentIndex(prev => (prev - 1 + verses.length) % verses.length)} className="hover:text-orange-600 transition-colors">
                <i className="fas fa-chevron-left mr-2"></i> Bài trước
             </button>
             <button onClick={nextVerse} className="text-orange-600 hover:opacity-70 transition-opacity">
                Bài kế tiếp <i className="fas fa-chevron-right ml-2"></i>
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl border border-orange-100 overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-orange-800 to-orange-950 text-white flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
              <i className="fas fa-pen-nib"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold serif-font">Nhật ký Luyện tâm</h3>
              <p className="text-[10px] text-orange-200 uppercase tracking-widest">Những bài kệ đã khắc ghi vào tâm thức</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-4xl font-bold text-orange-300/50 serif-font">#{history.length}</span>
          </div>
        </div>

        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
          {history.length > 0 ? (
            <div className="p-8 space-y-4">
              {history.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-6 p-5 rounded-[2rem] bg-orange-50/40 border border-orange-100 group transition-all hover:bg-white hover:shadow-lg hover:scale-[1.01]">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold shrink-0 shadow-inner">
                    {history.length - idx}
                  </div>
                  <div className="flex-1">
                    <p className="serif-font text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-700 transition-colors">{item.word}</p>
                    <p className="text-sm text-gray-500 italic font-medium">"{item.meaning}"</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                      {new Date(item.timestamp).toLocaleTimeString('vi-VN')}
                    </span>
                    <button onClick={() => speakPali(item.word)} className="w-10 h-10 rounded-full bg-white text-orange-300 hover:text-orange-600 hover:shadow-md transition-all">
                      <i className="fas fa-volume-up"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-6">
              <div className="relative inline-block">
                <i className="fas fa-keyboard text-8xl text-orange-50"></i>
                <i className="fas fa-heart text-2xl text-orange-200 absolute bottom-0 right-0 animate-bounce"></i>
              </div>
              <p className="text-gray-400 italic text-lg serif-font">Hãy bắt đầu gõ những dòng kệ đầu tiên để lưu giữ tiến độ.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
