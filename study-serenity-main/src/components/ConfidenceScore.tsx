import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getConfidence, safeFetch } from '@/lib/api';

/* 
  Updated to use internal API fetching. 
  Props are removed as this component now manages its own data 
  to ensure strict separation of concerns and real-time updates.
*/

export const ConfidenceScore = () => {
  const [score, setScore] = useState<number | null>(null);
  const [trend, setTrend] = useState<'up' | 'stable' | 'down'>('stable');
  const [reason, setReason] = useState<string>('Analyzing your progress...');

  useEffect(() => {
    safeFetch('http://localhost:8000/confidence', { confidence_score: 75 })
      .then(data => {
        setScore(data.confidence_score);
        // Simple logic to mock trend for demo since API only sends score currently
        setTrend('up');
        setReason("Based on your consistency and effort in recent sessions.");
      });
  }, []);

  const getScoreColor = () => {
    if (!score) return 'from-gray-300 to-gray-400';
    if (score >= 70) return 'from-confidence-high to-calm-sage';
    if (score >= 50) return 'from-confidence-mid to-calm-peach-dark';
    return 'from-confidence-low to-calm-peach-dark';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-confidence-high" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-destructive" />;
      default:
        return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'up':
        return 'Improving';
      case 'down':
        return 'Take it easy';
      default:
        return 'Steady';
    }
  };

  if (score === null) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-card animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-muted rounded w-1/4 mb-4"></div>
        <div className="h-3 bg-muted rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-card animate-fade-up">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-calm-sage-light to-calm-mint opacity-50 blur-2xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Confidence Score
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
            {getTrendIcon()}
            <span className="text-sm font-medium text-muted-foreground">
              {getTrendText()}
            </span>
          </div>
        </div>

        <div className="flex items-end gap-4 mb-4">
          <div className="relative">
            <span className={`text-6xl font-display font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent animate-breathe`}>
              {score}
            </span>
            <span className="text-2xl font-display text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getScoreColor()} transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>

        {reason && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Why this score? </span>
            {reason}
          </p>
        )}
      </div>
    </div>
  );
};
