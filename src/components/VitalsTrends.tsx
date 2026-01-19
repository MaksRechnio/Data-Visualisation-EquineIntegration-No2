import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VitalsReading } from '../data/vetData';
import { getDaysFromRange } from '../utils/helpers';
import { MetricType } from './MetricDetailModal';

interface VitalsTrendsProps {
  vitals: VitalsReading[];
  range: '7d' | '30d' | '6m';
  onMetricClick?: (metricType: MetricType) => void;
}

export function VitalsTrends({ vitals, range, onMetricClick }: VitalsTrendsProps) {
  const days = getDaysFromRange(range);
  const filteredVitals = vitals.slice(-days);

  // Format data for charts
  const chartData = filteredVitals.map(v => ({
    date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fullDate: v.date,
    restingHR: Math.round(v.restingHR),
    tempC: Number(v.tempC.toFixed(1)),
    recoveryScore: Math.round(v.recoveryScore),
    inflammationIndex: Number(v.inflammationIndex.toFixed(1)),
  }));

  const chartConfig = {
    dot: false,
    activeDot: { r: 4 },
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Resting HR */}
        <div 
          onClick={() => onMetricClick?.('restingHR')}
          className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <h3 className="text-xs font-medium text-primary mb-2">Resting Heart Rate</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="restingHR"
                stroke="#35D0C6"
                strokeWidth={2}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-1 text-center">bpm</p>
        </div>

        {/* Temperature */}
        <div 
          onClick={() => onMetricClick?.('temperature')}
          className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <h3 className="text-xs font-medium text-primary mb-2">Temperature</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="tempC"
                stroke="#28A69D"
                strokeWidth={2}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-1 text-center">°C</p>
        </div>

        {/* Recovery Score */}
        <div 
          onClick={() => onMetricClick?.('recoveryScore')}
          className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <h3 className="text-xs font-medium text-primary mb-2">Recovery Score</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="recoveryScore"
                stroke="#35D0C6"
                strokeWidth={2}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-1 text-center">0-100</p>
        </div>

        {/* Inflammation Index */}
        <div 
          onClick={() => onMetricClick?.('inflammationIndex')}
          className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <h3 className="text-xs font-medium text-primary mb-2">Inflammation Index</h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="inflammationIndex"
                stroke="#7FE8E0"
                strokeWidth={2}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-1 text-center">0-10</p>
        </div>
      </div>
    </div>
  );
}
