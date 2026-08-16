import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const { currentUser, testResults, userAnswers } = useApp();

  const weeklyData = [
    { day: 'Dush', questions: 12 },
    { day: 'Sesh', questions: 18 },
    { day: 'Chor', questions: 15 },
    { day: 'Pay', questions: 22 },
    { day: 'Juma', questions: 20 },
    { day: 'Shan', questions: 8 },
    { day: 'Yak', questions: 14 },
  ];

  const subjectData = [
    { subject: 'Matematika', correct: 85, total: 100 },
    { subject: 'Fizika', correct: 72, total: 95 },
    { subject: 'Kimyo', correct: 68, total: 80 },
    { subject: 'Biologiya', correct: 90, total: 105 },
    { subject: 'Tarix', correct: 78, total: 90 },
  ];

  const performanceData = [
    { name: 'To\'g\'ri', value: currentUser?.correctAnswers || 0, color: '#10b981' },
    { name: 'Noto\'g\'ri', value: (currentUser?.totalQuestions || 0) - (currentUser?.correctAnswers || 0), color: '#ef4444' },
  ];

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tahlil va statistika</h1>
          <p className="text-gray-600">O'zingizning o'sishingizni kuzatib boring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Target className="size-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  {currentUser?.totalQuestions
                    ? ((currentUser.correctAnswers / currentUser.totalQuestions) * 100).toFixed(0)
                    : 0}
                  %
                </div>
                <div className="text-sm text-blue-700">Umumiy aniqlik</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="size-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-700">{currentUser?.totalQuestions || 0}</div>
                <div className="text-sm text-purple-700">Jami savollar</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 bg-pink-600 rounded-xl flex items-center justify-center">
                <Award className="size-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-700">{testResults.length}</div>
                <div className="text-sm text-pink-700">Testlar</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 bg-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="size-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-700">45</div>
                <div className="text-sm text-orange-700">O'rtacha vaqt (s)</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Haftalik faollik</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="questions" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">To'g'ri va noto'g'ri javoblar</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Fanlar bo'yicha natijalar</h2>
          <div className="space-y-4">
            {subjectData.map((subject) => {
              const accuracy = (subject.correct / subject.total) * 100;
              return (
                <div key={subject.subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{subject.subject}</span>
                    <span className="text-sm text-gray-600">
                      {subject.correct}/{subject.total} ({accuracy.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={accuracy} className="h-3" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">O'sish dinamikasi</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { week: 'Hafta 1', score: 45 },
                { week: 'Hafta 2', score: 58 },
                { week: 'Hafta 3', score: 72 },
                { week: 'Hafta 4', score: 85 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </StudentLayout>
  );
}
