import { DailyGoal, Syllabus, PerformanceHistory, Student } from '@/types/student';

interface GoalGenerationConfig {
  maxGoals: number;
  maxMinutesPerGoal: number;
  totalAvailableTime: number;
}

const defaultConfig: GoalGenerationConfig = {
  maxGoals: 4,
  maxMinutesPerGoal: 30,
  totalAvailableTime: 90
};

/**
 * Rule-based + Trend-aware Micro-Goal Generation Engine
 * 
 * Rules:
 * 1. Generate 2-4 goals per day
 * 2. Each goal ≤ 30 minutes
 * 3. Prefer weak or recently incorrect topics
 * 4. Avoid repeating same topic every day
 * 5. Keep language simple and calm
 */
export function generateDailyGoals(
  student: Student,
  syllabus: Syllabus[],
  history: PerformanceHistory[],
  config: GoalGenerationConfig = defaultConfig
): DailyGoal[] {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // Get topics from yesterday to avoid repetition
  const yesterdayTopics = history
    .filter(h => h.date === yesterday)
    .map(h => h.topic);

  // Score topics by priority
  const scoredTopics = syllabus.map(topic => ({
    topic,
    score: calculateTopicPriority(topic, history, yesterdayTopics)
  }));

  // Sort by priority (highest first)
  scoredTopics.sort((a, b) => b.score - a.score);

  // Generate goals based on available time
  const goals: DailyGoal[] = [];
  let remainingTime = Math.min(config.totalAvailableTime, student.dailyAvailableTime);
  
  for (const { topic, score } of scoredTopics) {
    if (goals.length >= config.maxGoals) break;
    if (remainingTime < 15) break;

    const goalTime = calculateGoalTime(topic, remainingTime, config.maxMinutesPerGoal);
    const goalTemplate = selectGoalTemplate(topic, history);
    
    goals.push({
      id: `goal-${Date.now()}-${goals.length}`,
      studentId: student.id,
      date: today,
      goalText: goalTemplate.text,
      estimatedTime: goalTime,
      subject: topic.subject,
      topic: topic.topic,
      difficulty: mapDifficulty(topic.difficulty),
      completed: false,
      reason: goalTemplate.reason
    });

    remainingTime -= goalTime;
  }

  return goals;
}

function calculateTopicPriority(
  topic: Syllabus,
  history: PerformanceHistory[],
  yesterdayTopics: string[]
): number {
  let score = 50; // Base score

  // Check performance history for this topic
  const topicHistory = history.filter(h => h.topic === topic.topic);
  
  if (topicHistory.length > 0) {
    // Lower accuracy = higher priority
    const accuracy = topicHistory.reduce((sum, h) => 
      sum + (h.correctAnswers / Math.max(h.questionsAttempted, 1)), 0
    ) / topicHistory.length;
    score += (1 - accuracy) * 30;

    // Recent mistakes = higher priority
    const recentMistakes = topicHistory
      .filter(h => isWithinDays(h.date, 7))
      .reduce((sum, h) => sum + h.mistakesCount, 0);
    score += Math.min(recentMistakes * 5, 20);

    // Repeated mistakes = higher priority
    const hasRepeatedMistakes = topicHistory.some(h => 
      h.repeatedMistakes.includes(topic.topic)
    );
    if (hasRepeatedMistakes) score += 15;
  } else {
    // Never attempted = medium-high priority (new topics)
    score += 20;
  }

  // Avoid yesterday's topics
  if (yesterdayTopics.includes(topic.topic)) {
    score -= 40;
  }

  // Difficulty adjustment (easier topics for building confidence)
  if (topic.difficulty === 'easy') score += 5;
  if (topic.difficulty === 'hard') score -= 10;

  return score;
}

function calculateGoalTime(
  topic: Syllabus,
  remainingTime: number,
  maxTime: number
): number {
  let baseTime: number;
  
  switch (topic.difficulty) {
    case 'easy':
      baseTime = 15;
      break;
    case 'medium':
      baseTime = 20;
      break;
    case 'hard':
      baseTime = 25;
      break;
    default:
      baseTime = 20;
  }

  return Math.min(baseTime, remainingTime, maxTime);
}

interface GoalTemplate {
  text: string;
  reason: string;
}

function selectGoalTemplate(topic: Syllabus, history: PerformanceHistory[]): GoalTemplate {
  const topicHistory = history.filter(h => h.topic === topic.topic);
  const hasWeakPerformance = topicHistory.some(h => 
    h.correctAnswers / Math.max(h.questionsAttempted, 1) < 0.6
  );
  const isNewTopic = topicHistory.length === 0;

  // Template selection based on context
  if (isNewTopic) {
    return {
      text: `Start with basics of ${topic.topic} — just read and understand`,
      reason: `Introducing ${topic.topic} gently since you haven't explored it yet.`
    };
  }

  if (hasWeakPerformance) {
    const templates = [
      {
        text: `Revise ${topic.topic} concepts — no problem solving yet`,
        reason: `Strengthening foundation in ${topic.topic} based on recent attempts.`
      },
      {
        text: `Review formulas in ${topic.topic} (${topic.difficulty} level)`,
        reason: `Building clarity on ${topic.topic} where you faced challenges.`
      }
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // General practice templates
  const practiceTemplates = [
    {
      text: `Attempt 5 ${topic.difficulty} questions on ${topic.topic} — no time pressure`,
      reason: `Regular practice to maintain strength in ${topic.topic}.`
    },
    {
      text: `Quick review of ${topic.chapter}: ${topic.topic}`,
      reason: `Keeping ${topic.topic} fresh in your memory.`
    },
    {
      text: `Solve one example problem from ${topic.topic}`,
      reason: `Light practice to reinforce your understanding.`
    }
  ];

  return practiceTemplates[Math.floor(Math.random() * practiceTemplates.length)];
}

function mapDifficulty(diff: 'easy' | 'medium' | 'hard'): 'easy' | 'medium' | 'challenging' {
  return diff === 'hard' ? 'challenging' : diff;
}

function isWithinDays(dateStr: string, days: number): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}
