import { X } from 'lucide-react';
import { MedicalHistoryEvent } from '../data/vetData';
import { formatDate } from '../utils/helpers';
import { severityToStatus } from '../utils/helpers';

interface TimelineEventDetailDrawerProps {
  event: MedicalHistoryEvent | null;
  onClose: () => void;
}

export function TimelineEventDetailDrawer({ event, onClose }: TimelineEventDetailDrawerProps) {
  if (!event) return null;

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Injury: 'bg-red-100 text-red-700 border-red-200',
      Treatment: 'bg-blue-100 text-blue-700 border-blue-200',
      Medication: 'bg-purple-100 text-purple-700 border-purple-200',
      Vaccination: 'bg-green-100 text-green-700 border-green-200',
      Checkup: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getSeverityColor = (severity: 'low' | 'med' | 'high') => {
    const status = severityToStatus(severity);
    if (status === 'green') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'yellow') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Event Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="p-4 sm:px-6 space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-base font-semibold text-primary mb-2">{event.title}</h3>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(event.type)}`}>
                {event.type}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                {event.severity}
              </span>
            </div>
          </div>

          {/* Date */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">Date</h3>
            <p className="text-sm text-primary">{formatDate(event.date)}</p>
          </div>

          {/* Body System */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">Body System</h3>
            <p className="text-sm text-primary">{event.bodySystem}</p>
          </div>

          {/* Clinician */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">Clinician</h3>
            <p className="text-sm text-primary">{event.clinician}</p>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Notes</h3>
            <p className="text-sm text-primary whitespace-pre-wrap">{event.notes}</p>
          </div>

          {/* Attachments */}
          {event.attachments && event.attachments.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-primary mb-2">Attachments</h3>
              <div className="space-y-2">
                {event.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between"
                  >
                    <span className="text-sm text-primary">{attachment.label}</span>
                    <span className="text-xs text-primary">Placeholder</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
