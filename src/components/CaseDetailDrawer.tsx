import { X } from 'lucide-react';
import { ActiveCase } from '../data/vetData';
import { formatDate } from '../utils/helpers';

interface CaseDetailDrawerProps {
  caseItem: ActiveCase | null;
  onClose: () => void;
}

export function CaseDetailDrawer({ caseItem, onClose }: CaseDetailDrawerProps) {
  if (!caseItem) return null;

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
          <h2 className="text-lg font-semibold text-primary">Case Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        <div className="p-4 sm:px-6 space-y-6">
          {/* Diagnosis */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">Diagnosis</h3>
            <p className="text-base text-primary">{caseItem.diagnosis}</p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-primary mb-1">Onset Date</h3>
              <p className="text-sm text-primary">{formatDate(caseItem.onsetDate)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary mb-1">Next Review</h3>
              <p className="text-sm text-primary">{formatDate(caseItem.nextReviewDate)}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">Status</h3>
            <span className="inline-block px-3 py-1 rounded text-sm font-medium bg-accent/10 text-primary border border-accent/30">
              {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
            </span>
          </div>

          {/* Treatment Plan */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Treatment Plan</h3>
            <p className="text-sm text-primary whitespace-pre-wrap">{caseItem.treatmentPlan}</p>
          </div>

          {/* Medications */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Medications</h3>
            {caseItem.meds.length > 0 ? (
              <div className="space-y-2">
                {caseItem.meds.map((med, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-primary">{med.name}</p>
                    <p className="text-xs text-primary mt-1">
                      {med.dose} — {med.frequency}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-primary">No medications prescribed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
