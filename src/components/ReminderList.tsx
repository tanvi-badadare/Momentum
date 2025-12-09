import { ReminderCard } from './ReminderCard';
import { Reminder } from '../App';
import { Inbox } from 'lucide-react';

interface ReminderListProps {
  reminders: Reminder[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Reminder>) => void;
  isDarkMode: boolean;
}

export function ReminderList({
  reminders,
  onToggleComplete,
  onDelete,
  onEdit,
  isDarkMode,
}: ReminderListProps) {
  if (reminders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isDarkMode ? 'bg-slate-800 border-2 border-cyan-500/30' : 'bg-slate-100'}`}>
          <Inbox className={`size-10 ${isDarkMode ? 'text-cyan-400' : 'text-slate-400'}`} />
        </div>
        <h3 className={`mb-2 ${isDarkMode ? 'text-cyan-100' : 'text-slate-600'}`}>No reminders</h3>
        <p className={`text-sm ${isDarkMode ? 'text-cyan-300/60' : 'text-slate-400'}`}>Tap above to add one</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-4">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}