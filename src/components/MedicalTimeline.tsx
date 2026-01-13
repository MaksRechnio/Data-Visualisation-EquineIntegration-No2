import { MedicalHistoryEvent } from '../data/vetData';
import { formatDate, severityToStatus } from '../utils/helpers';

interface MedicalTimelineProps {
  events: MedicalHistoryEvent[];
  onEventClick: (event: MedicalHistoryEvent) => void;
}

export function MedicalTimeline({ events, onEventClick }: MedicalTimelineProps) {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Injury: 'bg-red-600 text-white border-red-700 shadow-lg',
      Treatment: 'bg-blue-600 text-white border-blue-700 shadow-lg',
      Medication: 'bg-purple-600 text-white border-purple-700 shadow-lg',
      Vaccination: 'bg-emerald-600 text-white border-emerald-700 shadow-lg',
      Checkup: 'bg-slate-600 text-white border-slate-700 shadow-lg',
    };
    return colors[type] || 'bg-slate-600 text-white border-slate-700 shadow-lg';
  };

  const getSeverityColor = (severity: 'low' | 'med' | 'high') => {
    const status = severityToStatus(severity);
    if (status === 'green') return 'bg-emerald-600 text-white border-emerald-700 shadow-lg';
    if (status === 'yellow') return 'bg-amber-600 text-white border-amber-700 shadow-lg';
    return 'bg-red-600 text-white border-red-700 shadow-lg';
  };

  if (events.length === 0) {
    return (
      <div className="bg-gradient-to-br from-accent/15 to-accentLight/25 rounded-lg border-2 border-accent/40 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-primary mb-4">Medical Timeline</h2>
        <p className="text-sm text-primary">No medical history available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-accent/15 to-accentLight/25 rounded-lg border-2 border-accent/40 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-primary mb-4">Medical Timeline</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-4">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => onEventClick(event)}
              className="relative flex items-start gap-4 w-full text-left p-3 bg-white hover:bg-accent/10 hover:shadow-md rounded-lg transition-all border border-transparent hover:border-accent/30"
            >
              {/* Timeline dot */}
              <div className="relative z-10 mt-1">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className="text-xs text-primary">{formatDate(event.date)}</span>
                </div>
                <h3 className="text-sm font-medium text-primary mb-1">{event.title}</h3>
                <p className="text-xs text-primary line-clamp-2">{event.notes}</p>
                <p className="text-xs text-primary mt-1">by {event.clinician}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
