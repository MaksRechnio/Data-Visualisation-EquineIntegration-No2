import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import { 
  MedicalHistoryEvent, 
  ActiveCase, 
  VitalsReading, 
  UpcomingEvent 
} from '../data/vetData';

export type DataType = 'medicalHistory' | 'activeCase' | 'vitals' | 'upcomingEvent';

interface AddDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: DataType, data: any) => void;
  horseId: string;
  horseName: string;
}

export function AddDataModal({ isOpen, onClose, onAdd, horseId: _horseId, horseName }: AddDataModalProps) {
  const [activeTab, setActiveTab] = useState<DataType>('medicalHistory');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-primary">Add New Data</h2>
            <p className="text-sm text-gray-600 mt-1">Patient: {horseName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-2 -mb-px">
            <button
              onClick={() => setActiveTab('medicalHistory')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'medicalHistory'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Medical Event
            </button>
            <button
              onClick={() => setActiveTab('activeCase')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'activeCase'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Active Case
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'vitals'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Vitals Reading
            </button>
            <button
              onClick={() => setActiveTab('upcomingEvent')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'upcomingEvent'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Upcoming Event
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'medicalHistory' && (
            <MedicalHistoryForm onAdd={onAdd} onClose={onClose} />
          )}
          {activeTab === 'activeCase' && (
            <ActiveCaseForm onAdd={onAdd} onClose={onClose} />
          )}
          {activeTab === 'vitals' && (
            <VitalsForm onAdd={onAdd} onClose={onClose} />
          )}
          {activeTab === 'upcomingEvent' && (
            <UpcomingEventForm onAdd={onAdd} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

function MedicalHistoryForm({ onAdd, onClose }: { onAdd: (type: DataType, data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Checkup' as MedicalHistoryEvent['type'],
    title: '',
    bodySystem: 'General' as MedicalHistoryEvent['bodySystem'],
    severity: 'low' as MedicalHistoryEvent['severity'],
    notes: '',
    clinician: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: MedicalHistoryEvent = {
      id: `m-${Date.now()}`,
      date: formData.date,
      type: formData.type,
      title: formData.title,
      bodySystem: formData.bodySystem,
      severity: formData.severity,
      notes: formData.notes,
      clinician: formData.clinician,
    };
    onAdd('medicalHistory', newEvent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Event Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as MedicalHistoryEvent['type'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          >
            <option value="Injury">Injury</option>
            <option value="Treatment">Treatment</option>
            <option value="Medication">Medication</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Checkup">Checkup</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Tendon Strain - Right Foreleg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Body System</label>
          <select
            value={formData.bodySystem}
            onChange={(e) => setFormData({ ...formData, bodySystem: e.target.value as MedicalHistoryEvent['bodySystem'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          >
            <option value="Musculoskeletal">Musculoskeletal</option>
            <option value="Respiratory">Respiratory</option>
            <option value="Digestive">Digestive</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Severity</label>
          <select
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value as MedicalHistoryEvent['severity'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          >
            <option value="low">Low</option>
            <option value="med">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">Clinician</label>
        <input
          type="text"
          value={formData.clinician}
          onChange={(e) => setFormData({ ...formData, clinician: e.target.value })}
          placeholder="e.g., Dr. Sarah Mitchell"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Detailed notes about the event..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Medical Event
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-primary hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ActiveCaseForm({ onAdd, onClose }: { onAdd: (type: DataType, data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    diagnosis: '',
    onsetDate: new Date().toISOString().split('T')[0],
    status: 'active' as ActiveCase['status'],
    treatmentPlan: '',
    nextReviewDate: '',
    meds: [{ name: '', dose: '', frequency: '' }],
  });

  const addMedication = () => {
    setFormData({
      ...formData,
      meds: [...formData.meds, { name: '', dose: '', frequency: '' }],
    });
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const newMeds = [...formData.meds];
    newMeds[index] = { ...newMeds[index], [field]: value };
    setFormData({ ...formData, meds: newMeds });
  };

  const removeMedication = (index: number) => {
    setFormData({
      ...formData,
      meds: formData.meds.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: ActiveCase = {
      id: `c-${Date.now()}`,
      diagnosis: formData.diagnosis,
      onsetDate: formData.onsetDate,
      status: formData.status,
      treatmentPlan: formData.treatmentPlan,
      meds: formData.meds.filter(m => m.name && m.dose && m.frequency),
      nextReviewDate: formData.nextReviewDate,
    };
    onAdd('activeCase', newCase);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Diagnosis</label>
        <input
          type="text"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          placeholder="e.g., Tendon Strain - Right Foreleg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Onset Date</label>
          <input
            type="date"
            value={formData.onsetDate}
            onChange={(e) => setFormData({ ...formData, onsetDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ActiveCase['status'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          >
            <option value="active">Active</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">Treatment Plan</label>
        <textarea
          value={formData.treatmentPlan}
          onChange={(e) => setFormData({ ...formData, treatmentPlan: e.target.value })}
          placeholder="Detailed treatment plan..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">Next Review Date</label>
        <input
          type="date"
          value={formData.nextReviewDate}
          onChange={(e) => setFormData({ ...formData, nextReviewDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-primary">Medications</label>
          <button
            type="button"
            onClick={addMedication}
            className="text-sm text-accent hover:text-accent/80 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Medication
          </button>
        </div>
        <div className="space-y-3">
          {formData.meds.map((med, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Medication name"
                  value={med.name}
                  onChange={(e) => updateMedication(index, 'name', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
                <input
                  type="text"
                  placeholder="Dose"
                  value={med.dose}
                  onChange={(e) => updateMedication(index, 'dose', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Frequency"
                    value={med.frequency}
                    onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                  {formData.meds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Active Case
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-primary hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function VitalsForm({ onAdd, onClose }: { onAdd: (type: DataType, data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    restingHR: '',
    tempC: '',
    respRate: '',
    recoveryScore: '',
    inflammationIndex: '',
    symmetryPct: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVitals: VitalsReading = {
      date: formData.date,
      restingHR: parseFloat(formData.restingHR),
      tempC: parseFloat(formData.tempC),
      respRate: parseFloat(formData.respRate),
      recoveryScore: parseFloat(formData.recoveryScore),
      inflammationIndex: parseFloat(formData.inflammationIndex),
      symmetryPct: parseFloat(formData.symmetryPct),
    };
    onAdd('vitals', newVitals);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Resting Heart Rate (bpm)</label>
          <input
            type="number"
            value={formData.restingHR}
            onChange={(e) => setFormData({ ...formData, restingHR: e.target.value })}
            placeholder="e.g., 38"
            min="20"
            max="80"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Temperature (°C)</label>
          <input
            type="number"
            value={formData.tempC}
            onChange={(e) => setFormData({ ...formData, tempC: e.target.value })}
            placeholder="e.g., 37.5"
            min="35"
            max="42"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Respiratory Rate (bpm)</label>
          <input
            type="number"
            value={formData.respRate}
            onChange={(e) => setFormData({ ...formData, respRate: e.target.value })}
            placeholder="e.g., 14"
            min="8"
            max="30"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Recovery Score (0-100)</label>
          <input
            type="number"
            value={formData.recoveryScore}
            onChange={(e) => setFormData({ ...formData, recoveryScore: e.target.value })}
            placeholder="e.g., 75"
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Inflammation Index (0-10)</label>
          <input
            type="number"
            value={formData.inflammationIndex}
            onChange={(e) => setFormData({ ...formData, inflammationIndex: e.target.value })}
            placeholder="e.g., 3.5"
            min="0"
            max="10"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Symmetry Percentage (0-100)</label>
          <input
            type="number"
            value={formData.symmetryPct}
            onChange={(e) => setFormData({ ...formData, symmetryPct: e.target.value })}
            placeholder="e.g., 88"
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Vitals Reading
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-primary hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function UpcomingEventForm({ onAdd, onClose }: { onAdd: (type: DataType, data: any) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    dateTime: '',
    type: 'Follow-up' as UpcomingEvent['type'],
    title: '',
    priority: 'med' as UpcomingEvent['priority'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: UpcomingEvent = {
      id: `u-${Date.now()}`,
      dateTime: formData.dateTime,
      type: formData.type,
      title: formData.title,
      priority: formData.priority,
    };
    onAdd('upcomingEvent', newEvent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Date & Time</label>
        <input
          type="datetime-local"
          value={formData.dateTime}
          onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Event Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as UpcomingEvent['type'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          >
            <option value="Vaccination">Vaccination</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Treatment End">Treatment End</option>
            <option value="Lab Review">Lab Review</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as UpcomingEvent['priority'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            required
          >
            <option value="low">Low</option>
            <option value="med">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Tendon Strain Re-evaluation"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Upcoming Event
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-primary hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
