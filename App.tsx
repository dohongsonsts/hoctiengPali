
import React, { useState, useEffect } from 'react';
import { AppTab, PaliWord, TypedHistoryItem, PaliVerse } from './types';
import { ALL_WORDS, PALI_VERSES } from './constants';
import TypingPractice from './components/TypingPractice';
import Flashcards from './components/Flashcards';
import Dictionary from './components/Dictionary';
import AITutor from './components/AITutor';
import GrammarTheory from './components/GrammarTheory';
import LevelSelector from './components/LevelSelector';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.LEARN);
  const [masteredWordIds, setMasteredWordIds] = useState<Set<string>>(new Set());
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [typingHistory, setTypingHistory] = useState<TypedHistoryItem[]>([]);

  // Load progress
  useEffect(() => {
    const savedMastered = localStorage.getItem('pali_mastered');
    const savedUnlocked = localStorage.getItem('pali_unlocked');
    const savedHistory = localStorage.getItem('pali_typing_history');
    
    if (savedMastered) setMasteredWordIds(new Set(JSON.parse(savedMastered)));
    if (savedUnlocked) setUnlockedLevels(JSON.parse(savedUnlocked));
    if (savedHistory) setTypingHistory(JSON.parse(savedHistory));
  }, []);

  const handleWordComplete = (wordId: string) => {
    // Tìm kiếm trong cả từ vựng và câu kinh
    const wordObj = ALL_WORDS.find(w => w.id === wordId) || PALI_VERSES.find(v => v.id === wordId);
    if (!wordObj) return;

    // Update Mastered Set
    setMasteredWordIds(prev => {
      const newSet = new Set(prev);
      newSet.add(wordId);
      localStorage.setItem('pali_mastered', JSON.stringify(Array.from(newSet)));
      
      // Kiểm tra mở khóa level tiếp theo dựa trên từ vựng của level đó
      const currentLevelWords = ALL_WORDS.filter(w => w.level === selectedLevel);
      const masteredInLevel = currentLevelWords.filter(w => newSet.has(w.id)).length;
      
      // Nếu không có từ vựng cụ thể, kiểm tra câu kinh
      const currentLevelVerses = PALI_VERSES.filter(v => v.level === selectedLevel);
      const masteredVersesInLevel = currentLevelVerses.filter(v => newSet.has(v.id)).length;

      const totalItems = currentLevelWords.length + currentLevelVerses.length;
      const totalMastered = masteredInLevel + masteredVersesInLevel;

      if (totalItems > 0 && totalMastered >= totalItems * 0.8) {
        setUnlockedLevels(prevUnlocked => {
          const nextLevel = selectedLevel + 1;
          if (!prevUnlocked.includes(nextLevel) && nextLevel <= 100) {
            const newUnlocked = [...prevUnlocked, nextLevel];
            localStorage.setItem('pali_unlocked', JSON.stringify(newUnlocked));
            return newUnlocked;
          }
          return prevUnlocked;
        });
      }
      return newSet;
    });

    // Update Typing History
    const historyItem: TypedHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      wordId: wordId,
      word: 'word' in wordObj ? wordObj.word : (wordObj as PaliVerse).text,
      meaning: wordObj.meaning,
      timestamp: Date.now()
    };

    setTypingHistory(prev => {
      const newHistory = [historyItem, ...prev].slice(0, 100);
      localStorage.setItem('pali_typing_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const getActiveWords = () => ALL_WORDS.filter(w => w.level === selectedLevel);
  const getActiveVerses = () => PALI_VERSES.filter(v => v.level === selectedLevel);

  // Tính phần trăm hoàn thành của level hiện tại
  const calculateLevelProgress = () => {
    const levelWords = getActiveWords();
    const levelVerses = getActiveVerses();
    const total = levelWords.length + levelVerses.length;
    if (total === 0) return 0;
    
    const mastered = [...levelWords, ...levelVerses].filter(item => masteredWordIds.has(item.id)).length;
    return Math.round((mastered / total) * 100);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.LEARN:
        return (
          <div className="max-w-4xl mx-auto py-8">
            <div className="text-center mb-12">
              <h1 className="serif-font text-5xl font-bold text-orange-900 mb-4">PāliSikkhā</h1>
              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-orange-100">
                  <span className="text-xs text-gray-500 uppercase font-bold block">Tiến độ Level {selectedLevel}</span>
                  <span className="text-2xl font-bold text-orange-600">{calculateLevelProgress()}% Hoàn thành</span>
                </div>
                <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-orange-100">
                  <span className="text-xs text-gray-500 uppercase font-bold block">Đã mở khóa</span>
                  <span className="text-2xl font-bold text-amber-600">{unlockedLevels.length} Level</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 hover:shadow-md transition-all cursor-pointer group" onClick={() => setActiveTab(AppTab.LEVELS)}>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <i className="fas fa-layer-group"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 serif-font">Chọn Cấp Độ</h3>
                <p className="text-sm text-gray-500">Tiếp tục hành trình học tập từ Level {selectedLevel}.</p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 hover:shadow-md transition-all cursor-pointer group" onClick={() => setActiveTab(AppTab.TYPING)}>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <i className="fas fa-keyboard"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 serif-font">Luyện Gõ Kinh Văn</h3>
                <p className="text-sm text-gray-500">Luyện tập các bài kệ của Level {selectedLevel}.</p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 hover:shadow-md transition-all cursor-pointer group" onClick={() => setActiveTab(AppTab.GRAMMAR)}>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className="fas fa-book"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 serif-font">Ngữ Pháp Chuyên Sâu</h3>
                <p className="text-sm text-gray-500">Hệ thống Charles Duroiselle toàn tập.</p>
              </div>
            </div>
          </div>
        );
      case AppTab.LEVELS:
        return (
          <LevelSelector 
            unlockedLevels={unlockedLevels} 
            masteredWords={Array.from(masteredWordIds)} 
            activeLevel={selectedLevel}
            onSelectLevel={(l) => {
              setSelectedLevel(l);
              setActiveTab(AppTab.LEARN);
            }} 
          />
        );
      case AppTab.TYPING:
        // Đảm bảo truyền PALI_VERSES hoặc verses của level hiện tại
        return <TypingPractice verses={getActiveVerses().length > 0 ? getActiveVerses() : PALI_VERSES} history={typingHistory} onWordComplete={handleWordComplete} />;
      case AppTab.FLASHCARDS:
        return <Flashcards words={getActiveWords()} />;
      case AppTab.DICTIONARY:
        return <Dictionary />;
      case AppTab.AI_TUTOR:
        return <AITutor />;
      case AppTab.GRAMMAR:
        return <GrammarTheory />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(AppTab.LEARN)}>
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-xl">
                <i className="fas fa-dharmachakra"></i>
              </div>
              <span className="serif-font text-2xl font-bold text-orange-900 hidden sm:block">PāliSikkhā</span>
            </div>
            
            <div className="flex gap-1 md:gap-4 overflow-x-auto no-scrollbar py-2">
              {[
                { id: AppTab.LEARN, icon: 'fa-home', label: 'Trang chủ' },
                { id: AppTab.LEVELS, icon: 'fa-layer-group', label: 'Cấp độ' },
                { id: AppTab.GRAMMAR, icon: 'fa-book', label: 'Ngữ pháp' },
                { id: AppTab.TYPING, icon: 'fa-keyboard', label: 'Luyện gõ' },
                { id: AppTab.DICTIONARY, icon: 'fa-language', label: 'Tra cứu' },
                { id: AppTab.AI_TUTOR, icon: 'fa-robot', label: 'Trợ lý' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-orange-600 text-white shadow-md' 
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <i className={`fas ${tab.icon}`}></i>
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 pb-12 bg-[#fdfaf5]">
        {renderContent()}
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
