import { VitalsReading, ActiveCase } from '../data/vetData';

// Map score (0-100) to status color
export function getStatusFromScore(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 80) return 'green';
  if (score >= 60) return 'yellow';
  return 'red';
}

// Map severity to status color
export function severityToStatus(severity: 'low' | 'med' | 'high'): 'green' | 'yellow' | 'red' {
  if (severity === 'low') return 'green';
  if (severity === 'med') return 'yellow';
  return 'red';
}

// Compute condition summary from latest vitals and active cases
export function computeConditionSummary(
  latestVitals: VitalsReading | undefined,
  activeCases: ActiveCase[]
): { status: 'green' | 'yellow' | 'red'; text: string } {
  if (!latestVitals) {
    return { status: 'yellow', text: 'No recent vitals data available' };
  }

  const hasHighSeverityCase = activeCases.some(c => c.status === 'active');
  const recoveryScore = latestVitals.recoveryScore;
  const inflammationIndex = latestVitals.inflammationIndex;

  if (hasHighSeverityCase || recoveryScore < 60 || inflammationIndex > 7) {
    return { status: 'red', text: 'Requires immediate attention' };
  }

  if (recoveryScore < 80 || inflammationIndex > 5) {
    return { status: 'yellow', text: 'Stable, monitoring recommended' };
  }

  return { status: 'green', text: 'Good condition, all systems normal' };
}

// Compute trend direction from series
export function computeTrend(series: number[]): 'improving' | 'stable' | 'declining' {
  if (series.length < 2) return 'stable';

  const recent = series.slice(-3);
  const earlier = series.slice(0, 3);

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;

  const diff = recentAvg - earlierAvg;
  const threshold = (Math.max(...series) - Math.min(...series)) * 0.1;

  if (diff > threshold) return 'improving';
  if (diff < -threshold) return 'declining';
  return 'stable';
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Format datetime for display
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// Get days count from range
export function getDaysFromRange(range: '7d' | '30d' | '6m'): number {
  if (range === '7d') return 7;
  if (range === '30d') return 30;
  return 180; // 6 months
}

// Determine if a medical event is Active or Historical
// Active = event is within last 14 days OR missing endDate (ongoing)
// Historical = event is older than 14 days
export function getEventStatus(eventDate: string, endDate?: string): 'Active' | 'Historical' {
  // If endDate is missing, consider it ongoing/active
  if (!endDate) {
    const daysSinceEvent = Math.floor((Date.now() - new Date(eventDate).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceEvent <= 14 ? 'Active' : 'Historical';
  }
  
  // If endDate exists, check if event ended within last 14 days
  const daysSinceEnd = Math.floor((Date.now() - new Date(endDate).getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceEnd <= 14 ? 'Active' : 'Historical';
}
