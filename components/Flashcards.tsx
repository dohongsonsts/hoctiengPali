
import React, { useState } from 'react';
import { PaliWord } from '../types';
import { speakPali } from '../services/geminiService';

interface FlashcardsProps {
  words: PaliWord[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentWord = words[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };
  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-orange-900 serif-font">Thẻ Ghi Nhớ</h2>
        <p className="text-gray-500">Lật thẻ để xem nghĩa của từ</p>
      </div>

      <div 
        className="relative h-80 w-full perspective-1000 cursor-pointer group"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden border-2 border-orange-100">
            <div className="text-orange-200 text-5xl mb-4">
              <i className="fas fa-book-open"></i>
            </div>
            <h3 className="serif-font text-5xl font-bold text-gray-800 text-center">{currentWord.word}</h3>
            <p className="mt-4 text-gray-400 uppercase tracking-widest text-xs font-bold">{currentWord.category}</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-orange-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180">
            <h3 className="text-white text-3xl font-bold text-center mb-4">{currentWord.meaning}</h3>
            {currentWord.example && (
              <div className="text-center">
                <p className="text-orange-100 serif-font text-lg italic border-t border-orange-500 pt-4">"{currentWord.example}"</p>
                <p className="text-orange-200 text-sm mt-1">{currentWord.exampleMeaning}</p>
              </div>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); speakPali(currentWord.word); }}
              className="mt-6 bg-white text-orange-600 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <i className="fas fa-volume-up"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button 
          onClick={handlePrev}
          className="p-4 bg-white rounded-full text-orange-600 shadow-sm border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="text-gray-500 font-medium">
          {currentIndex + 1} / {words.length}
        </div>
        <button 
          onClick={handleNext}
          className="p-4 bg-white rounded-full text-orange-600 shadow-sm border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcards;
