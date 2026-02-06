
import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../constants';

const GrammarTheory: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(GRAMMAR_LESSONS[0].id);

  const selectedLesson = GRAMMAR_LESSONS.find(l => l.id === selectedLessonId);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar - Danh sách chương mục */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="mb-6 p-6 bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl shadow-lg border border-orange-500">
          <h2 className="text-xl font-bold text-white serif-font flex items-center gap-3">
            <i className="fas fa-scroll"></i>
            Ngữ Pháp Pāli
          </h2>
          <p className="text-[10px] text-orange-100 mt-2 uppercase font-bold tracking-widest leading-tight">Giáo trình chuyên sâu<br/>Charles Duroiselle</p>
        </div>
        
        <div className="space-y-2 lg:max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
          {GRAMMAR_LESSONS.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group shadow-sm ${
                selectedLessonId === lesson.id
                  ? 'bg-orange-600 border-orange-600 text-white shadow-orange-200 translate-x-1'
                  : 'bg-white border-orange-100 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${
                  selectedLessonId === lesson.id ? 'text-orange-100' : 'text-orange-500'
                }`}>
                  {lesson.category}
                </span>
              </div>
              <span className="font-bold text-sm md:text-base leading-tight block">
                {lesson.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content - Nội dung bài học */}
      <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-orange-50 p-6 md:p-12 min-h-[600px] relative overflow-hidden">
        {/* Background Decorative Wheel */}
        <div className="absolute -top-24 -right-24 opacity-[0.03] pointer-events-none rotate-45">
          <i className="fas fa-dharmachakra text-[30rem]"></i>
        </div>

        {selectedLesson ? (
          <div className="animate-fade-in relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                {selectedLesson.category}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-orange-100 to-transparent"></div>
            </div>
            
            <h1 className="serif-font text-3xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight border-b border-orange-100 pb-6">
              {selectedLesson.title}
            </h1>

            <div className="prose prose-orange max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg serif-font space-y-6">
                {selectedLesson.content.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  
                  // Main section headings (e.g. - **Heading**)
                  if (trimmed.startsWith('- **') && trimmed.endsWith('**')) {
                     return <h3 key={i} className="text-2xl font-bold text-orange-900 mt-12 mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-orange-600 rounded-full shadow-sm"></span>
                        {trimmed.replace(/^- \*\*(.*?)\*\*/, '$1')}
                     </h3>;
                  }

                  // Main bullet points with icon
                  if (trimmed.startsWith('- **')) {
                    return (
                      <div key={i} className="flex gap-4 my-6 bg-orange-50/40 p-6 rounded-3xl border-l-8 border-orange-500 shadow-sm transition-transform hover:scale-[1.01]">
                        <span className="text-orange-600 mt-1"><i className="fas fa-bookmark text-xl"></i></span>
                        <div className="flex-1" dangerouslySetInnerHTML={{ __html: trimmed.replace(/^- \*\*(.*?)\*\*(.*)/, '<strong class="text-orange-950 font-bold text-xl block mb-2">$1</strong>$2') }} />
                      </div>
                    );
                  }

                  // Sub-bullets (italicized)
                  if (trimmed.startsWith('+ ') || trimmed.startsWith('* ')) {
                    return (
                      <div key={i} className="ml-12 my-3 flex gap-3 text-gray-600 bg-white/50 p-3 rounded-xl border border-gray-100 italic">
                        <span className="text-orange-400 font-bold text-lg">•</span>
                        <span dangerouslySetInnerHTML={{ __html: trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '<b class="text-orange-900 not-italic font-bold">$1</b>') }} />
                      </div>
                    );
                  }

                  if (trimmed === '') return <div key={i} className="h-4" />;
                  
                  // Regular text with Pāli highlighting
                  const formattedLine = trimmed
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-950 font-bold">$1</strong>')
                    .replace(/'(.*?)'/g, '<code class="bg-orange-100/50 text-orange-900 px-2.5 py-1 rounded-lg font-mono text-sm font-bold border border-orange-200/50 mx-1">$1</code>')
                    .replace(/§(\d+)/g, '<span class="text-orange-600 font-bold italic">§$1</span>');

                  return <p key={i} className="mb-4 text-justify leading-loose text-gray-800" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                })}
              </div>
            </div>
            
            {/* Detailed Footnote */}
            <div className="mt-24 pt-12 border-t border-orange-100">
              <div className="p-10 bg-gradient-to-br from-orange-50 to-white rounded-[3rem] border border-orange-100 flex flex-col md:flex-row items-center gap-10 shadow-inner">
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-lg flex items-center justify-center text-orange-600 shrink-0 border border-orange-50 transform -rotate-6">
                  <i className="fas fa-graduation-cap text-4xl"></i>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-gray-900 text-2xl mb-3 serif-font">Nguyên lý học thuật</h4>
                  <p className="text-gray-600 text-base leading-relaxed italic max-w-2xl">
                    Nội dung này được số hóa chính xác từ bản dịch kinh điển của Đại đức Thích Nhuận Đức. Hệ thống § (đoạn mã) được giữ nguyên để người học dễ dàng tra cứu đối chiếu với văn bản gốc. Hãy tập trung vào các quy tắc biến đổi âm (Sandhi) và vĩ ngữ biến cách (Vibhatti) vì đây là "chìa khóa" cốt lõi của cổ ngữ Pāli.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-200 space-y-10">
            <div className="relative">
              <i className="fas fa-book-open text-[15rem] opacity-[0.05]"></i>
              <i className="fas fa-dharmachakra text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-200/30 animate-spin-slow"></i>
            </div>
            <p className="text-3xl font-medium serif-font text-gray-400">Chọn một chương văn phạm để bắt đầu</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fdba74; border-radius: 12px; }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .prose code { color: #431407; font-weight: 700; background-color: #fff7ed; }
        .prose strong { color: #431407; }
      `}</style>
    </div>
  );
};

export default GrammarTheory;
