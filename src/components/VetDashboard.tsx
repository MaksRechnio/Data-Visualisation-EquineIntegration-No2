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
  type VitalsReading,
  type UpcomingEvent,
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
import { AddDataButton } from './AddDataButton';
import { AddDataModal, DataType } from './AddDataModal';

export function VetDashboard() {
  const [selectedHorseId, setSelectedHorseId] = useState<string>(horses[0].id);
  const [range, setRange] = useState<'7d' | '30d' | '6m'>('30d');
  const [activeTimelineEvent, setActiveTimelineEvent] = useState<MedicalHistoryEvent | null>(null);
  const [activeCase, setActiveCase] = useState<ActiveCase | null>(null);
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);
  const [acknowledgedUpcomingIds, setAcknowledgedUpcomingIds] = useState<Set<string>>(new Set());
  const [activeMetric, setActiveMetric] = useState<MetricType | null>(null);
  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  
  // State for dynamically added data
  const [addedMedicalHistory, setAddedMedicalHistory] = useState<Record<string, MedicalHistoryEvent[]>>({});
  const [addedActiveCases, setAddedActiveCases] = useState<Record<string, ActiveCase[]>>({});
  const [addedVitals, setAddedVitals] = useState<Record<string, VitalsReading[]>>({});
  const [addedUpcomingEvents, setAddedUpcomingEvents] = useState<Record<string, UpcomingEvent[]>>({});

  // Get current horse data - combine static and dynamically added data
  const selectedHorse = horses.find(h => h.id === selectedHorseId) || horses[0];
  const staticVitals = vitalsByHorseId[selectedHorseId] || [];
  const staticMedicalHistory = medicalHistoryByHorseId[selectedHorseId] || [];
  const staticActiveCases = activeCasesByHorseId[selectedHorseId] || [];
  const staticUpcoming = upcomingByHorseId[selectedHorseId] || [];
  
  // Combine static and added data
  const vitals = useMemo(() => {
    const added = addedVitals[selectedHorseId] || [];
    return [...staticVitals, ...added].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [staticVitals, addedVitals, selectedHorseId]);
  
  const medicalHistory = useMemo(() => {
    const added = addedMedicalHistory[selectedHorseId] || [];
    return [...staticMedicalHistory, ...added];
  }, [staticMedicalHistory, addedMedicalHistory, selectedHorseId]);
  
  const activeCases = useMemo(() => {
    const added = addedActiveCases[selectedHorseId] || [];
    return [...staticActiveCases, ...added];
  }, [staticActiveCases, addedActiveCases, selectedHorseId]);
  
  const upcoming = useMemo(() => {
    const added = addedUpcomingEvents[selectedHorseId] || [];
    return [...staticUpcoming, ...added];
  }, [staticUpcoming, addedUpcomingEvents, selectedHorseId]);
  
  const alerts = alertsByHorseId[selectedHorseId] || [];

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

  const handleAddData = (type: DataType, data: any) => {
    switch (type) {
      case 'medicalHistory':
        setAddedMedicalHistory((prev) => ({
          ...prev,
          [selectedHorseId]: [...(prev[selectedHorseId] || []), data],
        }));
        break;
      case 'activeCase':
        setAddedActiveCases((prev) => ({
          ...prev,
          [selectedHorseId]: [...(prev[selectedHorseId] || []), data],
        }));
        break;
      case 'vitals':
        setAddedVitals((prev) => ({
          ...prev,
          [selectedHorseId]: [...(prev[selectedHorseId] || []), data],
        }));
        break;
      case 'upcomingEvent':
        setAddedUpcomingEvents((prev) => ({
          ...prev,
          [selectedHorseId]: [...(prev[selectedHorseId] || []), data],
        }));
        break;
    }
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
          <div className="lg:col-span-2 space-y-8">
            {/* Active Cases */}
            <ActiveCasesList cases={activeCases} onCaseClick={setActiveCase} />

            {/* Medical Events Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">Medical Events</h2>
                <p className="text-sm text-gray-600">Chronological medical history and timeline</p>
              </div>
              <MedicalTimeline
                events={sortedMedicalHistory}
                onEventClick={setActiveTimelineEvent}
              />
            </div>

            {/* Context Trends Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-600 mb-2">Context Trends</h2>
                <p className="text-xs text-gray-500">Supporting vital signs and metrics</p>
              </div>
              <VitalsTrends vitals={filteredVitals} range={range} onMetricClick={setActiveMetric} />
            </div>
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
      
      {/* Add Data Button */}
      <AddDataButton onClick={() => setIsAddDataModalOpen(true)} />
      
      {/* Add Data Modal */}
      <AddDataModal
        isOpen={isAddDataModalOpen}
        onClose={() => setIsAddDataModalOpen(false)}
        onAdd={handleAddData}
        horseId={selectedHorseId}
        horseName={selectedHorse.name}
      />
    </div>
  );
}
