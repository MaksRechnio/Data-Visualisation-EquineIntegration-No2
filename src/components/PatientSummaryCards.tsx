import { Horse, VitalsReading, ActiveCase } from '../data/vetData';
import { computeConditionSummary, formatDate } from '../utils/helpers';
import { getStatusFromScore, severityToStatus } from '../utils/helpers';
import { MetricType } from './MetricDetailModal';

interface PatientSummaryCardsProps {
  horse: Horse;
  latestVitals: VitalsReading | undefined;
  activeCases: ActiveCase[];
  lastVetVisit: string | undefined;
  nextScheduledVisit: string | undefined;
  onMetricClick?: (metricType: MetricType) => void;
}

export function PatientSummaryCards({
  horse: _horse,
  latestVitals,
  activeCases,
  lastVetVisit,
  nextScheduledVisit,
  onMetricClick,
}: PatientSummaryCardsProps) {
  const condition = computeConditionSummary(latestVitals, activeCases);
  const highestSeverity = activeCases.length > 0
    ? activeCases.reduce((max, c) => {
        const severity = c.status === 'active' ? 'high' : c.status === 'monitoring' ? 'med' : 'low';
        return severity === 'high' ? 'high' : severity === 'med' && max !== 'high' ? 'med' : max;
      }, 'low' as 'low' | 'med' | 'high')
    : null;

  const statusColor = (status: 'green' | 'yellow' | 'red') => {
    if (status === 'green') return 'bg-emerald-600 text-white border-emerald-700 shadow-lg';
    if (status === 'yellow') return 'bg-amber-600 text-white border-amber-700 shadow-lg';
    return 'bg-red-600 text-white border-red-700 shadow-lg';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Current Condition */}
      <div 
        onClick={() => onMetricClick?.('currentCondition')}
        className="bg-white rounded-xl border-2 border-accent/30 p-5 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Current Condition</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 shadow-md ${statusColor(condition.status)}`}>
            {condition.status === 'green' ? 'Good' : condition.status === 'yellow' ? 'Monitor' : 'Alert'}
          </span>
        </div>
        <p className="text-sm font-semibold text-primary leading-relaxed">{condition.text}</p>
      </div>

      {/* Active Case Count */}
      <div 
        onClick={() => onMetricClick?.('activeCases')}
        className="bg-white rounded-xl border-2 border-accent/30 p-5 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Active Cases</h3>
          {highestSeverity && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 shadow-md ${statusColor(severityToStatus(highestSeverity))}`}>
              {highestSeverity === 'high' ? 'High' : highestSeverity === 'med' ? 'Med' : 'Low'}
            </span>
          )}
        </div>
        <p className="text-4xl font-bold text-primary mb-1">{activeCases.length}</p>
        <p className="text-xs text-primary font-medium">
          {activeCases.filter(c => c.status === 'active').length} active
        </p>
      </div>

      {/* Recovery Score */}
      <div 
        onClick={() => onMetricClick?.('recoveryScore')}
        className="bg-white rounded-xl border-2 border-accent/30 p-5 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
      >
        <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3">Recovery Score</h3>
        {latestVitals ? (
          <>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold text-primary">{Math.round(latestVitals.recoveryScore)}</p>
              <span className="text-sm text-primary font-semibold">/ 100</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 shadow-md ${statusColor(getStatusFromScore(latestVitals.recoveryScore))}`}>
              {getStatusFromScore(latestVitals.recoveryScore) === 'green' ? 'Good' : getStatusFromScore(latestVitals.recoveryScore) === 'yellow' ? 'Fair' : 'Poor'}
            </span>
          </>
        ) : (
          <p className="text-sm text-primary font-medium">No data</p>
        )}
      </div>

      {/* Visits */}
      <div 
        onClick={() => onMetricClick?.('visits')}
        className="bg-white rounded-xl border-2 border-accent/30 p-5 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
      >
        <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3">Visits</h3>
        <div className="space-y-3">
          {lastVetVisit && (
            <div className="bg-accent/10 rounded-lg p-2 border border-accent/30 shadow-md">
              <p className="text-xs text-primary font-medium mb-1">Last Visit</p>
              <p className="text-sm font-bold text-primary">{formatDate(lastVetVisit)}</p>
            </div>
          )}
          {nextScheduledVisit && (
            <div className="bg-accent/10 rounded-lg p-2 border border-accent/30 shadow-md">
              <p className="text-xs text-primary font-medium mb-1">Next Scheduled</p>
              <p className="text-sm font-bold text-primary">{formatDate(nextScheduledVisit)}</p>
            </div>
          )}
          {!lastVetVisit && !nextScheduledVisit && (
            <p className="text-sm text-primary font-medium">No visit data</p>
          )}
        </div>
      </div>
    </div>
  );
}
