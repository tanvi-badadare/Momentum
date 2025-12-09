import { Zap, Moon, Sun } from 'lucide-react';
import { Reminder } from '../App';

interface HeaderProps {
  reminders: Reminder[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ reminders, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const activeCount = reminders.filter((r) => !r.completed).length;
  const completedCount = reminders.filter((r) => r.completed).length;

  return (
    <div className={`px-4 pt-12 pb-6 mb-6 rounded-b-3xl ${isDarkMode ? 'bg-gradient-to-br from-cyan-600 to-orange-600' : 'bg-gradient-to-br from-cyan-500 to-orange-600'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl">
            <Zap className="size-7 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-white text-3xl">Momentum</h1>
            <p className="text-white/80 text-sm">Your daily reminders</p>
          </div>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl active:bg-white/30 transition-all"
        >
          {isDarkMode ? (
            <Sun className="size-6 text-white" />
          ) : (
            <Moon className="size-6 text-white" />
          )}
        </button>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
          <div className="text-white/80 text-xs mb-1">Active</div>
          <div className="text-white text-2xl">{activeCount}</div>
        </div>
        <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center">
          <div className="text-white/80 text-xs mb-1">Done</div>
          <div className="text-white text-2xl">{completedCount}</div>
        </div>
      </div>
    </div>
  );
}