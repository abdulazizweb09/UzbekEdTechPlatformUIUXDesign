import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Home,
  HelpCircle,
  Trophy,
  TrendingUp,
  User,
  Clock,
  Bookmark,
  X,
  Award,
  BookOpen,
  FileText,
  LogOut,
  Menu,
  Bell,
  Flame,
} from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { useState } from 'react';
import { toast } from 'sonner';

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    toast.success('Tizimdan chiqdingiz');
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Asosiy', path: '/student' },
    { icon: HelpCircle, label: 'Savollar', path: '/student/savollar' },
    { icon: Trophy, label: 'Reyting', path: '/student/leaderboard' },
    { icon: TrendingUp, label: 'Tahlil', path: '/student/analytics' },
    { icon: Clock, label: 'Tarix', path: '/student/history' },
    { icon: Bookmark, label: 'Saqlangan', path: '/student/saved' },
    { icon: X, label: 'Xato javoblar', path: '/student/wrong-answers' },
    { icon: Award, label: 'Yutuqlar', path: '/student/achievements' },
    { icon: BookOpen, label: 'Kurslar', path: '/student/courses' },
    { icon: FileText, label: 'Uyga vazifa', path: '/student/homework' },
  ];

  const levelProgress = currentUser ? ((currentUser.xp % 1000) / 1000) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="size-6" />
            </Button>
            <Link to="/student" className="flex items-center gap-2">
              <div className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="size-5 text-white" />
              </div>
              <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduTest
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
              <Flame className="size-4" />
              <span className="font-bold">{currentUser?.streak || 0} kun</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Link to="/student/profile">
              <Button variant="ghost" className="gap-2">
                <Avatar className="size-8">
                  <AvatarFallback>{currentUser?.avatar || '👤'}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{currentUser?.name || 'O\'quvchi'}</div>
                  <div className="text-xs text-gray-500">Level {currentUser?.level || 1}</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white/80 backdrop-blur-md border-r z-40 overflow-y-auto transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="size-12">
              <AvatarFallback className="text-2xl">{currentUser?.avatar || '👤'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-bold">{currentUser?.name || 'O\'quvchi'}</div>
              <div className="text-sm text-gray-600">Level {currentUser?.level || 1}</div>
            </div>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <div className="text-xs text-gray-600 mt-1">{currentUser?.xp || 0} XP</div>
        </div>

        <nav className="p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="size-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
            Chiqish
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
