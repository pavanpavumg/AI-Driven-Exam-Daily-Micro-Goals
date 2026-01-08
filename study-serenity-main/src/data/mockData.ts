import { DailyGoal, StudentProgress, EncouragementMessage, WeeklyProgress, Subject, Student, Syllabus, PerformanceHistory } from '@/types/student';

// ========== SAMPLE STUDENT ==========
export const mockStudent: Student = {
  id: 'student-1',
  name: 'Priya',
  classOrExamType: 'Class 10 Board Exam',
  dailyAvailableTime: 90, // minutes
  preferredLanguage: 'en',
  createdAt: new Date('2024-01-01')
};

// ========== SAMPLE SYLLABUS ==========
export const mockSyllabus: Syllabus[] = [
  { id: 's1', subject: 'Mathematics', chapter: 'Chapter 2', topic: 'Quadratic Equations', difficulty: 'medium' },
  { id: 's2', subject: 'Mathematics', chapter: 'Chapter 3', topic: 'Linear Equations', difficulty: 'easy' },
  { id: 's3', subject: 'Mathematics', chapter: 'Chapter 4', topic: 'Trigonometry', difficulty: 'hard' },
  { id: 's4', subject: 'Physics', chapter: 'Chapter 1', topic: 'Motion', difficulty: 'medium' },
  { id: 's5', subject: 'Physics', chapter: 'Chapter 2', topic: 'Force and Laws', difficulty: 'medium' },
  { id: 's6', subject: 'Physics', chapter: 'Chapter 3', topic: 'Gravitation', difficulty: 'hard' },
  { id: 's7', subject: 'History', chapter: 'Chapter 1', topic: 'French Revolution', difficulty: 'easy' },
  { id: 's8', subject: 'History', chapter: 'Chapter 2', topic: 'Russian Revolution', difficulty: 'medium' },
  { id: 's9', subject: 'English', chapter: 'Grammar', topic: 'Tenses', difficulty: 'easy' },
  { id: 's10', subject: 'English', chapter: 'Literature', topic: 'Poetry Analysis', difficulty: 'medium' },
];

// ========== SAMPLE PERFORMANCE HISTORY ==========
export const mockPerformanceHistory: PerformanceHistory[] = [
  {
    id: 'p1',
    studentId: 'student-1',
    date: new Date(Date.now() - 86400000 * 6).toISOString().split('T')[0],
    topic: 'Quadratic Equations',
    subject: 'Mathematics',
    questionsAttempted: 10,
    correctAnswers: 6,
    mistakesCount: 4,
    timeSpentMinutes: 30,
    repeatedMistakes: ['Quadratic Equations']
  },
  {
    id: 'p2',
    studentId: 'student-1',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    topic: 'Motion',
    subject: 'Physics',
    questionsAttempted: 8,
    correctAnswers: 5,
    mistakesCount: 3,
    timeSpentMinutes: 25,
    repeatedMistakes: []
  },
  {
    id: 'p3',
    studentId: 'student-1',
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    topic: 'French Revolution',
    subject: 'History',
    questionsAttempted: 5,
    correctAnswers: 4,
    mistakesCount: 1,
    timeSpentMinutes: 15,
    repeatedMistakes: []
  },
  {
    id: 'p4',
    studentId: 'student-1',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    topic: 'Quadratic Equations',
    subject: 'Mathematics',
    questionsAttempted: 12,
    correctAnswers: 9,
    mistakesCount: 3,
    timeSpentMinutes: 35,
    repeatedMistakes: []
  },
  {
    id: 'p5',
    studentId: 'student-1',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    topic: 'Tenses',
    subject: 'English',
    questionsAttempted: 15,
    correctAnswers: 13,
    mistakesCount: 2,
    timeSpentMinutes: 20,
    repeatedMistakes: []
  },
  {
    id: 'p6',
    studentId: 'student-1',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    topic: 'Motion',
    subject: 'Physics',
    questionsAttempted: 10,
    correctAnswers: 8,
    mistakesCount: 2,
    timeSpentMinutes: 28,
    repeatedMistakes: []
  },
  {
    id: 'p7',
    studentId: 'student-1',
    date: new Date().toISOString().split('T')[0],
    topic: 'Linear Equations',
    subject: 'Mathematics',
    questionsAttempted: 8,
    correctAnswers: 7,
    mistakesCount: 1,
    timeSpentMinutes: 22,
    repeatedMistakes: []
  }
];

// ========== DAILY MICRO-GOALS ==========
export const mockMicroGoals: DailyGoal[] = [
  {
    id: '1',
    studentId: 'student-1',
    date: new Date().toISOString().split('T')[0],
    goalText: 'Revise Chapter 3 Formulas',
    estimatedTime: 20,
    subject: 'Mathematics',
    topic: 'Linear Equations',
    difficulty: 'easy',
    completed: false,
    reason: 'Building on yesterday\'s good performance to reinforce concepts.'
  },
  {
    id: '2',
    studentId: 'student-1',
    date: new Date().toISOString().split('T')[0],
    goalText: 'Read 2 Pages of History',
    estimatedTime: 15,
    subject: 'History',
    topic: 'Russian Revolution',
    difficulty: 'easy',
    completed: false,
    reason: 'Introducing a new topic gently since you haven\'t explored it yet.'
  },
  {
    id: '3',
    studentId: 'student-1',
    date: new Date().toISOString().split('T')[0],
    goalText: 'Attempt 5 Medium Questions',
    estimatedTime: 25,
    subject: 'Physics',
    topic: 'Force and Laws',
    difficulty: 'medium',
    completed: false,
    reason: 'Regular practice to build on your improving Physics understanding.'
  },
  {
    id: '4',
    studentId: 'student-1',
    date: new Date().toISOString().split('T')[0],
    goalText: 'Quick Vocabulary Review',
    estimatedTime: 10,
    subject: 'English',
    topic: 'Tenses',
    difficulty: 'easy',
    completed: false,
    reason: 'Light practice to maintain your strong English performance.'
  },
];

// ========== STUDENT PROGRESS ==========
export const mockProgress: StudentProgress = {
  streakDays: 7,
  totalGoalsCompleted: 45,
  weeklyGoals: 12,
  confidenceScore: 72,
  confidenceTrend: 'up',
  lastActiveDate: new Date().toISOString().split('T')[0],
};

// ========== ENCOURAGEMENT MESSAGE ==========
export const mockEncouragement: EncouragementMessage = {
  id: '1',
  message: "You've been consistent for 7 days! Your accuracy improved by 12% this week.",
  reason: "Based on your 7-day streak and reduced mistake repetition in Mathematics",
  emoji: '🌱',
  type: 'consistency',
  translations: {
    en: "You've been consistent for 7 days! Your accuracy improved by 12% this week.",
    kn: "ನೀವು 7 ದಿನಗಳಿಂದ ಸ್ಥಿರವಾಗಿದ್ದೀರಿ! ಈ ವಾರ ನಿಮ್ಮ ನಿಖರತೆ 12% ಸುಧಾರಿಸಿದೆ.",
    mr: "तुम्ही 7 दिवस सातत्याने अभ्यास करत आहात! या आठवड्यात तुमची अचूकता 12% वाढली."
  }
};

// ========== WEEKLY PROGRESS ==========
export const mockWeeklyProgress: WeeklyProgress[] = [
  { day: 'Mon', goalsCompleted: 3, confidenceScore: 65 },
  { day: 'Tue', goalsCompleted: 4, confidenceScore: 67 },
  { day: 'Wed', goalsCompleted: 2, confidenceScore: 66 },
  { day: 'Thu', goalsCompleted: 4, confidenceScore: 69 },
  { day: 'Fri', goalsCompleted: 3, confidenceScore: 70 },
  { day: 'Sat', goalsCompleted: 4, confidenceScore: 71 },
  { day: 'Sun', goalsCompleted: 3, confidenceScore: 72 },
];

// ========== SUBJECTS ==========
export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', color: 'calm-sage', progress: 68 },
  { id: '2', name: 'Physics', color: 'calm-sky-dark', progress: 55 },
  { id: '3', name: 'History', color: 'calm-peach-dark', progress: 72 },
  { id: '4', name: 'English', color: 'calm-lavender-dark', progress: 80 },
];

// Legacy export for backwards compatibility
export const encouragementMessages: EncouragementMessage[] = [
  {
    id: '1',
    message: "Every small step counts. You're building something amazing.",
    reason: "Daily motivation",
    emoji: '🌿',
    type: 'comfort',
  },
  {
    id: '2',
    message: "Consistency matters more than perfection. You're on track!",
    reason: "Based on your consistent daily activity",
    emoji: '✨',
    type: 'consistency',
  },
  {
    id: '3',
    message: "Your accuracy improved by 12% this week — great progress!",
    reason: "Based on reduced mistake repetition",
    emoji: '💪',
    type: 'improvement',
  },
  {
    id: '4',
    message: "One missed goal doesn't break your progress. Tomorrow is fresh.",
    reason: "Supportive message after a challenging day",
    emoji: '🌸',
    type: 'comfort',
  },
];
