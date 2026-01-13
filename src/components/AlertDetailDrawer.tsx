import { X, CheckCircle2 } from 'lucide-react';
import { Alert } from '../data/vetData';
import { severityToStatus } from '../utils/helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AlertDetailDrawerProps {
  alert: Alert | null;
  onClose: () => void;
}

export function AlertDetailDrawer({ alert, onClose }: AlertDetailDrawerProps) {
  if (!alert) return null;

  const getSeverityColor = (severity: 'low' | 'med' | 'high') => {
    const status = severityToStatus(severity);
    if (status === 'green') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'yellow') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  // Format history data for chart
  const chartData = alert.history.map(h => ({
    date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: h.value,
  }));

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
          <h2 className="text-lg font-semibold text-primary">Alert Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="p-4 sm:px-6 space-y-6">
          {/* Title and Severity */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-primary">{alert.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>
            <p className="text-sm text-primary">{alert.description}</p>
          </div>

          {/* Metric History Chart */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-3">Metric History</h3>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#35D0C6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-3">Recommended Next Steps</h3>
            <div className="space-y-2">
              {alert.recommendedNextSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-primary flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
