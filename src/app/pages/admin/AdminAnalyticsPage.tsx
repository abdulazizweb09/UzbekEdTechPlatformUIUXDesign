import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft, TrendingUp, Users, FileQuestion, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminAnalyticsPage() {
  const monthlyData = [
    { month: 'Yan', users: 120, tests: 450 },
    { month: 'Fev', users: 180, tests: 620 },
    { month: 'Mar', users: 245, tests: 890 },
    { month: 'Apr', users: 320, tests: 1240 },
  ];

  const subjectPopularity = [
    { subject: 'Matematika', count: 2850 },
    { subject: 'Fizika', count: 2340 },
    { subject: 'Kimyo', count: 1920 },
    { subject: 'Biologiya', count: 2120 },
    { subject: 'Tarix', count: 1560 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Tahlil va hisobotlar</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <Users className="size-10 text-blue-600 mb-3" />
            <div className="text-3xl font-bold text-blue-700 mb-1">1,245</div>
            <div className="text-sm text-blue-700">Faol foydalanuvchilar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <FileQuestion className="size-10 text-purple-600 mb-3" />
            <div className="text-3xl font-bold text-purple-700 mb-1">8,542</div>
            <div className="text-sm text-purple-700">Bajarilgan testlar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <TrendingUp className="size-10 text-pink-600 mb-3" />
            <div className="text-3xl font-bold text-pink-700 mb-1">+24%</div>
            <div className="text-sm text-pink-700">Oylik o'sish</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
            <Award className="size-10 text-orange-600 mb-3" />
            <div className="text-3xl font-bold text-orange-700 mb-1">87%</div>
            <div className="text-sm text-orange-700">O'rtacha ball</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Oylik statistika</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} name="Foydalanuvchilar" />
              <Line type="monotone" dataKey="tests" stroke="#8b5cf6" strokeWidth={3} name="Testlar" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Fanlar bo'yicha mashhurlik</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPopularity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </div>
  );
}
