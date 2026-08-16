import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { ArrowLeft, Search, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function UserManagementPage() {
  const { leaderboard } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Foydalanuvchilar boshqaruvi</h1>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input placeholder="Foydalanuvchilarni qidirish..." className="pl-10" />
          </div>
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Foydalanuvchi</th>
                <th className="px-6 py-3 text-left text-sm">Rol</th>
                <th className="px-6 py-3 text-left text-sm">Level</th>
                <th className="px-6 py-3 text-left text-sm">XP</th>
                <th className="px-6 py-3 text-left text-sm">Aniqlik</th>
                <th className="px-6 py-3 text-left text-sm">Harakatlar</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => {
                const accuracy = user.totalQuestions > 0 ? ((user.correctAnswers / user.totalQuestions) * 100).toFixed(0) : 0;
                return (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
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
                      <Badge className="bg-blue-600">{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-purple-600">{user.level}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold">{user.xp.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">{accuracy}%</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
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
