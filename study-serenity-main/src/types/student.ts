// ========== CORE DATA MODELS ==========
// These models align with the FastAPI/SQLAlchemy backend schema

export interface Student {
  id: string;
  name: string;
  classOrExamType: string;
  dailyAvailableTime: number; // minutes
  preferredLanguage: 'en' | 'kn' | 'mr'; // English, Kannada, Marathi
  createdAt: Date;
}

export interface Syllabus {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PerformanceHistory {
  id: string;
  studentId: string;
  date: string;
  topic: string;
  subject: string;
  questionsAttempted: number;
  correctAnswers: number;
  mistakesCount: number;
  timeSpentMinutes: number;
  repeatedMistakes: string[]; // topic IDs of repeated mistakes
}

export interface DailyGoal {
  id: string;
  studentId: string;
  date: string;
  goalText: string;
  estimatedTime: number; // minutes
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  completed: boolean;
  completedAt?: Date;
  reason: string; // why this goal was generated
}

// Alias for backwards compatibility
export interface MicroGoal extends DailyGoal {}

export interface StudentProgress {
  streakDays: number;
  totalGoalsCompleted: number;
  weeklyGoals: number;
  confidenceScore: number;
  confidenceTrend: 'up' | 'stable' | 'down';
  lastActiveDate: string;
}

export interface EncouragementMessage {
  id: string;
  message: string;
  reason: string;
  emoji: string;
  type: 'achievement' | 'consistency' | 'improvement' | 'comfort';
  translations?: {
    en: string;
    kn: string;
    mr: string;
  };
}

export interface WeeklyProgress {
  day: string;
  goalsCompleted: number;
  confidenceScore: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  progress: number;
}

// ========== CONFIDENCE SCORE COMPONENTS ==========
export interface ConfidenceBreakdown {
  consistency: number;       // 40% weight - active days
  accuracyImprovement: number; // 30% weight - improvement trend
  effortRegularity: number;  // 20% weight - regular study sessions
  reducedMistakes: number;   // 10% weight - fewer repeated mistakes
  totalScore: number;
  explanation: string;
}

// ========== ANXIETY SIGNALS ==========
export interface AnxietySignal {
  type: 'sudden_drop' | 'inconsistency' | 'low_accuracy' | 'overworking';
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestedAction: string;
}
