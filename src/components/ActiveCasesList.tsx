import { ActiveCase } from '../data/vetData';
import { formatDate } from '../utils/helpers';
import { severityToStatus } from '../utils/helpers';

interface ActiveCasesListProps {
  cases: ActiveCase[];
  onCaseClick: (caseItem: ActiveCase) => void;
}

export function ActiveCasesList({ cases, onCaseClick }: ActiveCasesListProps) {
  const getStatusColor = (status: string) => {
    const severity = status === 'active' ? 'high' : status === 'monitoring' ? 'med' : 'low';
    const statusColor = severityToStatus(severity);
    if (statusColor === 'green') return 'bg-emerald-600 text-white border-emerald-700 shadow-lg';
    if (statusColor === 'yellow') return 'bg-amber-600 text-white border-amber-700 shadow-lg';
    return 'bg-red-600 text-white border-red-700 shadow-lg';
  };

  if (cases.length === 0) {
    return (
      <div className="bg-gradient-to-br from-accent/10 to-accentLight/20 rounded-lg border-2 border-accent/30 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-primary mb-4">Active Cases</h2>
        <p className="text-sm text-primary">No active cases</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-accent/10 to-accentLight/20 rounded-lg border-2 border-accent/30 p-4 sm:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-primary mb-4">Active Cases</h2>
      <div className="space-y-3">
        {cases.map((caseItem) => (
          <button
            key={caseItem.id}
            onClick={() => onCaseClick(caseItem)}
            className="w-full text-left p-4 bg-white border-2 border-accent/30 rounded-lg hover:border-accent hover:bg-accent/10 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-medium text-primary">{caseItem.diagnosis}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(caseItem.status)}`}>
                {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-primary">
              <span>Onset: {formatDate(caseItem.onsetDate)}</span>
              <span>Review: {formatDate(caseItem.nextReviewDate)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
