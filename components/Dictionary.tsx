
import React, { useState } from 'react';
import { translatePali, speakPali, getReadingInstruction } from '../services/geminiService';
// Fix: Import ALL_WORDS instead of non-existent INITIAL_WORDS
import { ALL_WORDS } from '../constants';

const Dictionary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [readingInstruction, setReadingInstruction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadingLoading, setIsReadingLoading] = useState(false);

  // Fix: Use ALL_WORDS and added slice for better UI performance
  const filteredLocal = ALL_WORDS.filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase()) || 
    w.meaning.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 20);

  const handleAiTranslate = async () => {
    if (!search) return;
    setIsLoading(true);
    setAiResult(null);
    try {
      const result = await translatePali(search);
      setAiResult(result || "Không thể dịch câu này.");
    } catch (err) {
      setAiResult("Lỗi khi kết nối với AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadingInstruction = async () => {
    if (!search) return;
    setIsReadingLoading(true);
    setReadingInstruction(null);
    try {
      const result = await getReadingInstruction(search);
      setReadingInstruction(result || "Không thể lấy hướng dẫn đọc.");
    } catch (err) {
      setReadingInstruction("Lỗi khi kết nối với AI.");
    } finally {
      setIsReadingLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i className="fas fa-search text-orange-500"></i>
          Tra cứu & Dịch thuật
        </h2>
        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Nhập từ hoặc câu tiếng Pāli..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-lg"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleAiTranslate}
              disabled={isLoading}
              className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 font-bold"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
              Dịch thuật AI
            </button>
            <button 
              onClick={handleReadingInstruction}
              disabled={isReadingLoading}
              className="flex-1 bg-amber-500 text-white px-4 py-3 rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 font-bold"
            >
              {isReadingLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-chalkboard-teacher"></i>}
              Dạy cách đọc
            </button>
            <button 
              onClick={() => speakPali(search)}
              className="w-14 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center text-xl"
              title="Phát âm"
            >
              <i className="fas fa-volume-up"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {readingInstruction && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 shadow-sm animate-fade-in">
            <h3 className="text-amber-800 font-bold mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
              <i className="fas fa-bullhorn"></i> Hướng dẫn đọc & Phát âm
            </h3>
            <div className="prose prose-amber max-w-none text-gray-700 whitespace-pre-line serif-font text-lg leading-relaxed">
              {readingInstruction}
            </div>
          </div>
        )}

        {aiResult && (
          <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6 shadow-sm animate-fade-in">
            <h3 className="text-orange-800 font-bold mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
              <i className="fas fa-language"></i> Nghĩa & Giải thích
            </h3>
            <div className="prose prose-orange max-w-none text-gray-700 whitespace-pre-line serif-font text-lg leading-relaxed">
              {aiResult}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLocal.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-orange-300 transition-all cursor-pointer" onClick={() => setSearch(item.word)}>
              <div className="flex justify-between items-start">
                <h4 className="serif-font text-xl font-bold text-gray-800">{item.word}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); speakPali(item.word); }}
                    className="text-gray-400 hover:text-orange-500"
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
              </div>
              <p className="text-orange-600 font-medium my-1">{item.meaning}</p>
              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 uppercase font-bold tracking-tighter">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
