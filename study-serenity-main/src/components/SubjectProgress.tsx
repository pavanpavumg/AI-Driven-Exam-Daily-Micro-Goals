import { Subject } from '@/types/student';
import { cn } from '@/lib/utils';

interface SubjectProgressProps {
  subjects: Subject[];
}

export const SubjectProgress = ({ subjects }: SubjectProgressProps) => {
  const getSubjectColor = (color: string) => {
    switch (color) {
      case 'calm-sage':
        return 'bg-primary';
      case 'calm-sky-dark':
        return 'bg-calm-sky-dark';
      case 'calm-peach-dark':
        return 'bg-calm-peach-dark';
      case 'calm-lavender-dark':
        return 'bg-calm-lavender-dark';
      default:
        return 'bg-primary';
    }
  };

  const getSubjectBgColor = (color: string) => {
    switch (color) {
      case 'calm-sage':
        return 'bg-calm-sage-light';
      case 'calm-sky-dark':
        return 'bg-calm-sky';
      case 'calm-peach-dark':
        return 'bg-calm-peach';
      case 'calm-lavender-dark':
        return 'bg-calm-lavender';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="rounded-3xl bg-card p-6 shadow-card animate-fade-up delay-400">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Subject Comfort Levels
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Not about perfection — just tracking your comfort with each subject
      </p>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div 
            key={subject.id} 
            className="animate-fade-up"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">
                {subject.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {subject.progress}% comfortable
              </span>
            </div>
            <div className={cn(
              "h-2.5 rounded-full overflow-hidden",
              getSubjectBgColor(subject.color)
            )}>
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  getSubjectColor(subject.color)
                )}
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
