import { X } from 'lucide-react';
import { VitalsReading, ActiveCase } from '../data/vetData';
import { formatDate } from '../utils/helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export type MetricType = 
  | 'currentCondition' 
  | 'activeCases' 
  | 'recoveryScore' 
  | 'visits'
  | 'restingHR'
  | 'temperature'
  | 'inflammationIndex'
  | 'respiratoryRate'
  | 'symmetry';

interface MetricDetailModalProps {
  metricType: MetricType | null;
  onClose: () => void;
  data?: {
    horse?: { name: string };
    latestVitals?: VitalsReading;
    allVitals?: VitalsReading[];
    activeCases?: ActiveCase[];
    lastVetVisit?: string;
    nextScheduledVisit?: string;
  };
}

export function MetricDetailModal({ metricType, onClose, data }: MetricDetailModalProps) {
  if (!metricType || !data) return null;

  const renderContent = () => {
    switch (metricType) {
      case 'currentCondition':
        return <CurrentConditionDetail data={data} />;
      case 'activeCases':
        return <ActiveCasesDetail data={data} />;
      case 'recoveryScore':
        return <RecoveryScoreDetail data={data} />;
      case 'visits':
        return <VisitsDetail data={data} />;
      case 'restingHR':
        return <RestingHRDetail data={data} />;
      case 'temperature':
        return <TemperatureDetail data={data} />;
      case 'inflammationIndex':
        return <InflammationIndexDetail data={data} />;
      case 'respiratoryRate':
        return <RespiratoryRateDetail data={data} />;
      case 'symmetry':
        return <SymmetryDetail data={data} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    const titles: Record<MetricType, string> = {
      currentCondition: 'Current Condition',
      activeCases: 'Active Cases',
      recoveryScore: 'Recovery Score',
      visits: 'Visit History',
      restingHR: 'Resting Heart Rate',
      temperature: 'Temperature',
      inflammationIndex: 'Inflammation Index',
      respiratoryRate: 'Respiratory Rate',
      symmetry: 'Symmetry Percentage',
    };
    return titles[metricType];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-primary">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function CurrentConditionDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.latestVitals || !data.activeCases) return null;

  const avgRecovery = data.latestVitals.recoveryScore;
  const avgInflammation = data.latestVitals.inflammationIndex;
  const activeCaseCount = data.activeCases.filter(c => c.status === 'active').length;
  const monitoringCount = data.activeCases.filter(c => c.status === 'monitoring').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border-2 border-emerald-200">
          <h3 className="text-sm font-medium text-emerald-800 mb-2">Recovery Score</h3>
          <p className="text-3xl font-bold text-emerald-900">{Math.round(avgRecovery)}/100</p>
          <p className="text-xs text-emerald-700 mt-2">
            {avgRecovery >= 70 ? 'Good recovery status' : avgRecovery >= 50 ? 'Moderate recovery' : 'Poor recovery - requires attention'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-2 border-red-200">
          <h3 className="text-sm font-medium text-red-800 mb-2">Inflammation Index</h3>
          <p className="text-3xl font-bold text-red-900">{avgInflammation.toFixed(1)}/10</p>
          <p className="text-xs text-red-700 mt-2">
            {avgInflammation <= 3 ? 'Normal inflammation levels' : avgInflammation <= 6 ? 'Elevated - monitor closely' : 'High - immediate attention needed'}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Active Cases Summary</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-2xl font-bold text-blue-900">{activeCaseCount}</p>
            <p className="text-sm text-blue-700">Active Cases</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <p className="text-2xl font-bold text-amber-900">{monitoringCount}</p>
            <p className="text-sm text-amber-700">Under Monitoring</p>
          </div>
        </div>
        {data.activeCases.length > 0 && (
          <div className="space-y-2">
            {data.activeCases.map((caseItem) => (
              <div key={caseItem.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-primary">{caseItem.diagnosis}</p>
                    <p className="text-sm text-gray-600 mt-1">{caseItem.treatmentPlan}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-medium ml-4 ${
                    caseItem.status === 'active' ? 'bg-red-100 text-red-800' :
                    caseItem.status === 'monitoring' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {caseItem.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveCasesDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.activeCases) return null;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Active Cases: {data.activeCases.length}</h3>
        <p className="text-sm text-blue-700">
          {data.activeCases.filter(c => c.status === 'active').length} active, {' '}
          {data.activeCases.filter(c => c.status === 'monitoring').length} monitoring, {' '}
          {data.activeCases.filter(c => c.status === 'resolved').length} resolved
        </p>
      </div>

      <div className="space-y-4">
        {data.activeCases.map((caseItem) => (
          <div key={caseItem.id} className="bg-white rounded-lg border-2 border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">{caseItem.diagnosis}</h3>
              <span className={`px-3 py-1 rounded text-xs font-medium ${
                caseItem.status === 'active' ? 'bg-red-100 text-red-800 border border-red-300' :
                caseItem.status === 'monitoring' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                'bg-green-100 text-green-800 border border-green-300'
              }`}>
                {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Onset Date</p>
                <p className="text-sm text-primary">{formatDate(caseItem.onsetDate)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Next Review</p>
                <p className="text-sm text-primary">{formatDate(caseItem.nextReviewDate)}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">Treatment Plan</p>
              <p className="text-sm text-primary whitespace-pre-wrap">{caseItem.treatmentPlan}</p>
            </div>

            {caseItem.meds.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Medications</p>
                <div className="space-y-2">
                  {caseItem.meds.map((med, idx) => (
                    <div key={idx} className="bg-gray-50 rounded p-2 border border-gray-200">
                      <p className="text-sm font-medium text-primary">{med.name}</p>
                      <p className="text-xs text-gray-600">{med.dose} — {med.frequency}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecoveryScoreDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.allVitals || !data.latestVitals) return null;

  const chartData = data.allVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    recoveryScore: Math.round(v.recoveryScore),
  }));

  const latest = data.latestVitals.recoveryScore;
  const avg = data.allVitals.reduce((sum, v) => sum + v.recoveryScore, 0) / data.allVitals.length;
  const min = Math.min(...data.allVitals.map(v => v.recoveryScore));
  const max = Math.max(...data.allVitals.map(v => v.recoveryScore));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">Current</p>
          <p className="text-2xl font-bold text-blue-900">{Math.round(latest)}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-xs font-medium text-green-700 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-900">{Math.round(avg)}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-purple-900">{Math.round(min)}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-xs font-medium text-orange-700 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-orange-900">{Math.round(max)}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Recovery Score Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="recoveryScore" stroke="#35D0C6" fill="#35D0C6" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Interpretation</h3>
        <p className="text-sm text-blue-800">
          Recovery Score measures the horse's overall recovery status. A score of 70+ indicates good recovery,
          50-69 suggests moderate recovery requiring monitoring, and below 50 indicates poor recovery requiring immediate attention.
        </p>
      </div>
    </div>
  );
}

function VisitsDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data) return null;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.lastVetVisit && (
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
            <h3 className="text-sm font-medium text-green-800 mb-2">Last Visit</h3>
            <p className="text-2xl font-bold text-green-900">{formatDate(data.lastVetVisit)}</p>
            <p className="text-xs text-green-700 mt-2">
              {Math.floor((new Date().getTime() - new Date(data.lastVetVisit).getTime()) / (1000 * 60 * 60 * 24))} days ago
            </p>
          </div>
        )}
        {data.nextScheduledVisit && (
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Next Scheduled Visit</h3>
            <p className="text-2xl font-bold text-blue-900">{formatDate(data.nextScheduledVisit)}</p>
            <p className="text-xs text-blue-700 mt-2">
              In {Math.floor((new Date(data.nextScheduledVisit).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-sm font-semibold text-primary mb-2">Visit Schedule Information</h3>
        <p className="text-sm text-gray-700">
          Regular veterinary visits are essential for maintaining your horse's health. Ensure all scheduled appointments are kept
          and follow-up visits are attended as recommended by your veterinarian.
        </p>
      </div>
    </div>
  );
}

function RestingHRDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.allVitals || !data.latestVitals) return null;

  const chartData = data.allVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    restingHR: Math.round(v.restingHR),
  }));

  const latest = data.latestVitals.restingHR;
  const avg = data.allVitals.reduce((sum, v) => sum + v.restingHR, 0) / data.allVitals.length;
  const min = Math.min(...data.allVitals.map(v => v.restingHR));
  const max = Math.max(...data.allVitals.map(v => v.restingHR));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">Current</p>
          <p className="text-2xl font-bold text-blue-900">{Math.round(latest)} bpm</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-xs font-medium text-green-700 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-900">{Math.round(avg)} bpm</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-purple-900">{Math.round(min)} bpm</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-xs font-medium text-orange-700 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-orange-900">{Math.round(max)} bpm</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Resting Heart Rate Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="restingHR" stroke="#35D0C6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Normal Range</h3>
        <p className="text-sm text-blue-800">
          Normal resting heart rate for horses typically ranges from 28-44 beats per minute. Values outside this range may indicate
          stress, illness, or other health concerns and should be discussed with your veterinarian.
        </p>
      </div>
    </div>
  );
}

function TemperatureDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.allVitals || !data.latestVitals) return null;

  const chartData = data.allVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    tempC: Number(v.tempC.toFixed(1)),
  }));

  const latest = data.latestVitals.tempC;
  const avg = data.allVitals.reduce((sum, v) => sum + v.tempC, 0) / data.allVitals.length;
  const min = Math.min(...data.allVitals.map(v => v.tempC));
  const max = Math.max(...data.allVitals.map(v => v.tempC));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">Current</p>
          <p className="text-2xl font-bold text-blue-900">{latest.toFixed(1)}°C</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-xs font-medium text-green-700 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-900">{avg.toFixed(1)}°C</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-purple-900">{min.toFixed(1)}°C</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-xs font-medium text-orange-700 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-orange-900">{max.toFixed(1)}°C</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="tempC" stroke="#28A69D" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Normal Range</h3>
        <p className="text-sm text-blue-800">
          Normal body temperature for horses ranges from 37.5-38.5°C (99.5-101.3°F). Elevated temperatures may indicate
          infection or inflammation, while low temperatures can indicate shock or other serious conditions.
        </p>
      </div>
    </div>
  );
}

function InflammationIndexDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.allVitals || !data.latestVitals) return null;

  const chartData = data.allVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    inflammationIndex: Number(v.inflammationIndex.toFixed(1)),
  }));

  const latest = data.latestVitals.inflammationIndex;
  const avg = data.allVitals.reduce((sum, v) => sum + v.inflammationIndex, 0) / data.allVitals.length;
  const min = Math.min(...data.allVitals.map(v => v.inflammationIndex));
  const max = Math.max(...data.allVitals.map(v => v.inflammationIndex));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">Current</p>
          <p className="text-2xl font-bold text-blue-900">{latest.toFixed(1)}/10</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-xs font-medium text-green-700 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-900">{avg.toFixed(1)}/10</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-purple-900">{min.toFixed(1)}/10</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-xs font-medium text-orange-700 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-orange-900">{max.toFixed(1)}/10</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Inflammation Index Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis domain={[0, 10]} stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="inflammationIndex" stroke="#f97316" fill="#f97316" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
        <h3 className="text-sm font-semibold text-red-900 mb-2">Interpretation</h3>
        <p className="text-sm text-red-800">
          Inflammation Index measures systemic inflammation. Values 0-3 indicate normal levels, 4-6 suggest elevated inflammation
          requiring monitoring, and 7-10 indicate high inflammation requiring immediate veterinary attention.
        </p>
      </div>
    </div>
  );
}

function RespiratoryRateDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.allVitals || !data.latestVitals) return null;

  const chartData = data.allVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    respRate: Math.round(v.respRate),
  }));

  const latest = data.latestVitals.respRate;
  const avg = data.allVitals.reduce((sum, v) => sum + v.respRate, 0) / data.allVitals.length;
  const min = Math.min(...data.allVitals.map(v => v.respRate));
  const max = Math.max(...data.allVitals.map(v => v.respRate));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">Current</p>
          <p className="text-2xl font-bold text-blue-900">{Math.round(latest)} bpm</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-xs font-medium text-green-700 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-900">{Math.round(avg)} bpm</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-purple-900">{Math.round(min)} bpm</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-xs font-medium text-orange-700 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-orange-900">{Math.round(max)} bpm</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Respiratory Rate Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="respRate" stroke="#28A69D" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Normal Range</h3>
        <p className="text-sm text-blue-800">
          Normal respiratory rate for horses at rest ranges from 8-16 breaths per minute. Elevated rates may indicate
          respiratory distress, pain, or other health concerns.
        </p>
      </div>
    </div>
  );
}

function SymmetryDetail({ data }: { data: MetricDetailModalProps['data'] }) {
  if (!data || !data.allVitals || !data.latestVitals) return null;

  const chartData = data.allVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    symmetryPct: Math.round(v.symmetryPct),
  }));

  const latest = data.latestVitals.symmetryPct;
  const avg = data.allVitals.reduce((sum, v) => sum + v.symmetryPct, 0) / data.allVitals.length;
  const min = Math.min(...data.allVitals.map(v => v.symmetryPct));
  const max = Math.max(...data.allVitals.map(v => v.symmetryPct));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">Current</p>
          <p className="text-2xl font-bold text-blue-900">{Math.round(latest)}%</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-xs font-medium text-green-700 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-900">{Math.round(avg)}%</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <p className="text-xs font-medium text-purple-700 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-purple-900">{Math.round(min)}%</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-xs font-medium text-orange-700 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-orange-900">{Math.round(max)}%</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Symmetry Percentage Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="symmetryPct" stroke="#35D0C6" fill="#35D0C6" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Interpretation</h3>
        <p className="text-sm text-blue-800">
          Symmetry percentage measures the balance and symmetry of movement. Values above 85% indicate good symmetry,
          while lower values may indicate lameness, injury, or musculoskeletal issues requiring veterinary evaluation.
        </p>
      </div>
    </div>
  );
}
