import { Link, useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, FileQuestion, TrendingUp, Award, LogOut, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { setCurrentUser, questions } = useApp();
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
            <div className="size-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="size-4" />
            Chiqish
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platformani boshqarish paneli</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Users className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">1,245</div>
            <div className="opacity-90">Jami foydalanuvchilar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <FileQuestion className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">{questions.length}</div>
            <div className="opacity-90">Savollar bazasi</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <TrendingUp className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">8,542</div>
            <div className="opacity-90">Bajarilgan testlar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <Award className="size-10 mb-3" />
            <div className="text-3xl font-bold mb-1">94%</div>
            <div className="opacity-90">O'rtacha aniqlik</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/questions">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <FileQuestion className="size-16 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Savollar boshqaruvi</h3>
              <p className="text-gray-600">Savollarni qo'shish, tahrirlash va o'chirish</p>
            </Card>
          </Link>

          <Link to="/admin/users">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <Users className="size-16 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Foydalanuvchilar</h3>
              <p className="text-gray-600">Foydalanuvchilarni boshqarish va monitoring</p>
            </Card>
          </Link>

          <Link to="/admin/analytics">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <TrendingUp className="size-16 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tahlil va hisobotlar</h3>
              <p className="text-gray-600">Batafsil statistika va tahlillar</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
