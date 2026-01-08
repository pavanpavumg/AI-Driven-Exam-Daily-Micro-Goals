import { EncouragementMessage, PerformanceHistory, StudentProgress } from '@/types/student';

type Language = 'en' | 'kn' | 'mr';

interface EncouragementCondition {
  type: EncouragementMessage['type'];
  check: (progress: StudentProgress, history: PerformanceHistory[]) => boolean;
  priority: number;
}

// ========== MULTILINGUAL ENCOURAGEMENT TEMPLATES ==========
const encouragementTemplates: Record<string, {
  en: string;
  kn: string;
  mr: string;
  emoji: string;
  type: EncouragementMessage['type'];
  reasonTemplate: { en: string; kn: string; mr: string };
}> = {
  streak_high: {
    en: "Amazing! You've been consistent for {days} days. Your dedication is inspiring.",
    kn: "ಅದ್ಭುತ! ನೀವು {days} ದಿನಗಳಿಂದ ಸ್ಥಿರವಾಗಿದ್ದೀರಿ. ನಿಮ್ಮ ಸಮರ್ಪಣೆ ಸ್ಫೂರ್ತಿದಾಯಕವಾಗಿದೆ.",
    mr: "अप्रतिम! तुम्ही {days} दिवस सातत्याने अभ्यास करत आहात. तुमची मेहनत प्रेरणादायी आहे.",
    emoji: '🌟',
    type: 'consistency',
    reasonTemplate: {
      en: "Based on your {days}-day study streak",
      kn: "{days} ದಿನಗಳ ಅಧ್ಯಯನ ಪಟ್ಟಿಯ ಆಧಾರದ ಮೇಲೆ",
      mr: "तुमच्या {days} दिवसांच्या अभ्यासाच्या आधारावर"
    }
  },
  streak_medium: {
    en: "You're building a great habit! {days} days of consistent effort.",
    kn: "ನೀವು ಉತ್ತಮ ಅಭ್ಯಾಸವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳುತ್ತಿದ್ದೀರಿ! {days} ದಿನಗಳ ಸ್ಥಿರ ಪ್ರಯತ್ನ.",
    mr: "तुम्ही एक चांगली सवय लावत आहात! {days} दिवसांचे सातत्यपूर्ण प्रयत्न.",
    emoji: '💪',
    type: 'consistency',
    reasonTemplate: {
      en: "Recognizing your {days}-day consistency",
      kn: "ನಿಮ್ಮ {days} ದಿನಗಳ ಸ್ಥಿರತೆಯನ್ನು ಗುರುತಿಸುತ್ತಿದ್ದೇನೆ",
      mr: "तुमच्या {days} दिवसांच्या सातत्याची ओळख"
    }
  },
  accuracy_improved: {
    en: "Your accuracy improved by {percent}% this week — great progress!",
    kn: "ಈ ವಾರ ನಿಮ್ಮ ನಿಖರತೆ {percent}% ಸುಧಾರಿಸಿದೆ — ಅದ್ಭುತ ಪ್ರಗತಿ!",
    mr: "या आठवड्यात तुमची अचूकता {percent}% वाढली — उत्तम प्रगती!",
    emoji: '📈',
    type: 'improvement',
    reasonTemplate: {
      en: "Based on comparing your this week's performance with last week",
      kn: "ಕಳೆದ ವಾರದೊಂದಿಗೆ ಈ ವಾರದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಹೋಲಿಸಿದ ಆಧಾರದ ಮೇಲೆ",
      mr: "मागील आठवड्याशी या आठवड्याची कामगिरी तुलना करून"
    }
  },
  fewer_mistakes: {
    en: "You're making fewer repeated mistakes. Your understanding is deepening.",
    kn: "ನೀವು ಕಡಿಮೆ ಪುನರಾವರ್ತಿತ ತಪ್ಪುಗಳನ್ನು ಮಾಡುತ್ತಿದ್ದೀರಿ. ನಿಮ್ಮ ತಿಳುವಳಿಕೆ ಆಳವಾಗುತ್ತಿದೆ.",
    mr: "तुम्ही कमी चुका करत आहात. तुमची समज अधिक खोल होत आहे.",
    emoji: '🎯',
    type: 'improvement',
    reasonTemplate: {
      en: "Based on reduced mistake repetition in your recent practice",
      kn: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಅಭ್ಯಾಸದಲ್ಲಿ ಕಡಿಮೆ ತಪ್ಪು ಪುನರಾವರ್ತನೆಯ ಆಧಾರದ ಮೇಲೆ",
      mr: "तुमच्या अलीकडील सरावातील कमी झालेल्या चुकांच्या आधारावर"
    }
  },
  missed_day: {
    en: "One missed day doesn't break your progress. Tomorrow is a fresh start.",
    kn: "ಒಂದು ದಿನ ತಪ್ಪಿಸಿದರೆ ನಿಮ್ಮ ಪ್ರಗತಿ ಹಾಳಾಗುವುದಿಲ್ಲ. ನಾಳೆ ಹೊಸ ಆರಂಭ.",
    mr: "एक दिवस चुकला तरी तुमची प्रगती थांबत नाही. उद्या नवी सुरुवात आहे.",
    emoji: '🌸',
    type: 'comfort',
    reasonTemplate: {
      en: "A gentle reminder that breaks are okay",
      kn: "ವಿರಾಮಗಳು ಸರಿ ಎಂಬ ಸೌಮ್ಯ ಜ್ಞಾಪನೆ",
      mr: "विश्रांती घेणे योग्य आहे याची सौम्य आठवण"
    }
  },
  daily_motivation: {
    en: "Every small step counts. You're building something amazing.",
    kn: "ಪ್ರತಿ ಸಣ್ಣ ಹೆಜ್ಜೆ ಮುಖ್ಯ. ನೀವು ಅದ್ಭುತವಾದದ್ದನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೀರಿ.",
    mr: "प्रत्येक लहान पाऊल महत्त्वाचे आहे. तुम्ही काहीतरी अप्रतिम घडवत आहात.",
    emoji: '🌿',
    type: 'comfort',
    reasonTemplate: {
      en: "Daily encouragement to keep you going",
      kn: "ನಿಮ್ಮನ್ನು ಮುಂದುವರಿಸಲು ದೈನಂದಿನ ಪ್ರೋತ್ಸಾಹ",
      mr: "तुम्हाला चालू ठेवण्यासाठी दैनंदिन प्रोत्साहन"
    }
  },
  consistency_over_speed: {
    en: "Consistency matters more than speed. You're on the right track!",
    kn: "ವೇಗಕ್ಕಿಂತ ಸ್ಥಿರತೆ ಮುಖ್ಯ. ನೀವು ಸರಿಯಾದ ಹಾದಿಯಲ್ಲಿದ್ದೀರಿ!",
    mr: "वेगापेक्षा सातत्य महत्त्वाचे आहे. तुम्ही योग्य मार्गावर आहात!",
    emoji: '✨',
    type: 'consistency',
    reasonTemplate: {
      en: "Based on your regular study pattern",
      kn: "ನಿಮ್ಮ ನಿಯಮಿತ ಅಧ್ಯಯನ ಮಾದರಿಯ ಆಧಾರದ ಮೇಲೆ",
      mr: "तुमच्या नियमित अभ्यासाच्या आधारावर"
    }
  },
  goal_completed: {
    en: "You completed all your goals today! Take a moment to celebrate.",
    kn: "ನೀವು ಇಂದು ಎಲ್ಲಾ ಗುರಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ! ಸಂಭ್ರಮಿಸಲು ಸ್ವಲ್ಪ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ.",
    mr: "तुम्ही आज सर्व उद्दिष्टे पूर्ण केली! साजरे करण्यासाठी थोडा वेळ घ्या.",
    emoji: '🎉',
    type: 'achievement',
    reasonTemplate: {
      en: "Celebrating your daily achievement",
      kn: "ನಿಮ್ಮ ದೈನಂದಿನ ಸಾಧನೆಯನ್ನು ಆಚರಿಸುತ್ತಿದ್ದೇನೆ",
      mr: "तुमच्या दैनंदिन यशाचा उत्सव"
    }
  },
  weekend_rest: {
    en: "It's okay to rest. Balance is key to sustainable learning.",
    kn: "ವಿಶ್ರಾಂತಿ ಪಡೆಯುವುದು ಸರಿ. ಸಮತೋಲನವು ಸಮರ್ಥನೀಯ ಕಲಿಕೆಗೆ ಕೀಲಿಯಾಗಿದೆ.",
    mr: "विश्रांती घेणे ठीक आहे. संतुलन हे शाश्वत शिक्षणाची गुरुकिल्ली आहे.",
    emoji: '🧘',
    type: 'comfort',
    reasonTemplate: {
      en: "Encouraging healthy study-life balance",
      kn: "ಆರೋಗ್ಯಕರ ಅಧ್ಯಯನ-ಜೀವನ ಸಮತೋಲನವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಿದ್ದೇನೆ",
      mr: "आरोग्यदायी अभ्यास-जीवन संतुलनाला प्रोत्साहन"
    }
  },
  exam_day_calm: {
    en: "Take a deep breath. You've prepared well. Trust yourself.",
    kn: "ಆಳವಾಗಿ ಉಸಿರಾಡಿ. ನೀವು ಚೆನ್ನಾಗಿ ತಯಾರಾಗಿದ್ದೀರಿ. ನಿಮ್ಮನ್ನು ನಂಬಿ.",
    mr: "दीर्घ श्वास घ्या. तुम्ही चांगली तयारी केली आहे. स्वतःवर विश्वास ठेवा.",
    emoji: '🍃',
    type: 'comfort',
    reasonTemplate: {
      en: "Exam day calming message",
      kn: "ಪರೀಕ್ಷಾ ದಿನದ ಶಾಂತಗೊಳಿಸುವ ಸಂದೇಶ",
      mr: "परीक्षेच्या दिवशी शांत करणारा संदेश"
    }
  }
};

/**
 * Template-based NLP Encouragement Engine
 * 
 * Conditions → Messages mapping:
 * - High streak → "Amazing consistency" message
 * - Accuracy improved → "Great progress" message  
 * - Missed goal → "One day doesn't break progress" message
 * - High consistency → "Consistency over speed" message
 */
export function generateEncouragement(
  progress: StudentProgress,
  history: PerformanceHistory[],
  language: Language = 'en'
): EncouragementMessage {
  const conditions: EncouragementCondition[] = [
    {
      type: 'achievement',
      check: (p) => p.weeklyGoals >= 10,
      priority: 5
    },
    {
      type: 'consistency',
      check: (p) => p.streakDays >= 7,
      priority: 4
    },
    {
      type: 'improvement',
      check: (p, h) => calculateAccuracyImprovement(h) > 10,
      priority: 4
    },
    {
      type: 'improvement',
      check: (p, h) => hasReducedMistakes(h),
      priority: 3
    },
    {
      type: 'consistency',
      check: (p) => p.streakDays >= 3 && p.streakDays < 7,
      priority: 3
    },
    {
      type: 'comfort',
      check: (p) => p.streakDays === 0,
      priority: 2
    }
  ];

  // Find the first matching condition
  let matchedTemplate: keyof typeof encouragementTemplates = 'daily_motivation';
  let templateData: Record<string, string | number> = {};

  for (const condition of conditions.sort((a, b) => b.priority - a.priority)) {
    if (condition.check(progress, history)) {
      switch (condition.type) {
        case 'consistency':
          if (progress.streakDays >= 7) {
            matchedTemplate = 'streak_high';
          } else if (progress.streakDays >= 3) {
            matchedTemplate = 'streak_medium';
          } else {
            matchedTemplate = 'consistency_over_speed';
          }
          templateData = { days: progress.streakDays };
          break;
        case 'improvement':
          const improvement = calculateAccuracyImprovement(history);
          if (improvement > 10) {
            matchedTemplate = 'accuracy_improved';
            templateData = { percent: Math.round(improvement) };
          } else if (hasReducedMistakes(history)) {
            matchedTemplate = 'fewer_mistakes';
          }
          break;
        case 'comfort':
          matchedTemplate = 'missed_day';
          break;
        case 'achievement':
          matchedTemplate = 'goal_completed';
          break;
      }
      break;
    }
  }

  const template = encouragementTemplates[matchedTemplate];
  
  return {
    id: `enc-${Date.now()}`,
    message: interpolateTemplate(template[language], templateData),
    reason: interpolateTemplate(template.reasonTemplate[language], templateData),
    emoji: template.emoji,
    type: template.type,
    translations: {
      en: interpolateTemplate(template.en, templateData),
      kn: interpolateTemplate(template.kn, templateData),
      mr: interpolateTemplate(template.mr, templateData)
    }
  };
}

function interpolateTemplate(template: string, data: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
  }
  return result;
}

function calculateAccuracyImprovement(history: PerformanceHistory[]): number {
  const thisWeek = history.filter(h => isWithinDays(h.date, 7));
  const lastWeek = history.filter(h => isWithinDays(h.date, 14) && !isWithinDays(h.date, 7));
  
  const thisWeekAccuracy = calculateAccuracy(thisWeek);
  const lastWeekAccuracy = calculateAccuracy(lastWeek);
  
  return thisWeekAccuracy - lastWeekAccuracy;
}

function hasReducedMistakes(history: PerformanceHistory[]): boolean {
  const thisWeek = history.filter(h => isWithinDays(h.date, 7));
  const lastWeek = history.filter(h => isWithinDays(h.date, 14) && !isWithinDays(h.date, 7));
  
  const thisWeekMistakes = thisWeek.reduce((sum, h) => sum + h.repeatedMistakes.length, 0);
  const lastWeekMistakes = lastWeek.reduce((sum, h) => sum + h.repeatedMistakes.length, 0);
  
  return lastWeekMistakes > thisWeekMistakes;
}

function calculateAccuracy(history: PerformanceHistory[]): number {
  const total = history.reduce((sum, h) => sum + h.questionsAttempted, 0);
  const correct = history.reduce((sum, h) => sum + h.correctAnswers, 0);
  return total > 0 ? (correct / total) * 100 : 0;
}

function isWithinDays(dateStr: string, days: number): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

// Export all messages for reference
export const allEncouragementTemplates = encouragementTemplates;
