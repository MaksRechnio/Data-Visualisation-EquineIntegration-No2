import { Alert } from '../data/vetData';
import { severityToStatus } from '../utils/helpers';
import { AlertTriangle } from 'lucide-react';

interface AlertsListProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
}

export function AlertsList({ alerts, onAlertClick }: AlertsListProps) {
  const getSeverityColor = (severity: 'low' | 'med' | 'high') => {
    const status = severityToStatus(severity);
    if (status === 'green') return 'bg-emerald-600 text-white border-emerald-700 shadow-lg';
    if (status === 'yellow') return 'bg-amber-600 text-white border-amber-700 shadow-lg';
    return 'bg-red-600 text-white border-red-700 shadow-lg';
  };

  const getSeverityIconColor = (severity: 'low' | 'med' | 'high') => {
    const status = severityToStatus(severity);
    if (status === 'green') return 'text-emerald-600';
    if (status === 'yellow') return 'text-amber-600';
    return 'text-red-600';
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-accent/20 to-accentLight/30 rounded-lg border-2 border-accent/50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-primary mb-4">Alerts</h2>
        <p className="text-sm text-primary">No active alerts</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-accent/20 to-accentLight/30 rounded-lg border-2 border-accent/50 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-primary mb-4">Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            onClick={() => onAlertClick(alert)}
            className="w-full text-left p-4 bg-white border-2 border-accent/30 rounded-lg hover:border-accent hover:bg-accent/10 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getSeverityIconColor(alert.severity)}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-medium text-primary">{alert.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ml-2 flex-shrink-0 ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-primary line-clamp-2">{alert.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
