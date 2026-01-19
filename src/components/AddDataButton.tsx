import { Plus } from 'lucide-react';

interface AddDataButtonProps {
  onClick: () => void;
}

export function AddDataButton({ onClick }: AddDataButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-accent text-white rounded-full p-4 shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center w-16 h-16"
      aria-label="Add new data"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
