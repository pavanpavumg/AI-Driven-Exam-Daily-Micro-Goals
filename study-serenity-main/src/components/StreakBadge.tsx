import { Flame, Trophy, Star } from 'lucide-react';

interface StreakBadgeProps {
  days: number;
  totalGoals: number;
}

export const StreakBadge = ({ days, totalGoals }: StreakBadgeProps) => {
  const getStreakMessage = () => {
    if (days >= 30) return "You're unstoppable! 🌟";
    if (days >= 14) return "Amazing consistency!";
    if (days >= 7) return "One week strong!";
    if (days >= 3) return "Building momentum";
    return "Every day counts";
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-calm-cream to-calm-peach p-6 shadow-soft animate-fade-up delay-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-calm-sage flex items-center justify-center animate-float">
            <Flame className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Study Streak
            </h3>
            <p className="text-sm text-muted-foreground">{getStreakMessage()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card/80 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Days Active</span>
          </div>
          <p className="text-3xl font-display font-bold text-foreground">
            {days}
          </p>
        </div>

        <div className="rounded-2xl bg-card/80 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-calm-peach-dark" />
            <span className="text-sm text-muted-foreground">Goals Done</span>
          </div>
          <p className="text-3xl font-display font-bold text-foreground">
            {totalGoals}
          </p>
        </div>
      </div>

      {/* Weekly dots */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-2">This Week</p>
        <div className="flex items-center gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  index < days % 7 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < days % 7 && <Star className="w-3 h-3" />}
              </div>
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
