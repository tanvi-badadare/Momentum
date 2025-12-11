import { Trophy, Star, Zap, Flame, TrendingUp, Award, Users, Target } from 'lucide-react';
import { Reminder } from '../App';

interface PointsPageProps {
  reminders: Reminder[];
  totalPoints: number;
  isDarkMode: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
}

export function PointsPage({ reminders, totalPoints, isDarkMode }: PointsPageProps) {
  const completedCount = reminders.filter(r => r.completed).length;
  const streak = calculateStreak(reminders);
  const level = Math.floor(totalPoints / 100) + 1;
  const pointsToNextLevel = 100 - (totalPoints % 100);

  const achievements: Achievement[] = [
    { id: '1', name: 'First Step', description: 'Complete your first task', icon: '🎯', unlocked: completedCount >= 1, points: 10 },
    { id: '2', name: 'On Fire', description: 'Complete 5 tasks', icon: '🔥', unlocked: completedCount >= 5, points: 50 },
    { id: '3', name: 'Champion', description: 'Complete 10 tasks', icon: '🏆', unlocked: completedCount >= 10, points: 100 },
    { id: '4', name: 'Streak Master', description: '3 day streak', icon: '⚡', unlocked: streak >= 3, points: 75 },
    { id: '5', name: 'Productivity Pro', description: 'Complete 20 tasks', icon: '⭐', unlocked: completedCount >= 20, points: 200 },
  ];

  const recentCompletions = reminders
    .filter(r => r.completed)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900' : 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'}`}>
      <div className={`max-w-md mx-auto min-h-screen shadow-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/30' : 'bg-white/95 backdrop-blur-sm border-b border-purple-200'}`}>
          <div className="px-4 py-4">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              Points & Achievements
            </h1>
          </div>
        </div>

        <div className="px-4 pb-24 space-y-6 pt-4">
          {/* Points Card */}
          <div className={`rounded-3xl p-6 shadow-lg ${isDarkMode ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30' : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-purple-600'}`}>Total Points</p>
                <h2 className={`text-4xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
                  {totalPoints.toLocaleString()}
                </h2>
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-500/30' : 'bg-purple-200'}`}>
                <Star className={`size-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                  Level {level}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-purple-300/60' : 'text-purple-600/70'}`}>
                  {pointsToNextLevel} pts to next level
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-200'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                  style={{ width: `${((totalPoints % 100) / 100) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`rounded-2xl p-4 text-center ${isDarkMode ? 'bg-slate-800 border border-cyan-500/30' : 'bg-white border border-slate-200'}`}>
              <Target className={`size-6 mx-auto mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{completedCount}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-cyan-300/60' : 'text-slate-500'}`}>Completed</p>
            </div>
            <div className={`rounded-2xl p-4 text-center ${isDarkMode ? 'bg-slate-800 border border-orange-500/30' : 'bg-white border border-slate-200'}`}>
              <Flame className={`size-6 mx-auto mb-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{streak}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-300/60' : 'text-slate-500'}`}>Day Streak</p>
            </div>
            <div className={`rounded-2xl p-4 text-center ${isDarkMode ? 'bg-slate-800 border border-pink-500/30' : 'bg-white border border-slate-200'}`}>
              <TrendingUp className={`size-6 mx-auto mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{level}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-pink-300/60' : 'text-slate-500'}`}>Level</p>
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className={`size-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Achievements</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-2xl p-4 border-2 transition-all ${
                    achievement.unlocked
                      ? isDarkMode
                        ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50 shadow-lg'
                        : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 shadow-md'
                      : isDarkMode
                      ? 'bg-slate-800/50 border-slate-700 opacity-60'
                      : 'bg-slate-100 border-slate-300 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-purple-300/70' : 'text-slate-600'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <div className={`mt-2 text-xs font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      +{achievement.points} pts
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Completions Feed */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className={`size-5 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentCompletions.length === 0 ? (
                <div className={`rounded-2xl p-6 text-center ${isDarkMode ? 'bg-slate-800/50 border border-cyan-500/30' : 'bg-slate-100 border border-slate-200'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-cyan-300/60' : 'text-slate-500'}`}>
                    Complete tasks to see your activity feed!
                  </p>
                </div>
              ) : (
                recentCompletions.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`rounded-2xl p-4 ${isDarkMode ? 'bg-slate-800 border border-cyan-500/30' : 'bg-white border border-slate-200'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-green-500/20 border border-green-500/50' : 'bg-green-100'}`}>
                        <Trophy className={`size-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            Task Completed! 🎉
                          </p>
                          <span className={`text-xs font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                            +10 pts
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${isDarkMode ? 'text-cyan-200/80' : 'text-slate-600'}`}>
                          {reminder.title}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                          {new Date(reminder.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Motivation Message */}
          <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30' : 'bg-gradient-to-r from-cyan-100 to-purple-100 border border-cyan-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-white/10' : 'bg-white/50'}`}>
                <Users className={`size-6 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`} />
              </div>
              <div>
                <p className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Keep Going! 💪
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-cyan-200/80' : 'text-slate-600'}`}>
                  Every task you complete brings you closer to your goals. You're doing amazing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateStreak(reminders: Reminder[]): number {
  const completed = reminders.filter(r => r.completed);
  if (completed.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let checkDate = new Date(today);

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const hasCompletion = completed.some(r => {
      const completedDate = new Date(r.createdAt);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.toISOString().split('T')[0] === dateStr;
    });

    if (hasCompletion) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

