import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Clock, Calendar, Award, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HistoryPage() {
  const { testResults } = useApp();

  const allAnswers = [
    { date: '25.04.2026', time: '14:30', type: 'Tasodifiy savol', subject: 'Matematika', result: 'to\'g\'ri' },
    { date: '25.04.2026', time: '14:25', type: 'Tasodifiy savol', subject: 'Fizika', result: 'noto\'g\'ri' },
    { date: '25.04.2026', time: '14:20', type: 'Tasodifiy savol', subject: 'Kimyo', result: 'to\'g\'ri' },
    { date: '24.04.2026', time: '18:45', type: 'Amaliyot testi', subject: 'Barcha fanlar', result: 'to\'g\'ri' },
    { date: '24.04.2026', time: '16:30', type: 'Tasodifiy savol', subject: 'Biologiya', result: 'to\'g\'ri' },
  ];

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Faoliyat tarixi</h1>
          <p className="text-gray-600">O'tgan testlar va javoblar</p>
        </div>

        {testResults.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Yakunlangan testlar</h2>
            <div className="grid grid-cols-1 gap-4">
              {testResults.map((result) => (
                <Card key={result.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="size-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Award className="size-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{result.mode}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            {result.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {Math.floor(result.timeSpent / 60)} daqiqa
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.score}%</div>
                        <div className="text-xs text-gray-600">Ball</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                        <div className="text-xs text-gray-600">To'g'ri</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {result.totalQuestions - result.correctAnswers}
                        </div>
                        <div className="text-xs text-gray-600">Noto'g'ri</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4">Barcha javoblar</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm">Sana</th>
                    <th className="px-6 py-3 text-left text-sm">Vaqt</th>
                    <th className="px-6 py-3 text-left text-sm">Turi</th>
                    <th className="px-6 py-3 text-left text-sm">Fan</th>
                    <th className="px-6 py-3 text-left text-sm">Natija</th>
                  </tr>
                </thead>
                <tbody>
                  {allAnswers.map((answer, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 text-gray-400" />
                          {answer.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-gray-400" />
                          {answer.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{answer.type}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-600">{answer.subject}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        {answer.result === 'to\'g\'ri' ? (
                          <Badge className="bg-green-600">✓ To'g'ri</Badge>
                        ) : (
                          <Badge className="bg-red-600">✗ Noto'g'ri</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
