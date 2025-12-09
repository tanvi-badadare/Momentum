import { CheckCircle2, Circle, Calendar, CalendarDays, List } from 'lucide-react';
import { FilterType, Reminder } from '../App';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  reminders: Reminder[];
  isDarkMode: boolean;
}

export function FilterBar({ currentFilter, onFilterChange, reminders, isDarkMode }: FilterBarProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const counts = {
    all: reminders.length,
    active: reminders.filter((r) => !r.completed).length,
    completed: reminders.filter((r) => r.completed).length,
    today: reminders.filter((r) => r.dueDate === today).length,
    upcoming: reminders.filter((r) => r.dueDate && r.dueDate > today).length,
  };

  const filters: Array<{ type: FilterType; label: string; icon: any }> = [
    { type: 'all', label: 'All', icon: List },
    { type: 'active', label: 'Active', icon: Circle },
    { type: 'completed', label: 'Completed', icon: CheckCircle2 },
    { type: 'today', label: 'Today', icon: Calendar },
    { type: 'upcoming', label: 'Upcoming', icon: CalendarDays },
  ];

  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
            currentFilter === type
              ? 'bg-gradient-to-r from-cyan-500 to-orange-500 text-white shadow-md'
              : isDarkMode
              ? 'bg-slate-800 text-cyan-100 active:bg-slate-700 border border-cyan-500/30'
              : 'bg-slate-100 text-slate-700 active:bg-slate-200'
          }`}
        >
          <Icon className="size-4" />
          <span className="text-sm">{label}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              currentFilter === type
                ? 'bg-white/25 text-white'
                : isDarkMode
                ? 'bg-cyan-500/20 text-cyan-200'
                : 'bg-white text-slate-600'
            }`}
          >
            {counts[type]}
          </span>
        </button>
      ))}
    </div>
  );
}