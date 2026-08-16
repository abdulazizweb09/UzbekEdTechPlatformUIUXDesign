import { Link } from 'react-router';
import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import {
  TrendingUp,
  Trophy,
  Target,
  Zap,
  Clock,
  Award,
  BookOpen,
  Brain,
  Flame,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function StudentDashboard() {
  const { currentUser, questions, userAnswers } = useApp();

  const answeredQuestions = userAnswers.size;
  const correctAnswers = Array.from(userAnswers.values()).filter(a => a.isCorrect).length;
  const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

  const dailyGoal = 10;
  const todayAnswered = 3;

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Assalomu alaykum, {currentUser?.name || 'O\'quvchi'}! 👋
          </h1>
          <p className="text-gray-600">O'rganishni davom ettiring va yangi yutuqlarga erishing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Trophy className="size-6" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentUser?.xp || 0}</div>
                <div className="text-sm opacity-90">XP</div>
              </div>
            </div>
            <div className="text-sm opacity-90">Umumiy tajriba</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Star className="size-6" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentUser?.level || 1}</div>
                <div className="text-sm opacity-90">Daraja</div>
              </div>
            </div>
            <div className="text-sm opacity-90">Joriy daraja</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Target className="size-6" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{accuracy.toFixed(0)}%</div>
                <div className="text-sm opacity-90">Aniqlik</div>
              </div>
            </div>
            <div className="text-sm opacity-90">To'g'ri javoblar</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Flame className="size-6" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentUser?.streak || 0}</div>
                <div className="text-sm opacity-90">Kun</div>
              </div>
            </div>
            <div className="text-sm opacity-90">Faollik ketma-ketligi</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Tezkor harakat</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/student/savollar">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                      <Brain className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold mb-1">Tasodifiy savol</h3>
                    <p className="text-sm text-gray-600">Mashq qilishni boshlang</p>
                  </Card>
                </Link>

                <Link to="/student/test/practice">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <div className="size-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3">
                      <BookOpen className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold mb-1">Amaliyot testi</h3>
                    <p className="text-sm text-gray-600">15 savollik test</p>
                  </Card>
                </Link>

                <Link to="/student/test/timed">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                    <div className="size-12 bg-pink-600 rounded-xl flex items-center justify-center mb-3">
                      <Clock className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold mb-1">Vaqtli test</h3>
                    <p className="text-sm text-gray-600">20 daqiqa muddat</p>
                  </Card>
                </Link>

                <Link to="/student/test/dtm">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <div className="size-12 bg-orange-600 rounded-xl flex items-center justify-center mb-3">
                      <Award className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold mb-1">DTM simulyatori</h3>
                    <p className="text-sm text-gray-600">Real imtihon rejimi</p>
                  </Card>
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Kunlik maqsad</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bugun hal qilingan savollar</span>
                  <span className="font-bold">
                    {todayAnswered} / {dailyGoal}
                  </span>
                </div>
                <Progress value={(todayAnswered / dailyGoal) * 100} className="h-3" />
                <p className="text-sm text-gray-600">
                  Yana {dailyGoal - todayAnswered} ta savol hal qiling!
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">O'rganishni davom ettiring</h2>
              <div className="space-y-3">
                <Link to="/student/courses">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="size-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Matematika asoslari</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={45} className="h-2 flex-1" />
                        <span className="text-sm text-gray-600">45%</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/student/courses">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="size-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Fizika asoslari</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={23} className="h-2 flex-1" />
                        <span className="text-sm text-gray-600">23%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Reyting</h2>
                <Link to="/student/leaderboard">
                  <Button variant="ghost" size="sm">Ko'rish</Button>
                </Link>
              </div>
              <div className="space-y-2 mb-4">
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-300">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-yellow-700">#{currentUser?.rank || 999}</div>
                  <div className="text-sm text-yellow-700">Sizning o'rningiz</div>
                </div>
              </div>
              <Link to="/student/leaderboard">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Trophy className="size-4 mr-2" />
                  To'liq reyting
                </Button>
              </Link>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">So'nggi yutuqlar</h2>
              <div className="space-y-3">
                {currentUser?.badges.slice(0, 3).map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-3xl">{badge}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">Yangi nishon</div>
                      <div className="text-xs text-gray-600">3 kun oldin</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/student/achievements">
                <Button variant="outline" className="w-full mt-4">
                  Barcha yutuqlar
                </Button>
              </Link>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Haftalik vazifa</h3>
                  <p className="text-sm text-gray-600">50 ta savol hal qiling</p>
                </div>
              </div>
              <Progress value={60} className="h-2 mb-2" />
              <p className="text-sm text-gray-600">30/50 bajarildi</p>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
