import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function StudentProgressPage() {
  const { leaderboard } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">O'quvchilar rivojlanishi</h1>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm">O'quvchi</th>
                <th className="px-6 py-3 text-left text-sm">Level</th>
                <th className="px-6 py-3 text-left text-sm">Aniqlik</th>
                <th className="px-6 py-3 text-left text-sm">Jami testlar</th>
                <th className="px-6 py-3 text-left text-sm">Holat</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.slice(0, 10).map((student) => {
                const accuracy = student.totalQuestions > 0 ? ((student.correctAnswers / student.totalQuestions) * 100).toFixed(0) : 0;
                return (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback>{student.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-purple-600">{student.level}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="size-4 text-green-600" />
                        <span>{accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{student.totalQuestions}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-600">Faol</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
