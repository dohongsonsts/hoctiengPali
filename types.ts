
export interface PaliVerse {
  id: string;
  text: string;
  meaning: string;
  source: string;
  level: number;
}

export interface PaliWord {
  id: string;
  word: string;
  meaning: string;
  pronunciation?: string;
  example?: string;
  exampleMeaning?: string;
  category: string;
  level: number;
}

export interface TypedHistoryItem {
  id: string;
  wordId: string;
  word: string;
  meaning: string;
  timestamp: number;
}

export enum AppTab {
  LEARN = 'learn',
  TYPING = 'typing',
  FLASHCARDS = 'flashcards',
  DICTIONARY = 'dictionary',
  AI_TUTOR = 'ai_tutor',
  GRAMMAR = 'grammar',
  LEVELS = 'levels'
}

export interface GrammarLesson {
  id: string;
  title: string;
  content: string;
  category: string;
}
