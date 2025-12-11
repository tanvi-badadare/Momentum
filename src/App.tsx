import { useState, useEffect } from 'react';
import { ReminderList } from './components/ReminderList';
import { AddReminder } from './components/AddReminder';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PointsPage } from './components/PointsPage';

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
  const [totalPoints, setTotalPoints] = useState(0);

  // Load reminders and points from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('momentum-reminders');
    if (saved) {
      const parsedReminders = JSON.parse(saved);
      setReminders(parsedReminders);
      
      // Calculate initial points from completed reminders if no saved points
      const savedPoints = localStorage.getItem('momentum-points');
      if (savedPoints) {
        setTotalPoints(parseInt(savedPoints, 10));
      } else {
        const initialPoints = parsedReminders.filter((r: Reminder) => r.completed).length * 10;
        setTotalPoints(initialPoints);
      }
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

  // Save points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('momentum-points', totalPoints.toString());
  }, [totalPoints]);

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
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      const wasCompleted = reminder.completed;
      const nowCompleted = !wasCompleted;
      
      setReminders(
        reminders.map((r) =>
          r.id === id ? { ...r, completed: nowCompleted } : r
        )
      );

      // Award points when completing a task (not when uncompleting)
      if (nowCompleted && !wasCompleted) {
        setTotalPoints(prev => prev + 10);
      } else if (!nowCompleted && wasCompleted) {
        // Remove points when uncompleting (optional - you can remove this if you want)
        setTotalPoints(prev => Math.max(0, prev - 10));
      }
    }
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
    <div className="horizontal-scroll-container">
      <div className="flex">
        {/* Landing Page - Reminders */}
        <div className="horizontal-scroll-page">
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
        </div>

        {/* Points Page */}
        <div className="horizontal-scroll-page">
          <PointsPage 
            reminders={reminders} 
            totalPoints={totalPoints}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}