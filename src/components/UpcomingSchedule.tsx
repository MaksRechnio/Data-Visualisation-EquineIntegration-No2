import { UpcomingEvent } from '../data/vetData';
import { formatDateTime, severityToStatus } from '../utils/helpers';
import { CheckCircle2, Circle } from 'lucide-react';

interface UpcomingScheduleProps {
  events: UpcomingEvent[];
  acknowledgedIds: Set<string>;
  onToggleAcknowledge: (id: string) => void;
}

export function UpcomingSchedule({
  events,
  acknowledgedIds,
  onToggleAcknowledge,
}: UpcomingScheduleProps) {
  const getPriorityColor = (priority: 'low' | 'med' | 'high') => {
    const status = severityToStatus(priority);
    if (status === 'green') return 'bg-emerald-600 text-white border-emerald-700 shadow-lg';
    if (status === 'yellow') return 'bg-amber-600 text-white border-amber-700 shadow-lg';
    return 'bg-red-600 text-white border-red-700 shadow-lg';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Vaccination: 'bg-emerald-600 text-white border-emerald-700 shadow-lg',
      'Follow-up': 'bg-blue-600 text-white border-blue-700 shadow-lg',
      'Treatment End': 'bg-purple-600 text-white border-purple-700 shadow-lg',
      'Lab Review': 'bg-orange-600 text-white border-orange-700 shadow-lg',
    };
    return colors[type] || 'bg-slate-600 text-white border-slate-700 shadow-lg';
  };

  if (events.length === 0) {
    return (
      <div className="bg-gradient-to-br from-accentLighter/30 to-accent/15 rounded-lg border-2 border-accent/30 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-primary mb-4">Upcoming Schedule</h2>
        <p className="text-sm text-primary">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-accentLighter/30 to-accent/15 rounded-lg border-2 border-accent/30 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-primary mb-4">Upcoming Schedule</h2>
      <div className="space-y-3">
        {events.map((event) => {
          const isAcknowledged = acknowledgedIds.has(event.id);
          return (
            <div
              key={event.id}
              className={`p-4 bg-white border-2 rounded-lg transition-all ${
                isAcknowledged
                  ? 'border-accent/20 opacity-75'
                  : 'border-accent/30 hover:border-accent hover:bg-accent/10 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleAcknowledge(event.id)}
                  className="mt-0.5 flex-shrink-0"
                  aria-label={isAcknowledged ? 'Unacknowledge' : 'Acknowledge'}
                >
                  {isAcknowledged ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-primary" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(event.priority)}`}>
                      {event.priority}
                    </span>
                  </div>
                  <h3 className={`text-sm font-medium mb-1 ${isAcknowledged ? 'text-primary/60' : 'text-primary'}`}>
                    {event.title}
                  </h3>
                  <p className={`text-xs ${isAcknowledged ? 'text-primary/60' : 'text-primary'}`}>
                    {formatDateTime(event.dateTime)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
