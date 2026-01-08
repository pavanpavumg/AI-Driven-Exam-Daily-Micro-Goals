import { useEffect, useState } from 'react';
import { Sparkles, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getEncouragement, safeFetch } from '@/lib/api';

/* 
  Updated to use internal API fetching. 
  Props are removed as this component now manages its own data 
  to ensure strict separation of concerns and real-time updates.
*/

export const EncouragementCard = () => {
  const [showReason, setShowReason] = useState(false);
  const [data, setData] = useState<{ message: string; reason: string } | null>(null);

  useEffect(() => {
    safeFetch('http://localhost:8000/encouragement', {
      message: "You're making steady progress. Take it one step at a time.",
      reason: "Always here for you."
    }).then(res => setData(res));
  }, []);

  if (!data) {
    return (
      <div className="rounded-3xl p-6 shadow-soft bg-calm-sage-light/20 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-4"></div>
        <div className="h-16 w-full bg-muted rounded"></div>
      </div>
    );
  }

  // Determine minimal logic for background since backend just sends text
  // We can default to 'consistency' theme or base it on keywords
  const getBackgroundGradient = () => {
    return 'from-calm-sage-light to-calm-mint';
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl p-6 shadow-soft animate-fade-up delay-200",
      `bg-gradient-to-br ${getBackgroundGradient()}`
    )}>
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-card/30 blur-xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-card/20 blur-2xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center text-3xl animate-float">
            ✨
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Daily Encouragement
              </span>
            </div>

            <p className="text-lg font-display font-semibold text-foreground leading-relaxed">
              {data.message}
            </p>
          </div>
        </div>

        {/* Reason toggle */}
        <button
          onClick={() => setShowReason(!showReason)}
          className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>{showReason ? 'Hide' : 'Why this message?'}</span>
        </button>

        {showReason && (
          <div className="mt-3 p-4 rounded-xl bg-card/60 backdrop-blur-sm animate-fade-up">
            <p className="text-sm text-foreground">
              {data.reason || "Based on your activity."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
