import { useState } from 'react';
import { Check, Clock, BookOpen } from 'lucide-react';
import { MicroGoal } from '@/types/student';
import { cn } from '@/lib/utils';

interface MicroGoalCardProps {
  goal: MicroGoal;
  onComplete: (id: string) => void;
  index: number;
}

export const MicroGoalCard = ({ goal, onComplete, index }: MicroGoalCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    if (goal.completed) return;
    setIsCompleting(true);
    setTimeout(() => {
      onComplete(goal.id);
      setIsCompleting(false);
    }, 400);
  };

  const getDifficultyStyle = () => {
    switch (goal.difficulty) {
      case 'easy':
        return 'bg-calm-mint text-calm-forest';
      case 'medium':
        return 'bg-calm-sky text-calm-sky-dark';
      case 'challenging':
        return 'bg-calm-lavender text-calm-lavender-dark';
    }
  };

  const getSubjectColor = () => {
    switch (goal.subject) {
      case 'Mathematics':
        return 'border-l-calm-sage';
      case 'Physics':
        return 'border-l-calm-sky-dark';
      case 'History':
        return 'border-l-calm-peach-dark';
      case 'English':
        return 'border-l-calm-lavender-dark';
      default:
        return 'border-l-primary';
    }
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border-l-4 p-5 shadow-soft transition-all duration-300 animate-fade-up",
        getSubjectColor(),
        goal.completed 
          ? "opacity-60 bg-muted" 
          : "hover:shadow-card hover:-translate-y-1",
        isCompleting && "scale-95"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
              getDifficultyStyle()
            )}>
              {goal.difficulty}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {goal.subject}
            </span>
          </div>
          
          <h4 className={cn(
            "font-display font-semibold text-lg mb-1 transition-colors",
            goal.completed ? "line-through text-muted-foreground" : "text-foreground"
          )}>
            {goal.title}
          </h4>
          
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {goal.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{goal.duration} mins</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>Low pressure</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleComplete}
          disabled={goal.completed}
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
            goal.completed
              ? "bg-primary text-primary-foreground"
              : "bg-calm-sage-light text-calm-sage hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95"
          )}
        >
          {goal.completed ? (
            <Check className="w-6 h-6 animate-check" />
          ) : (
            <Check className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {goal.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-calm-sage-light/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
