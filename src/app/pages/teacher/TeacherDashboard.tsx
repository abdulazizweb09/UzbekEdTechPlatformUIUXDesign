import { Link, useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, FileText, TrendingUp, Award, LogOut, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

export default function TeacherDashboard() {
  const { setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    toast.success('Tizimdan chiqdingiz');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <BookOpen className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold">O'qituvchi paneli</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="size-4" />
            Chiqish
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">O'qituvchi Dashboard</h1>
          <p className="text-gray-600">O'quvchilaringizni boshqaring va kuzating</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Users className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">124</div>
            <div className="opacity-90">Mening o'quvchilarim</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <FileText className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">18</div>
            <div className="opacity-90">Faol vazifalar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <TrendingUp className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">87%</div>
            <div className="opacity-90">O'rtacha bajarilish</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <Award className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">92%</div>
            <div className="opacity-90">O'rtacha ball</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/teacher/assignments">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <FileText className="size-16 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Vazifalar boshqaruvi</h3>
              <p className="text-gray-600">Uyga vazifa va testlarni boshqarish</p>
            </Card>
          </Link>

          <Link to="/teacher/students">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <Users className="size-16 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">O'quvchilar</h3>
              <p className="text-gray-600">O'quvchilarning natijalarini kuzatish</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
