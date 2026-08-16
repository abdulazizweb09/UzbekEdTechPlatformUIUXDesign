import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'written';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
  xp: number;
  level: number;
  rank: number;
  streak: number;
  score: number;
  badges: string[];
  correctAnswers: number;
  totalQuestions: number;
}

export interface TestResult {
  id: string;
  date: string;
  mode: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  subject: string;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  questions: Question[];
  userAnswers: Map<string, { answer: string; isCorrect: boolean; timestamp: Date }>;
  addUserAnswer: (questionId: string, answer: string, isCorrect: boolean) => void;
  savedQuestions: string[];
  toggleSavedQuestion: (questionId: string) => void;
  testResults: TestResult[];
  addTestResult: (result: TestResult) => void;
  leaderboard: User[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'O\'zbekiston Respublikasi mustaqillikka qachon erishgan?',
    type: 'multiple-choice',
    options: ['1990-yil 1-sentyabr', '1991-yil 1-sentyabr', '1991-yil 31-avgust', '1992-yil 1-yanvar'],
    correctAnswer: '1991-yil 1-sentyabr',
    explanation: 'O\'zbekiston Respublikasi 1991-yil 1-sentyabrda mustaqillikka erishgan.',
    subject: 'Tarix',
    difficulty: 'easy',
    topic: 'O\'zbekiston tarixi'
  },
  {
    id: '2',
    question: 'Matematikada 2 + 2 * 2 ning qiymati qancha?',
    type: 'multiple-choice',
    options: ['6', '8', '4', '10'],
    correctAnswer: '6',
    explanation: 'Ko\'paytirish qo\'shishdan oldin bajariladi: 2 + (2 * 2) = 2 + 4 = 6',
    subject: 'Matematika',
    difficulty: 'easy',
    topic: 'Arifmetika'
  },
  {
    id: '3',
    question: 'Fotosintez jarayoni o\'simliklarda qayerda sodir bo\'ladi?',
    type: 'multiple-choice',
    options: ['Ildizda', 'Barg xloroplastlarida', 'Poyada', 'Gullarda'],
    correctAnswer: 'Barg xloroplastlarida',
    explanation: 'Fotosintez jarayoni o\'simlik bargidagi xloroplastlarda sodir bo\'ladi.',
    subject: 'Biologiya',
    difficulty: 'medium',
    topic: 'O\'simliklar fiziologiyasi'
  },
  {
    id: '4',
    question: 'Python dasturlash tilida o\'zgaruvchi e\'lon qilish uchun maxsus kalit so\'z kerakmi?',
    type: 'true-false',
    options: ['Ha', 'Yo\'q'],
    correctAnswer: 'Yo\'q',
    explanation: 'Python tilida o\'zgaruvchilarni e\'lon qilish uchun maxsus kalit so\'z talab qilinmaydi. Faqat nom = qiymat ko\'rinishida yoziladi.',
    subject: 'Informatika',
    difficulty: 'easy',
    topic: 'Python asoslari'
  },
  {
    id: '5',
    question: 'Kimyoviy element H ning nomi nima?',
    type: 'written',
    correctAnswer: 'Vodorod',
    explanation: 'H belgisi bilan belgilanadigan element Vodorod (Hydrogen) deb ataladi.',
    subject: 'Kimyo',
    difficulty: 'easy',
    topic: 'Kimyoviy elementlar'
  },
  {
    id: '6',
    question: 'Yerning Quyosh atrofida to\'liq aylanishi qancha vaqt davom etadi?',
    type: 'multiple-choice',
    options: ['24 soat', '30 kun', '365 kun', '12 oy'],
    correctAnswer: '365 kun',
    explanation: 'Yer Quyosh atrofida to\'liq aylanishini 365 kun (1 yil) davomida amalga oshiradi.',
    subject: 'Geografiya',
    difficulty: 'easy',
    topic: 'Astronomiya asoslari'
  },
  {
    id: '7',
    question: 'Alisher Navoiy qaysi ashulag\'iga mansub?',
    type: 'multiple-choice',
    options: ['Arab adabiyoti', 'Fors adabiyoti', 'O\'zbek adabiyoti', 'Rus adabiyoti'],
    correctAnswer: 'O\'zbek adabiyoti',
    explanation: 'Alisher Navoiy o\'zbek adabiyotining eng buyuk namoyandalaridan biri hisoblanadi.',
    subject: 'Adabiyot',
    difficulty: 'easy',
    topic: 'O\'zbek adabiyoti'
  },
  {
    id: '8',
    question: 'Elektr toki kuchining o\'lchov birligi nima?',
    type: 'multiple-choice',
    options: ['Volt', 'Amper', 'Om', 'Vatt'],
    correctAnswer: 'Amper',
    explanation: 'Elektr toki kuchining o\'lchov birligi Amper (A) dir.',
    subject: 'Fizika',
    difficulty: 'medium',
    topic: 'Elektr'
  },
  {
    id: '9',
    question: 'O\'zbekiston poytaxti qaysi shahar?',
    type: 'multiple-choice',
    options: ['Samarqand', 'Buxoro', 'Toshkent', 'Xiva'],
    correctAnswer: 'Toshkent',
    explanation: 'O\'zbekiston Respublikasining poytaxti Toshkent shahri hisoblanadi.',
    subject: 'Geografiya',
    difficulty: 'easy',
    topic: 'O\'zbekiston geografiyasi'
  },
  {
    id: '10',
    question: 'Ingliz tilida "Hello" so\'zining tarjimasi nima?',
    type: 'multiple-choice',
    options: ['Xayr', 'Salom', 'Rahmat', 'Iltimos'],
    correctAnswer: 'Salom',
    explanation: '"Hello" ingliz tilidan o\'zbek tiliga "Salom" deb tarjima qilinadi.',
    subject: 'Ingliz tili',
    difficulty: 'easy',
    topic: 'Salomlashish'
  },
];

const mockLeaderboard: User[] = [
  {
    id: '1',
    name: 'Aziza Karimova',
    email: 'aziza@email.com',
    role: 'student',
    avatar: '👩',
    xp: 12500,
    level: 24,
    rank: 1,
    streak: 45,
    score: 9850,
    badges: ['🏆', '🎯', '⭐', '🔥'],
    correctAnswers: 985,
    totalQuestions: 1050
  },
  {
    id: '2',
    name: 'Bobur Rahmonov',
    email: 'bobur@email.com',
    role: 'student',
    avatar: '👨',
    xp: 11200,
    level: 22,
    rank: 2,
    streak: 32,
    score: 8920,
    badges: ['🏆', '🎯', '⭐'],
    correctAnswers: 892,
    totalQuestions: 980
  },
  {
    id: '3',
    name: 'Dilnoza Salimova',
    email: 'dilnoza@email.com',
    role: 'student',
    avatar: '👧',
    xp: 10800,
    level: 21,
    rank: 3,
    streak: 28,
    score: 8650,
    badges: ['🏆', '🎯'],
    correctAnswers: 865,
    totalQuestions: 950
  },
  {
    id: '4',
    name: 'Erkin Toshmatov',
    email: 'erkin@email.com',
    role: 'student',
    avatar: '🧑',
    xp: 9500,
    level: 19,
    rank: 4,
    streak: 21,
    score: 7820,
    badges: ['🏆', '🎯'],
    correctAnswers: 782,
    totalQuestions: 890
  },
  {
    id: '5',
    name: 'Feruza Ahmedova',
    email: 'feruza@email.com',
    role: 'student',
    avatar: '👩',
    xp: 8900,
    level: 18,
    rank: 5,
    streak: 15,
    score: 7320,
    badges: ['🎯'],
    correctAnswers: 732,
    totalQuestions: 850
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userAnswers, setUserAnswers] = useState<Map<string, { answer: string; isCorrect: boolean; timestamp: Date }>>(new Map());
  const [savedQuestions, setSavedQuestions] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const addUserAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setUserAnswers(prev => {
      const newMap = new Map(prev);
      newMap.set(questionId, { answer, isCorrect, timestamp: new Date() });
      return newMap;
    });
  };

  const toggleSavedQuestion = (questionId: string) => {
    setSavedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        questions: mockQuestions,
        userAnswers,
        addUserAnswer,
        savedQuestions,
        toggleSavedQuestion,
        testResults,
        addTestResult,
        leaderboard: mockLeaderboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
