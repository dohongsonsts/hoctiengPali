
import React from 'react';
import { ALL_WORDS } from '../constants';

interface LevelSelectorProps {
  unlockedLevels: number[];
  masteredWords: string[];
  onSelectLevel: (level: number) => void;
  activeLevel: number | null;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ unlockedLevels, masteredWords, onSelectLevel, activeLevel }) => {
  const levels = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h2 className="serif-font text-4xl font-bold text-orange-900 mb-2">Hành trình Pháp học</h2>
        <p className="text-gray-500 italic">"Mỗi cấp độ là một nấc thang đưa bạn đến gần hơn với tuệ giác."</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {levels.map(level => {
          const isUnlocked = unlockedLevels.includes(level);
          const levelWords = ALL_WORDS.filter(w => w.level === level);
          const masteredCount = levelWords.filter(w => masteredWords.includes(w.id)).length;
          const percentage = (masteredCount / levelWords.length) * 100;
          const isActive = activeLevel === level;

          return (
            <button
              key={level}
              disabled={!isUnlocked}
              onClick={() => onSelectLevel(level)}
              className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                !isUnlocked 
                  ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed' 
                  : isActive
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg scale-105 z-10'
                    : 'bg-white border-orange-100 text-gray-700 hover:border-orange-500 hover:shadow-md'
              }`}
            >
              {!isUnlocked && <i className="fas fa-lock absolute top-2 right-2 text-[10px] text-gray-400"></i>}
              <span className="text-xs uppercase font-bold tracking-tighter opacity-70">Lv</span>
              <span className="text-2xl font-bold serif-font">{level}</span>
              
              {isUnlocked && (
                <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isActive ? 'bg-orange-200' : 'bg-orange-500'} transition-all`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
