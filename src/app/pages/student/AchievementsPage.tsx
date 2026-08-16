import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Trophy, Star, Zap, Target, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AchievementsPage() {
  const { currentUser } = useApp();

  const achievements = [
    { id: 1, icon: '🎯', title: 'Birinchi qad', description: 'Birinchi savolga javob bering', unlocked: true, progress: 100 },
    { id: 2, icon: '🔥', title: '7 kunlik seriya', description: '7 kun ketma-ket mashq qiling', unlocked: currentUser && currentUser.streak >= 7, progress: currentUser ? Math.min((currentUser.streak / 7) * 100, 100) : 0 },
    { id: 3, icon: '⭐', title: '100 ta savol', description: '100 ta savolga javob bering', unlocked: currentUser && currentUser.totalQuestions >= 100, progress: currentUser ? Math.min((currentUser.totalQuestions / 100) * 100, 100) : 0 },
    { id: 4, icon: '🏆', title: 'Top 10', description: 'Reyting jadvalida top 10 ga kiring', unlocked: currentUser && currentUser.rank <= 10, progress: currentUser && currentUser.rank <= 10 ? 100 : 0 },
    { id: 5, icon: '💯', title: 'Mukammal natija', description: 'Testda 100% ball oling', unlocked: false, progress: 0 },
    { id: 6, icon: '📚', title: 'Bilimdon', description: '500 ta savolga javob bering', unlocked: false, progress: currentUser ? Math.min((currentUser.totalQuestions / 500) * 100, 100) : 0 },
    { id: 7, icon: '⚡', title: 'Tez javob', description: '30 soniyadan kam vaqtda 10 ta savolga javob bering', unlocked: false, progress: 0 },
    { id: 8, icon: '🎓', title: 'Magistr', description: 'Level 20 ga yeting', unlocked: currentUser && currentUser.level >= 20, progress: currentUser ? Math.min((currentUser.level / 20) * 100, 100) : 0 },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Yutuqlar</h1>
          <p className="text-gray-600">
            {unlockedCount} / {achievements.length} yutuq ochilgan
          </p>
          <Progress value={(unlockedCount / achievements.length) * 100} className="max-w-md mx-auto mt-4 h-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-6 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 shadow-lg'
                  : 'bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-center mb-4">
                <div className={`text-6xl mb-3 ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              {!achievement.unlocked && achievement.progress > 0 && (
                <div>
                  <Progress value={achievement.progress} className="h-2 mb-1" />
                  <p className="text-xs text-center text-gray-600">{achievement.progress.toFixed(0)}%</p>
                </div>
              )}
              {achievement.unlocked && (
                <div className="flex items-center justify-center gap-2 text-yellow-700 font-bold">
                  <Trophy className="size-5" />
                  Ochilgan
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl font-bold mb-4">Sizning nishonlaringiz</h2>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {currentUser?.badges.map((badge, i) => (
              <div key={i} className="text-6xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                {badge}
              </div>
            ))}
            {(!currentUser?.badges || currentUser.badges.length === 0) && (
              <p className="text-gray-600">Hali nishonlar yo'q. Yutuqlarga erishing!</p>
            )}
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
}
