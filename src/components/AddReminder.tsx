import { useState } from 'react';
import { Plus, Calendar, Tag, AlignLeft } from 'lucide-react';
import { Reminder } from '../App';

interface AddReminderProps {
  onAdd: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
  isDarkMode: boolean;
}

const categories = ['Personal', 'Work', 'Health', 'Shopping', 'Finance', 'Other'];

export function AddReminder({ onAdd, isDarkMode }: AddReminderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      dueTime: dueTime || undefined,
      category,
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setCategory('Personal');
    setIsExpanded(false);
  };

  return (
    <div className={`rounded-2xl shadow-md border p-4 mb-5 ${isDarkMode ? 'bg-slate-800 border-cyan-500/30' : 'bg-white border-slate-200'}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What do you need to do?"
            className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white placeholder-cyan-300/40' : 'border-slate-300'}`}
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="bg-gradient-to-r from-cyan-500 to-orange-600 text-white px-5 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Plus className="size-6" />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3 animate-in fade-in duration-200">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              rows={2}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white placeholder-cyan-300/40' : 'border-slate-300'}`}
            />

            <div className="space-y-2">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white' : 'border-slate-300'}`}
              />

              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white' : 'border-slate-300'}`}
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white' : 'bg-white border-slate-300'}`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
    </div>
  );
}