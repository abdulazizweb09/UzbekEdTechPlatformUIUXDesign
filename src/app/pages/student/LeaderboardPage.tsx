import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Trophy, Medal, Award, TrendingUp, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LeaderboardPage() {
  const { leaderboard, currentUser } = useApp();

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reyting jadval</h1>
          <p className="text-gray-600">Eng zo'r o'quvchilar bilan raqobatlashing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((user, index) => (
            <Card
              key={user.id}
              className={`p-6 text-center ${
                index === 0
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400'
                  : index === 1
                  ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400'
                  : 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400'
              }`}
            >
              <div className="text-6xl mb-3">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <Avatar className="size-16 mx-auto mb-3">
                <AvatarFallback className="text-2xl">{user.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg mb-1">{user.name}</h3>
              <div className="text-2xl font-bold mb-2">{user.xp.toLocaleString()} XP</div>
              <div className="flex items-center justify-center gap-1">
                {user.badges.map((badge, i) => (
                  <span key={i} className="text-xl">
                    {badge}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {currentUser && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-blue-600">#{currentUser.rank}</div>
              <Avatar className="size-12">
                <AvatarFallback className="text-xl">{currentUser.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-bold">{currentUser.name}</div>
                <div className="text-sm text-gray-600">Sizning o'rningiz</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl">{currentUser.xp.toLocaleString()} XP</div>
                <div className="text-sm text-gray-600">Level {currentUser.level}</div>
              </div>
            </div>
          </Card>
        )}

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">O'rin</th>
                  <th className="px-6 py-3 text-left text-sm">O'quvchi</th>
                  <th className="px-6 py-3 text-left text-sm">Level</th>
                  <th className="px-6 py-3 text-left text-sm">XP</th>
                  <th className="px-6 py-3 text-left text-sm">Aniqlik</th>
                  <th className="px-6 py-3 text-left text-sm">Ketma-ketlik</th>
                  <th className="px-6 py-3 text-left text-sm">Nishonlar</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => {
                  const isCurrentUser = currentUser?.id === user.id;
                  const accuracy = user.totalQuestions > 0 ? ((user.correctAnswers / user.totalQuestions) * 100).toFixed(0) : 0;
                  return (
                    <tr
                      key={user.id}
                      className={`border-b hover:bg-gray-50 ${
                        isCurrentUser ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index < 3 ? (
                            index === 0 ? (
                              <Trophy className="size-5 text-yellow-600" />
                            ) : index === 1 ? (
                              <Medal className="size-5 text-gray-600" />
                            ) : (
                              <Award className="size-5 text-orange-600" />
                            )
                          ) : null}
                          <span className="font-bold">#{user.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-purple-600">{user.level}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold">{user.xp.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="size-4 text-green-600" />
                          <span>{accuracy}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Flame className="size-4 text-orange-600" />
                          <span>{user.streak} kun</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {user.badges.map((badge, i) => (
                            <span key={i} className="text-lg">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
}
