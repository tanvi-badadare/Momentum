import { useState } from 'react';
import {
  Trash2,
  Calendar,
  Clock,
  Tag,
  Edit2,
  Check,
  X,
} from 'lucide-react';
import { Reminder } from '../App';

interface ReminderCardProps {
  reminder: Reminder;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Reminder>) => void;
  isDarkMode: boolean;
}

const categoryColors: Record<string, string> = {
  Personal: 'bg-blue-100 text-blue-700',
  Work: 'bg-purple-100 text-purple-700',
  Health: 'bg-green-100 text-green-700',
  Shopping: 'bg-orange-100 text-orange-700',
  Finance: 'bg-yellow-100 text-yellow-700',
  Other: 'bg-gray-100 text-gray-700',
};

export function ReminderCard({
  reminder,
  onToggleComplete,
  onDelete,
  onEdit,
  isDarkMode,
}: ReminderCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(reminder.title);
  const [editDescription, setEditDescription] = useState(reminder.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(reminder.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(reminder.title);
    setEditDescription(reminder.description || '');
    setIsEditing(false);
  };

  const isOverdue = reminder.dueDate && reminder.dueDate < new Date().toISOString().split('T')[0] && !reminder.completed;

  return (
    <div
      className={`rounded-2xl shadow-sm border p-4 transition-all active:scale-98 ${
        reminder.completed ? 'opacity-60' : ''
      } ${isOverdue 
        ? isDarkMode 
          ? 'border-orange-500 bg-orange-900/20' 
          : 'border-red-300 bg-red-50/30' 
        : isDarkMode
        ? 'bg-slate-800 border-cyan-500/30'
        : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex gap-3">
        <button
          onClick={() => onToggleComplete(reminder.id)}
          className="mt-0.5 flex-shrink-0"
        >
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              reminder.completed
                ? 'bg-green-500 border-green-500'
                : isDarkMode
                ? 'border-cyan-500 active:border-orange-400'
                : 'border-slate-300 active:border-cyan-500'
            }`}
          >
            {reminder.completed && <Check className="size-4 text-white" />}
          </div>
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white' : 'border-slate-300'}`}
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add details..."
                rows={2}
                className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-base ${isDarkMode ? 'bg-slate-700 border-cyan-500/30 text-white placeholder-cyan-300/40' : 'border-slate-300'}`}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-orange-500 text-white rounded-xl active:opacity-90 flex items-center justify-center gap-1.5"
                >
                  <Check className="size-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 ${isDarkMode ? 'bg-slate-700 text-cyan-100 active:bg-slate-600 border border-cyan-500/30' : 'bg-slate-200 text-slate-700 active:bg-slate-300'}`}
                >
                  <X className="size-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3
                  className={`text-base ${
                    reminder.completed 
                      ? isDarkMode 
                        ? 'line-through text-slate-500' 
                        : 'line-through text-slate-400' 
                      : isDarkMode
                      ? 'text-cyan-50'
                      : 'text-slate-800'
                  }`}
                >
                  {reminder.title}
                </h3>
                <div className="flex gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-cyan-400 active:text-cyan-300 active:bg-cyan-900/30' : 'text-slate-400 active:text-cyan-600 active:bg-cyan-50'}`}
                  >
                    <Edit2 className="size-4" />
                  </button>
                  <button
                    onClick={() => onDelete(reminder.id)}
                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-orange-400 active:text-orange-300 active:bg-orange-900/30' : 'text-slate-400 active:text-red-600 active:bg-red-50'}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {reminder.description && (
                <p className={`text-sm mb-2 leading-relaxed ${isDarkMode ? 'text-cyan-200/80' : 'text-slate-600'}`}>{reminder.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                    categoryColors[reminder.category] || categoryColors.Other
                  }`}
                >
                  <Tag className="size-3" />
                  {reminder.category}
                </span>

                {reminder.dueDate && (
                  <span
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${
                      isOverdue 
                        ? isDarkMode
                          ? 'text-orange-200 bg-orange-500/20 border border-orange-500/30'
                          : 'text-red-600 bg-red-100'
                        : isDarkMode
                        ? 'text-cyan-200 bg-cyan-500/20 border border-cyan-500/30'
                        : 'text-slate-500 bg-slate-100'
                    }`}
                  >
                    <Calendar className="size-3" />
                    {new Date(reminder.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}

                {reminder.dueTime && (
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${isDarkMode ? 'text-cyan-200 bg-cyan-500/20 border border-cyan-500/30' : 'text-slate-500 bg-slate-100'}`}>
                    <Clock className="size-3" />
                    {reminder.dueTime}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}