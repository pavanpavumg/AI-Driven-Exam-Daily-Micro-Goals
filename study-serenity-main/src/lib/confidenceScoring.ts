import { PerformanceHistory, ConfidenceBreakdown, AnxietySignal } from '@/types/student';

/**
 * Confidence Score Formula:
 * - 40% Consistency (active study days in last 7 days)
 * - 30% Accuracy Improvement (week-over-week improvement)
 * - 20% Effort Regularity (regular daily sessions)
 * - 10% Reduced Repeated Mistakes
 */

export function calculateConfidenceScore(
  history: PerformanceHistory[],
  streakDays: number
): ConfidenceBreakdown {
  // Calculate consistency (40%)
  const last7Days = getLastNDays(7);
  const activeDays = last7Days.filter(date => 
    history.some(h => h.date === date)
  ).length;
  const consistency = Math.round((activeDays / 7) * 100);

  // Calculate accuracy improvement (30%)
  const thisWeek = history.filter(h => isWithinDays(h.date, 7));
  const lastWeek = history.filter(h => isWithinDays(h.date, 14) && !isWithinDays(h.date, 7));
  
  const thisWeekAccuracy = calculateAccuracy(thisWeek);
  const lastWeekAccuracy = calculateAccuracy(lastWeek);
  const accuracyChange = thisWeekAccuracy - lastWeekAccuracy;
  const accuracyImprovement = Math.min(100, Math.max(0, 50 + accuracyChange * 2));

  // Calculate effort regularity (20%)
  const avgDailyMinutes = thisWeek.reduce((sum, h) => sum + h.timeSpentMinutes, 0) / Math.max(activeDays, 1);
  const effortRegularity = Math.min(100, (avgDailyMinutes / 30) * 100);

  // Calculate reduced mistakes (10%)
  const thisWeekMistakes = thisWeek.reduce((sum, h) => sum + h.repeatedMistakes.length, 0);
  const lastWeekMistakes = lastWeek.reduce((sum, h) => sum + h.repeatedMistakes.length, 0);
  const mistakeReduction = lastWeekMistakes > 0 
    ? Math.max(0, ((lastWeekMistakes - thisWeekMistakes) / lastWeekMistakes) * 100)
    : thisWeekMistakes === 0 ? 100 : 50;
  const reducedMistakes = Math.round(mistakeReduction);

  // Calculate total score
  const totalScore = Math.round(
    consistency * 0.4 +
    accuracyImprovement * 0.3 +
    effortRegularity * 0.2 +
    reducedMistakes * 0.1
  );

  // Generate explanation
  const explanation = generateExplanation({
    consistency,
    accuracyImprovement,
    effortRegularity,
    reducedMistakes,
    streakDays,
    accuracyChange
  });

  return {
    consistency,
    accuracyImprovement,
    effortRegularity,
    reducedMistakes,
    totalScore,
    explanation
  };
}

function generateExplanation(params: {
  consistency: number;
  accuracyImprovement: number;
  effortRegularity: number;
  reducedMistakes: number;
  streakDays: number;
  accuracyChange: number;
}): string {
  const parts: string[] = [];

  if (params.streakDays >= 5) {
    parts.push(`You've been consistent for ${params.streakDays} days`);
  } else if (params.consistency >= 60) {
    parts.push('Your regular practice is paying off');
  }

  if (params.accuracyChange > 5) {
    parts.push(`your accuracy improved by ${Math.round(params.accuracyChange)}%`);
  } else if (params.accuracyChange > 0) {
    parts.push('your accuracy is steadily improving');
  }

  if (params.reducedMistakes > 50) {
    parts.push('you\'re making fewer repeated mistakes');
  }

  if (parts.length === 0) {
    return 'Keep going — every small step builds confidence.';
  }

  return parts.join(' and ') + '.';
}

export function detectAnxietySignals(history: PerformanceHistory[]): AnxietySignal[] {
  const signals: AnxietySignal[] = [];
  
  const last3Days = history.filter(h => isWithinDays(h.date, 3));
  const prev3Days = history.filter(h => isWithinDays(h.date, 6) && !isWithinDays(h.date, 3));

  // Check for sudden drop in attempts
  const recentAttempts = last3Days.reduce((sum, h) => sum + h.questionsAttempted, 0);
  const prevAttempts = prev3Days.reduce((sum, h) => sum + h.questionsAttempted, 0);
  
  if (prevAttempts > 0 && recentAttempts < prevAttempts * 0.5) {
    signals.push({
      type: 'sudden_drop',
      severity: 'medium',
      message: 'You seem to be taking fewer questions recently.',
      suggestedAction: 'It\'s okay to take breaks. Focus on quality over quantity.'
    });
  }

  // Check for overworking
  const avgMinutes = last3Days.reduce((sum, h) => sum + h.timeSpentMinutes, 0) / Math.max(last3Days.length, 1);
  if (avgMinutes > 180) {
    signals.push({
      type: 'overworking',
      severity: 'medium',
      message: 'You\'ve been studying a lot lately.',
      suggestedAction: 'Remember to take breaks and rest. Balance is important.'
    });
  }

  return signals;
}

// Helper functions
function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

function isWithinDays(dateStr: string, days: number): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

function calculateAccuracy(history: PerformanceHistory[]): number {
  const totalAttempted = history.reduce((sum, h) => sum + h.questionsAttempted, 0);
  const totalCorrect = history.reduce((sum, h) => sum + h.correctAnswers, 0);
  return totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;
}
