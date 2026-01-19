import { Alert } from '../data/vetData';
import { AlertTriangle } from 'lucide-react';

interface AlertsListProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
}

export function AlertsList({ alerts, onAlertClick }: AlertsListProps) {
  // Softened styling - alerts as orientation tools, not decision signals
  const getSeverityIconColor = (severity: 'low' | 'med' | 'high') => {
    // Subtle, muted colors for orientation
    return 'text-gray-400';
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-600 mb-2">Alerts</h2>
        <p className="text-xs text-gray-500">No active alerts</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-600 mb-3">Alerts</h2>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            onClick={() => onAlertClick(alert)}
            className="w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getSeverityIconColor(alert.severity)}`} />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-medium text-primary mb-0.5">{alert.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-1">{alert.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
