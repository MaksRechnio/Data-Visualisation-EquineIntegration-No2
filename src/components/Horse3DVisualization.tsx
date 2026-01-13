import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import { MedicalHistoryEvent } from '../data/vetData';

interface Horse3DVisualizationProps {
  medicalHistory: MedicalHistoryEvent[];
}

// Map injury titles/notes to body parts
function getInjuredBodyParts(medicalHistory: MedicalHistoryEvent[]): Record<string, 'high' | 'med' | 'low'> {
  const injuries: Record<string, 'high' | 'med' | 'low'> = {};
  
  // Only consider active injuries (recent and not resolved)
  const recentDate = new Date();
  recentDate.setDate(recentDate.getDate() - 90); // Last 90 days
  
  medicalHistory
    .filter(event => event.type === 'Injury' && new Date(event.date) >= recentDate)
    .forEach(event => {
      const title = event.title.toLowerCase();
      const notes = event.notes.toLowerCase();
      const severity = event.severity;
      
      // Map to body parts based on keywords
      // Check for foreleg/front leg injuries
      if ((title.includes('foreleg') || title.includes('front leg') || title.includes('front') || notes.includes('foreleg') || notes.includes('front leg')) && 
          (title.includes('right') || notes.includes('right'))) {
        injuries['rightForeleg'] = getHighestSeverity(injuries['rightForeleg'], severity);
        injuries['rightAnkle'] = getHighestSeverity(injuries['rightAnkle'], severity);
      }
      if ((title.includes('foreleg') || title.includes('front leg') || title.includes('front') || notes.includes('foreleg') || notes.includes('front leg')) && 
          (title.includes('left') || notes.includes('left'))) {
        injuries['leftForeleg'] = getHighestSeverity(injuries['leftForeleg'], severity);
        injuries['leftAnkle'] = getHighestSeverity(injuries['leftAnkle'], severity);
      }
      
      // Check for hind/rear leg injuries
      if ((title.includes('hind') || title.includes('rear') || title.includes('back leg') || notes.includes('hind') || notes.includes('rear') || notes.includes('back leg')) && 
          (title.includes('right') || notes.includes('right'))) {
        injuries['rightHind'] = getHighestSeverity(injuries['rightHind'], severity);
      }
      if ((title.includes('hind') || title.includes('rear') || title.includes('back leg') || notes.includes('hind') || notes.includes('rear') || notes.includes('back leg')) && 
          (title.includes('left') || notes.includes('left'))) {
        injuries['leftHind'] = getHighestSeverity(injuries['leftHind'], severity);
      }
      
      // Specific ankle/fetlock injuries
      if (title.includes('ankle') || title.includes('fetlock') || notes.includes('ankle') || notes.includes('fetlock')) {
        if (title.includes('right') || notes.includes('right')) {
          injuries['rightAnkle'] = getHighestSeverity(injuries['rightAnkle'], severity);
        } else if (title.includes('left') || notes.includes('left')) {
          injuries['leftAnkle'] = getHighestSeverity(injuries['leftAnkle'], severity);
        }
      }
      if (title.includes('knee') || notes.includes('knee')) {
        if (title.includes('right') || notes.includes('right')) {
          injuries['rightKnee'] = getHighestSeverity(injuries['rightKnee'], severity);
        } else if (title.includes('left') || notes.includes('left')) {
          injuries['leftKnee'] = getHighestSeverity(injuries['leftKnee'], severity);
        }
      }
      if (title.includes('shoulder') || notes.includes('shoulder')) {
        if (title.includes('right') || notes.includes('right')) {
          injuries['rightShoulder'] = getHighestSeverity(injuries['rightShoulder'], severity);
        } else if (title.includes('left') || notes.includes('left')) {
          injuries['leftShoulder'] = getHighestSeverity(injuries['leftShoulder'], severity);
        }
      }
      if (title.includes('hip') || notes.includes('hip')) {
        if (title.includes('right') || notes.includes('right')) {
          injuries['rightHip'] = getHighestSeverity(injuries['rightHip'], severity);
        } else if (title.includes('left') || notes.includes('left')) {
          injuries['leftHip'] = getHighestSeverity(injuries['leftHip'], severity);
        }
      }
      if (title.includes('neck') || notes.includes('neck')) {
        injuries['neck'] = getHighestSeverity(injuries['neck'], severity);
      }
      if (title.includes('back') || title.includes('spine') || notes.includes('back') || notes.includes('spine')) {
        injuries['back'] = getHighestSeverity(injuries['back'], severity);
      }
    });
  
  return injuries;
}

function getHighestSeverity(current: 'high' | 'med' | 'low' | undefined, newSeverity: 'high' | 'med' | 'low'): 'high' | 'med' | 'low' {
  if (!current) return newSeverity;
  if (current === 'high' || newSeverity === 'high') return 'high';
  if (current === 'med' || newSeverity === 'med') return 'med';
  return 'low';
}

function getColorForSeverity(severity: 'high' | 'med' | 'low' | undefined): string {
  if (!severity) return '#8B7355'; // Default horse brown
  if (severity === 'high') return '#ef4444'; // Red
  if (severity === 'med') return '#f97316'; // Orange
  return '#fbbf24'; // Amber/yellow
}

// 3D Horse Model with injury visualization
function HorseModel({ injuries }: { injuries: Record<string, 'high' | 'med' | 'low'> }) {
  return (
    <group>
      {/* Body/Torso */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['back'])} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.2, 1.8]}>
        <boxGeometry args={[0.5, 0.5, 0.8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1, 0.8]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['neck'])} />
      </mesh>
      
      {/* Right Shoulder */}
      <mesh position={[0.8, 0.3, 0.5]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['rightShoulder'])} />
      </mesh>
      
      {/* Right Foreleg */}
      <mesh position={[0.7, -0.5, 0.8]}>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['rightForeleg'])} />
      </mesh>
      
      {/* Right Knee */}
      <mesh position={[0.7, -0.2, 0.8]}>
        <boxGeometry args={[0.25, 0.3, 0.25]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['rightKnee'])} />
      </mesh>
      
      {/* Right Ankle/Fetlock */}
      <mesh position={[0.7, -0.9, 0.8]}>
        <boxGeometry args={[0.15, 0.2, 0.15]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['rightAnkle'])} />
      </mesh>
      
      {/* Left Shoulder */}
      <mesh position={[-0.8, 0.3, 0.5]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['leftShoulder'])} />
      </mesh>
      
      {/* Left Foreleg */}
      <mesh position={[-0.7, -0.5, 0.8]}>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['leftForeleg'])} />
      </mesh>
      
      {/* Left Knee */}
      <mesh position={[-0.7, -0.2, 0.8]}>
        <boxGeometry args={[0.25, 0.3, 0.25]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['leftKnee'])} />
      </mesh>
      
      {/* Left Ankle/Fetlock */}
      <mesh position={[-0.7, -0.9, 0.8]}>
        <boxGeometry args={[0.15, 0.2, 0.15]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['leftAnkle'])} />
      </mesh>
      
      {/* Right Hip */}
      <mesh position={[0.8, 0.2, -0.5]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['rightHip'])} />
      </mesh>
      
      {/* Right Hind Leg */}
      <mesh position={[0.7, -0.5, -0.8]}>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['rightHind'])} />
      </mesh>
      
      {/* Left Hip */}
      <mesh position={[-0.8, 0.2, -0.5]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['leftHip'])} />
      </mesh>
      
      {/* Left Hind Leg */}
      <mesh position={[-0.7, -0.5, -0.8]}>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color={getColorForSeverity(injuries['leftHind'])} />
      </mesh>
    </group>
  );
}

export function Horse3DVisualization({ medicalHistory }: Horse3DVisualizationProps) {
  const injuries = useMemo(() => getInjuredBodyParts(medicalHistory), [medicalHistory]);
  
  // Get active injury events for the list
  const activeInjuries = useMemo(() => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 90);
    
    return medicalHistory
      .filter(event => event.type === 'Injury' && new Date(event.date) >= recentDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [medicalHistory]);
  
  const hasInjuries = Object.keys(injuries).length > 0;

  // Map body part keys to readable names
  const bodyPartNames: Record<string, string> = {
    'rightForeleg': 'Right Foreleg',
    'leftForeleg': 'Left Foreleg',
    'rightHind': 'Right Hind Leg',
    'leftHind': 'Left Hind Leg',
    'rightAnkle': 'Right Ankle/Fetlock',
    'leftAnkle': 'Left Ankle/Fetlock',
    'rightKnee': 'Right Knee',
    'leftKnee': 'Left Knee',
    'rightShoulder': 'Right Shoulder',
    'leftShoulder': 'Left Shoulder',
    'rightHip': 'Right Hip',
    'leftHip': 'Left Hip',
    'neck': 'Neck',
    'back': 'Back/Spine',
  };

  return (
    <div className="bg-white rounded-xl border-2 border-accent/30 p-4 shadow-xl">
      <h2 className="text-lg font-semibold text-primary mb-4">3D Injury Visualization</h2>
      
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="text-xs text-primary font-medium">Legend:</span>
        <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-300">High Severity</span>
        <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800 border border-orange-300">Medium Severity</span>
        <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300">Low Severity</span>
      </div>
      
      <div className="w-full h-96 bg-gray-50 rounded-lg border border-gray-200">
        <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, -5]} intensity={0.6} />
          <pointLight position={[0, 5, 0]} intensity={0.4} />
          <HorseModel injuries={injuries} />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            minDistance={2}
            maxDistance={15}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      {hasInjuries ? (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-primary mb-2">Detected Injuries:</h3>
          <div className="space-y-2">
            {Object.entries(injuries).map(([bodyPart, severity]) => (
              <div key={bodyPart} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span className="text-sm text-primary">{bodyPartNames[bodyPart] || bodyPart}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  severity === 'high' ? 'bg-red-100 text-red-800 border border-red-300' :
                  severity === 'med' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                  'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          {activeInjuries.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-primary mb-2">Recent Injury Events:</h3>
              <div className="space-y-2">
                {activeInjuries.map((injury) => (
                  <div key={injury.id} className="p-2 bg-gray-50 rounded border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">{injury.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{new Date(injury.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                        injury.severity === 'high' ? 'bg-red-100 text-red-800 border border-red-300' :
                        injury.severity === 'med' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {injury.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-primary text-center mt-2">No active injuries detected</p>
      )}
    </div>
  );
}
