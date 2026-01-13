import { useState, useMemo } from 'react';
import {
  horses,
  vitalsByHorseId,
  medicalHistoryByHorseId,
  activeCasesByHorseId,
  alertsByHorseId,
  upcomingByHorseId,
  type MedicalHistoryEvent,
  type ActiveCase,
  type Alert,
} from '../data/vetData';
import { HeaderControls } from './HeaderControls';
import { PatientSummaryCards } from './PatientSummaryCards';
import { ActiveCasesList } from './ActiveCasesList';
import { CaseDetailDrawer } from './CaseDetailDrawer';
import { VitalsTrends } from './VitalsTrends';
import { MedicalTimeline } from './MedicalTimeline';
import { TimelineEventDetailDrawer } from './TimelineEventDetailDrawer';
import { AlertsList } from './AlertsList';
import { AlertDetailDrawer } from './AlertDetailDrawer';
import { UpcomingSchedule } from './UpcomingSchedule';
import { Horse3DVisualization } from './Horse3DVisualization';
import { getDaysFromRange } from '../utils/helpers';
import { MetricDetailModal, MetricType } from './MetricDetailModal';

export function VetDashboard() {
  const [selectedHorseId, setSelectedHorseId] = useState<string>(horses[0].id);
  const [range, setRange] = useState<'7d' | '30d' | '6m'>('30d');
  const [activeTimelineEvent, setActiveTimelineEvent] = useState<MedicalHistoryEvent | null>(null);
  const [activeCase, setActiveCase] = useState<ActiveCase | null>(null);
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);
  const [acknowledgedUpcomingIds, setAcknowledgedUpcomingIds] = useState<Set<string>>(new Set());
  const [activeMetric, setActiveMetric] = useState<MetricType | null>(null);

  // Get current horse data
  const selectedHorse = horses.find(h => h.id === selectedHorseId) || horses[0];
  const vitals = vitalsByHorseId[selectedHorseId] || [];
  const medicalHistory = medicalHistoryByHorseId[selectedHorseId] || [];
  const activeCases = activeCasesByHorseId[selectedHorseId] || [];
  const alerts = alertsByHorseId[selectedHorseId] || [];
  const upcoming = upcomingByHorseId[selectedHorseId] || [];

  // Filter vitals by range
  const days = getDaysFromRange(range);
  const filteredVitals = useMemo(() => {
    return vitals.slice(-days);
  }, [vitals, days]);

  // Get latest vitals
  const latestVitals = vitals.length > 0 ? vitals[vitals.length - 1] : undefined;

  // Get last vet visit and next scheduled visit from medical history and upcoming
  const lastVetVisit = medicalHistory.length > 0 ? medicalHistory[0].date : undefined;
  const nextScheduledVisit = upcoming.length > 0 ? upcoming[0].dateTime.split('T')[0] : undefined;

  // Sort medical history by date (most recent first)
  const sortedMedicalHistory = useMemo(() => {
    return [...medicalHistory].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [medicalHistory]);

  // Sort upcoming events by date
  const sortedUpcoming = useMemo(() => {
    return [...upcoming].sort((a, b) => {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });
  }, [upcoming]);

  const handleToggleAcknowledge = (id: string) => {
    setAcknowledgedUpcomingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderControls
        horses={horses}
        selectedHorseId={selectedHorseId}
        onHorseChange={setSelectedHorseId}
        range={range}
        onRangeChange={setRange}
      />

      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Patient Summary Cards */}
        <div className="mb-6">
          <PatientSummaryCards
            horse={selectedHorse}
            latestVitals={latestVitals}
            activeCases={activeCases}
            lastVetVisit={lastVetVisit}
            nextScheduledVisit={nextScheduledVisit}
            onMetricClick={setActiveMetric}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Cases */}
            <ActiveCasesList cases={activeCases} onCaseClick={setActiveCase} />

            {/* Vitals & Trends */}
            <VitalsTrends vitals={filteredVitals} range={range} onMetricClick={setActiveMetric} />

            {/* Medical Timeline */}
            <MedicalTimeline
              events={sortedMedicalHistory}
              onEventClick={setActiveTimelineEvent}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* 3D Horse Visualization */}
            <Horse3DVisualization medicalHistory={medicalHistory} />
            
            {/* Alerts */}
            <AlertsList alerts={alerts} onAlertClick={setActiveAlert} />

            {/* Upcoming Schedule */}
            <UpcomingSchedule
              events={sortedUpcoming}
              acknowledgedIds={acknowledgedUpcomingIds}
              onToggleAcknowledge={handleToggleAcknowledge}
            />
          </div>
        </div>
      </main>

      {/* Drawers */}
      <CaseDetailDrawer caseItem={activeCase} onClose={() => setActiveCase(null)} />
      <TimelineEventDetailDrawer
        event={activeTimelineEvent}
        onClose={() => setActiveTimelineEvent(null)}
      />
      <AlertDetailDrawer alert={activeAlert} onClose={() => setActiveAlert(null)} />
      
      {/* Metric Detail Modal */}
      <MetricDetailModal
        metricType={activeMetric}
        onClose={() => setActiveMetric(null)}
        data={{
          horse: selectedHorse,
          latestVitals,
          allVitals: vitals,
          activeCases,
          lastVetVisit,
          nextScheduledVisit,
        }}
      />
    </div>
  );
}
