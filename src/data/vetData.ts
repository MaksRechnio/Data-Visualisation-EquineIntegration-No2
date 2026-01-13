// Data model for Veterinarian Dashboard POC

export interface Horse {
  id: string;
  name: string;
  age: number;
  discipline: string;
  stableLocation: string;
}

export interface VitalsReading {
  date: string; // ISO date string
  restingHR: number; // beats per minute
  tempC: number; // Celsius
  respRate: number; // breaths per minute
  recoveryScore: number; // 0-100
  inflammationIndex: number; // 0-10
  symmetryPct: number; // 0-100
}

export interface MedicalHistoryEvent {
  id: string;
  date: string;
  type: 'Injury' | 'Treatment' | 'Medication' | 'Vaccination' | 'Checkup';
  title: string;
  bodySystem: 'Musculoskeletal' | 'Respiratory' | 'Digestive' | 'General';
  severity: 'low' | 'med' | 'high';
  notes: string;
  clinician: string;
  attachments?: Array<{ label: string; urlPlaceholder: string }>;
}

export interface ActiveCase {
  id: string;
  diagnosis: string;
  onsetDate: string;
  status: 'active' | 'monitoring' | 'resolved';
  treatmentPlan: string;
  meds: Array<{ name: string; dose: string; frequency: string }>;
  nextReviewDate: string;
}

export interface Alert {
  id: string;
  severity: 'low' | 'med' | 'high';
  title: string;
  description: string;
  metricKey: string; // e.g., 'recoveryScore', 'inflammationIndex'
  history: Array<{ date: string; value: number }>;
  recommendedNextSteps: Array<string>;
}

export interface UpcomingEvent {
  id: string;
  dateTime: string;
  type: 'Vaccination' | 'Follow-up' | 'Treatment End' | 'Lab Review';
  title: string;
  priority: 'low' | 'med' | 'high';
}

// Dummy data
export const horses: Horse[] = [
  { id: '1', name: 'Thunder', age: 8, discipline: 'Show Jumping', stableLocation: 'Barn A, Stall 12' },
  { id: '2', name: 'Aurora', age: 12, discipline: 'Dressage', stableLocation: 'Barn B, Stall 5' },
  { id: '3', name: 'Phoenix', age: 6, discipline: 'Eventing', stableLocation: 'Barn A, Stall 8' },
];

// Generate vitals data for the past 6 months
function generateVitalsData(horseId: string, days: number): VitalsReading[] {
  const data: VitalsReading[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Vary data based on horse and day for realism
    const seed = parseInt(horseId) * 1000 + i;
    const baseHR = 35 + (seed % 10);
    const baseTemp = 37.2 + (seed % 10) * 0.1;
    const baseRecovery = 70 + (seed % 20);
    const baseInflammation = 2 + (seed % 5) * 0.5;
    
    data.push({
      date: date.toISOString().split('T')[0],
      restingHR: baseHR + Math.sin(i / 7) * 3,
      tempC: baseTemp + Math.cos(i / 5) * 0.3,
      respRate: 12 + (seed % 6),
      recoveryScore: Math.max(0, Math.min(100, baseRecovery + Math.sin(i / 10) * 15)),
      inflammationIndex: Math.max(0, Math.min(10, baseInflammation + Math.cos(i / 8) * 1.5)),
      symmetryPct: 85 + (seed % 10),
    });
  }
  
  return data;
}

export const vitalsByHorseId: Record<string, VitalsReading[]> = {
  '1': generateVitalsData('1', 180),
  '2': generateVitalsData('2', 180),
  '3': generateVitalsData('3', 180),
};

export const medicalHistoryByHorseId: Record<string, MedicalHistoryEvent[]> = {
  '1': [
    {
      id: 'm1-1',
      date: '2024-01-15',
      type: 'Injury',
      title: 'Tendon Strain - Right Foreleg',
      bodySystem: 'Musculoskeletal',
      severity: 'high',
      notes: 'Moderate strain detected during post-exercise examination. Swelling noted around fetlock. Recommended rest and cold therapy.',
      clinician: 'Dr. Sarah Mitchell',
      attachments: [
        { label: 'Ultrasound Report', urlPlaceholder: '/attachments/us-2024-01-15.pdf' },
        { label: 'X-Ray Image', urlPlaceholder: '/attachments/xray-2024-01-15.jpg' },
      ],
    },
    {
      id: 'm1-2',
      date: '2024-01-10',
      type: 'Treatment',
      title: 'Physical Therapy Session',
      bodySystem: 'Musculoskeletal',
      severity: 'low',
      notes: 'Therapeutic exercises performed. Good response to treatment. Range of motion improving.',
      clinician: 'Dr. Sarah Mitchell',
    },
    {
      id: 'm1-3',
      date: '2024-01-05',
      type: 'Medication',
      title: 'Anti-inflammatory Course',
      bodySystem: 'General',
      severity: 'med',
      notes: 'Prescribed phenylbutazone 2g BID for 7 days. Monitor for GI upset.',
      clinician: 'Dr. Sarah Mitchell',
    },
    {
      id: 'm1-4',
      date: '2023-12-20',
      type: 'Vaccination',
      title: 'Annual Flu/Rhino Vaccination',
      bodySystem: 'Respiratory',
      severity: 'low',
      notes: 'Routine annual vaccination administered. No adverse reactions observed.',
      clinician: 'Dr. James Wilson',
    },
    {
      id: 'm1-5',
      date: '2023-12-10',
      type: 'Checkup',
      title: 'Routine Health Examination',
      bodySystem: 'General',
      severity: 'low',
      notes: 'Comprehensive health check. All systems normal. Weight stable, good body condition score.',
      clinician: 'Dr. Sarah Mitchell',
    },
  ],
  '2': [
    {
      id: 'm2-1',
      date: '2026-01-10',
      type: 'Injury',
      title: 'Shoulder Strain - Left Shoulder',
      bodySystem: 'Musculoskeletal',
      severity: 'high',
      notes: 'Moderate to severe strain detected in left shoulder during training session. Horse showed signs of discomfort and reduced range of motion. Swelling noted around shoulder joint. Immediate rest and cold therapy recommended.',
      clinician: 'Dr. Sarah Mitchell',
      attachments: [
        { label: 'Ultrasound Report', urlPlaceholder: '/attachments/us-aurora-2026-01-10.pdf' },
        { label: 'X-Ray Image', urlPlaceholder: '/attachments/xray-aurora-2026-01-10.jpg' },
      ],
    },
    {
      id: 'm2-2',
      date: '2024-01-12',
      type: 'Treatment',
      title: 'Respiratory Therapy',
      bodySystem: 'Respiratory',
      severity: 'med',
      notes: 'Nebulization treatment for mild respiratory congestion. Response good.',
      clinician: 'Dr. James Wilson',
    },
    {
      id: 'm2-3',
      date: '2024-01-01',
      type: 'Medication',
      title: 'Antibiotic Course',
      bodySystem: 'Respiratory',
      severity: 'med',
      notes: 'Trimethoprim-sulfa 30mg/kg BID for 10 days. Monitor appetite.',
      clinician: 'Dr. James Wilson',
    },
    {
      id: 'm2-4',
      date: '2023-12-15',
      type: 'Checkup',
      title: 'Dental Examination',
      bodySystem: 'General',
      severity: 'low',
      notes: 'Routine dental float. Minor sharp points removed. No issues.',
      clinician: 'Dr. Sarah Mitchell',
    },
  ],
  '3': [
    {
      id: 'm3-1',
      date: '2024-01-18',
      type: 'Injury',
      title: 'Superficial Wound - Left Hind',
      bodySystem: 'Musculoskeletal',
      severity: 'low',
      notes: 'Small laceration cleaned and dressed. Healing well.',
      clinician: 'Dr. Sarah Mitchell',
    },
    {
      id: 'm3-2',
      date: '2024-01-08',
      type: 'Checkup',
      title: 'Pre-Competition Examination',
      bodySystem: 'General',
      severity: 'low',
      notes: 'Full pre-competition check. Cleared for eventing competition.',
      clinician: 'Dr. James Wilson',
    },
  ],
};

export const activeCasesByHorseId: Record<string, ActiveCase[]> = {
  '1': [
    {
      id: 'c1-1',
      diagnosis: 'Tendon Strain - Right Foreleg',
      onsetDate: '2024-01-15',
      status: 'active',
      treatmentPlan: 'Rest for 4 weeks, cold therapy 3x daily, gradual return to exercise under supervision. Monitor for any signs of worsening.',
      meds: [
        { name: 'Phenylbutazone', dose: '2g', frequency: 'BID' },
        { name: 'Joint Supplement', dose: 'As directed', frequency: 'Daily' },
      ],
      nextReviewDate: '2024-02-01',
    },
  ],
  '2': [
    {
      id: 'c2-1',
      diagnosis: 'Shoulder Strain - Left Shoulder',
      onsetDate: '2026-01-10',
      status: 'active',
      treatmentPlan: 'Strict rest for 6 weeks. Cold therapy 3x daily for first week, then alternating heat/cold. Gradual return to exercise under supervision. Monitor for any signs of worsening or lameness.',
      meds: [
        { name: 'Phenylbutazone', dose: '2g', frequency: 'BID' },
        { name: 'Muscle Relaxant', dose: 'As directed', frequency: 'Daily' },
        { name: 'Joint Supplement', dose: 'As directed', frequency: 'Daily' },
      ],
      nextReviewDate: '2026-01-24',
    },
    {
      id: 'c2-2',
      diagnosis: 'Mild Respiratory Congestion',
      onsetDate: '2024-01-10',
      status: 'monitoring',
      treatmentPlan: 'Continue nebulization therapy. Monitor respiratory rate and effort. Reassess in 1 week.',
      meds: [
        { name: 'Trimethoprim-Sulfa', dose: '30mg/kg', frequency: 'BID' },
      ],
      nextReviewDate: '2024-01-25',
    },
  ],
  '3': [
    {
      id: 'c3-1',
      diagnosis: 'Superficial Wound - Left Hind',
      onsetDate: '2024-01-18',
      status: 'monitoring',
      treatmentPlan: 'Keep wound clean and dry. Change dressing daily. Monitor for infection signs.',
      meds: [
        { name: 'Topical Antibiotic', dose: 'Apply thin layer', frequency: 'BID' },
      ],
      nextReviewDate: '2024-01-22',
    },
  ],
};

export const alertsByHorseId: Record<string, Alert[]> = {
  '1': [
    {
      id: 'a1-1',
      severity: 'high',
      title: 'Recovery Score Declining',
      description: 'Recovery score has decreased by 15 points over the past 7 days, indicating potential concern.',
      metricKey: 'recoveryScore',
      history: vitalsByHorseId['1'].slice(-14).map(v => ({ date: v.date, value: v.recoveryScore })),
      recommendedNextSteps: [
        'Review recent exercise intensity',
        'Assess for signs of overexertion',
        'Consider additional rest days',
        'Schedule follow-up examination',
      ],
    },
    {
      id: 'a1-2',
      severity: 'med',
      title: 'Inflammation Index Elevated',
      description: 'Inflammation index has been above normal range for 3 consecutive readings.',
      metricKey: 'inflammationIndex',
      history: vitalsByHorseId['1'].slice(-14).map(v => ({ date: v.date, value: v.inflammationIndex })),
      recommendedNextSteps: [
        'Continue current anti-inflammatory protocol',
        'Monitor for clinical signs of inflammation',
        'Reassess in 48 hours',
      ],
    },
  ],
  '2': [
    {
      id: 'a2-1',
      severity: 'med',
      title: 'Respiratory Rate Slightly Elevated',
      description: 'Resting respiratory rate has been consistently above baseline for the past week.',
      metricKey: 'respRate',
      history: vitalsByHorseId['2'].slice(-14).map(v => ({ date: v.date, value: v.respRate })),
      recommendedNextSteps: [
        'Continue respiratory therapy',
        'Monitor for any discharge or coughing',
        'Ensure stable ventilation is adequate',
      ],
    },
  ],
  '3': [
    {
      id: 'a3-1',
      severity: 'low',
      title: 'Temperature Fluctuation',
      description: 'Minor temperature variations noted, within normal range but worth monitoring.',
      metricKey: 'tempC',
      history: vitalsByHorseId['3'].slice(-14).map(v => ({ date: v.date, value: v.tempC })),
      recommendedNextSteps: [
        'Continue monitoring daily',
        'Ensure adequate hydration',
        'Report if temperature exceeds 38.5°C',
      ],
    },
  ],
};

export const upcomingByHorseId: Record<string, UpcomingEvent[]> = {
  '1': [
    {
      id: 'u1-1',
      dateTime: '2024-02-01T10:00:00',
      type: 'Follow-up',
      title: 'Tendon Strain Re-evaluation',
      priority: 'high',
    },
    {
      id: 'u1-2',
      dateTime: '2024-02-15T14:00:00',
      type: 'Treatment End',
      title: 'Complete Anti-inflammatory Course',
      priority: 'med',
    },
    {
      id: 'u1-3',
      dateTime: '2024-03-01T09:00:00',
      type: 'Lab Review',
      title: 'Review Blood Work Results',
      priority: 'low',
    },
  ],
  '2': [
    {
      id: 'u2-1',
      dateTime: '2026-01-24T10:00:00',
      type: 'Follow-up',
      title: 'Shoulder Strain Re-evaluation',
      priority: 'high',
    },
    {
      id: 'u2-2',
      dateTime: '2024-01-25T11:00:00',
      type: 'Follow-up',
      title: 'Respiratory Condition Assessment',
      priority: 'med',
    },
    {
      id: 'u2-3',
      dateTime: '2024-02-10T10:00:00',
      type: 'Vaccination',
      title: 'Annual Vaccination Due',
      priority: 'med',
    },
  ],
  '3': [
    {
      id: 'u3-1',
      dateTime: '2024-01-22T15:00:00',
      type: 'Follow-up',
      title: 'Wound Healing Check',
      priority: 'med',
    },
  ],
};
