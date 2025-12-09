import { useState, useEffect } from 'react';
import { ReminderList } from './components/ReminderList';
import { AddReminder } from './components/AddReminder';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed' | 'today' | 'upcoming';

export default function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load reminders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('momentum-reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }
    
    const savedDarkMode = localStorage.getItem('momentum-dark-mode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('momentum-reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('momentum-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addReminder = (reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setReminders([newReminder, ...reminders]);
  };

  const toggleComplete = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const editReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const getFilteredReminders = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case 'active':
        return reminders.filter((r) => !r.completed);
      case 'completed':
        return reminders.filter((r) => r.completed);
      case 'today':
        return reminders.filter((r) => r.dueDate === today);
      case 'upcoming':
        return reminders.filter((r) => r.dueDate && r.dueDate > today);
      default:
        return reminders;
    }
  };

  const filteredReminders = getFilteredReminders();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-cyan-900 to-orange-900' : 'bg-gradient-to-br from-cyan-500 to-orange-600'}`}>
      <div className={`max-w-md mx-auto min-h-screen shadow-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <Header reminders={reminders} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        <div className="px-4 pb-24">
          <AddReminder onAdd={addReminder} isDarkMode={isDarkMode} />
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            reminders={reminders}
            isDarkMode={isDarkMode}
          />
          <ReminderList
            reminders={filteredReminders}
            onToggleComplete={toggleComplete}
            onDelete={deleteReminder}
            onEdit={editReminder}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}