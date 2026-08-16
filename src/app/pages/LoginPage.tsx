import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const { setCurrentUser, leaderboard } = useApp();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: role,
      avatar: '👤',
      xp: 2500,
      level: 12,
      rank: 15,
      streak: 7,
      score: 1250,
      badges: ['🎯', '⭐'],
      correctAnswers: 125,
      totalQuestions: 150,
    };

    setCurrentUser(mockUser);
    toast.success('Muvaffaqiyatli kirdingiz!');

    if (role === 'student') {
      navigate('/student');
    } else if (role === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="size-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="size-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduTest
          </span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Xush kelibsiz!</h1>
        <p className="text-center text-gray-600 mb-8">Hisobingizga kiring</p>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="role">Rol</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button
                type="button"
                variant={role === 'student' ? 'default' : 'outline'}
                onClick={() => setRole('student')}
                className={role === 'student' ? 'bg-blue-600' : ''}
              >
                O'quvchi
              </Button>
              <Button
                type="button"
                variant={role === 'teacher' ? 'default' : 'outline'}
                onClick={() => setRole('teacher')}
                className={role === 'teacher' ? 'bg-purple-600' : ''}
              >
                O'qituvchi
              </Button>
              <Button
                type="button"
                variant={role === 'admin' ? 'default' : 'outline'}
                onClick={() => setRole('admin')}
                className={role === 'admin' ? 'bg-pink-600' : ''}
              >
                Admin
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Parol</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline block mb-6">
          Parolni unutdingizmi?
        </Link>

        <Button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4"
        >
          Kirish
        </Button>

        <p className="text-center text-sm text-gray-600">
          Hisobingiz yo'qmi?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>

        <div className="mt-6 pt-6 border-t text-center text-xs text-gray-500">
          Demo uchun istalgan email va parol kiriting
        </div>
      </Card>
    </div>
  );
}
