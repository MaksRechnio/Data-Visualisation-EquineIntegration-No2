import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VitalsReading } from '../data/vetData';
import { getDaysFromRange } from '../utils/helpers';

interface VitalsTrendsProps {
  vitals: VitalsReading[];
  range: '7d' | '30d' | '6m';
}

export function VitalsTrends({ vitals, range }: VitalsTrendsProps) {
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-primary px-1">Vitals & Trends</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Resting HR */}
        <div className="bg-gradient-to-br from-accent/10 to-accentLighter/30 rounded-lg border-2 border-accent/30 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-primary mb-4">Resting Heart Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
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
                strokeWidth={3}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-primary mt-2 text-center">bpm</p>
        </div>

        {/* Temperature */}
        <div className="bg-gradient-to-br from-accent/15 to-accentLight/25 rounded-lg border-2 border-accent/40 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-primary mb-4">Temperature</h3>
          <ResponsiveContainer width="100%" height={200}>
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
                strokeWidth={3}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-primary mt-2 text-center">°C</p>
        </div>

        {/* Recovery Score */}
        <div className="bg-gradient-to-br from-accent/20 to-accentLight/30 rounded-lg border-2 border-accent/50 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-primary mb-4">Recovery Score</h3>
          <ResponsiveContainer width="100%" height={200}>
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
                strokeWidth={3}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-primary mt-2 text-center">0-100</p>
        </div>

        {/* Inflammation Index */}
        <div className="bg-gradient-to-br from-accentLighter/40 to-accent/20 rounded-lg border-2 border-accent/30 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-primary mb-4">Inflammation Index</h3>
          <ResponsiveContainer width="100%" height={200}>
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
                strokeWidth={3}
                {...chartConfig}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-primary mt-2 text-center">0-10</p>
        </div>
      </div>
    </div>
  );
}
