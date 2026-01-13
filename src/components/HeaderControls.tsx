import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Horse } from '../data/vetData';

interface HeaderControlsProps {
  horses: Horse[];
  selectedHorseId: string;
  onHorseChange: (horseId: string) => void;
  range: '7d' | '30d' | '6m';
  onRangeChange: (range: '7d' | '30d' | '6m') => void;
}

export function HeaderControls({
  horses,
  selectedHorseId,
  onHorseChange,
  range,
  onRangeChange,
}: HeaderControlsProps) {
  const currentIndex = horses.findIndex(h => h.id === selectedHorseId);
  const selectedHorse = horses[currentIndex];
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : horses.length - 1;
  const nextIndex = currentIndex < horses.length - 1 ? currentIndex + 1 : 0;
  const prevHorse = horses[prevIndex];
  const nextHorse = horses[nextIndex];

  const handlePrevious = () => {
    onHorseChange(horses[prevIndex].id);
  };

  const handleNext = () => {
    onHorseChange(horses[nextIndex].id);
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-5 shadow-lg border-b-2 border-accent/30">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Equine Integration
          </h1>
          <p className="text-sm text-primary mt-1 font-medium">Veterinarian — Clinical Snapshot</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Horse Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Previous Horse Arrow */}
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-accent/20 rounded-full transition-all hover:scale-110"
              aria-label="Previous horse"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>

            {/* Previous Horse Circle */}
            <button
              onClick={handlePrevious}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-accent/50 flex items-center justify-center hover:bg-accent/30 hover:scale-105 transition-all shadow-lg"
              aria-label={`Select ${prevHorse.name}`}
            >
              <span className="text-xl sm:text-2xl opacity-70">🐴</span>
            </button>

            {/* Selected Horse Pill */}
            <div className="px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-accent border-2 border-white/50 flex items-center gap-2 sm:gap-3 min-w-[160px] sm:min-w-[200px] justify-center shadow-xl">
              <span className="text-2xl sm:text-3xl">🐴</span>
              <span className="text-base sm:text-lg font-bold text-primary">{selectedHorse.name}</span>
            </div>

            {/* Next Horse Circle */}
            <button
              onClick={handleNext}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-accent/50 flex items-center justify-center hover:bg-accent/30 hover:scale-105 transition-all shadow-lg"
              aria-label={`Select ${nextHorse.name}`}
            >
              <span className="text-xl sm:text-2xl opacity-70">🐴</span>
            </button>

            {/* Next Horse Arrow */}
            <button
              onClick={handleNext}
              className="p-2 hover:bg-accent/20 rounded-full transition-all hover:scale-110"
              aria-label="Next horse"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Range Toggle */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2">
              Time Range
            </label>
            <div className="inline-flex rounded-lg bg-gray-100 border-2 border-gray-300 shadow-lg overflow-hidden">
              {(['7d', '30d', '6m'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => onRangeChange(r)}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${
                    range === r
                      ? 'bg-accent text-primary shadow-inner'
                      : 'text-primary hover:bg-gray-200'
                  }`}
                >
                  {r === '7d' ? '7D' : r === '30d' ? '30D' : '6M'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
