import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Trophy, Star, Flame, Target, Edit2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');

  const handleSave = () => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, name });
      toast.success('Profil yangilandi!');
      setIsEditing(false);
    }
  };

  const levelProgress = currentUser ? ((currentUser.xp % 1000) / 1000) * 100 : 0;

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="size-32 border-4 border-white shadow-xl">
              <AvatarFallback className="text-5xl">{currentUser?.avatar || '👤'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xl font-bold"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm">Saqlash</Button>
                    <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">
                      Bekor qilish
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <h1 className="text-3xl font-bold">{currentUser?.name}</h1>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="size-8"
                    >
                      <Edit2 className="size-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">{currentUser?.email}</p>
                  <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                    <Badge className="bg-blue-600">Level {currentUser?.level}</Badge>
                    <Badge variant="outline">Reyting: #{currentUser?.rank}</Badge>
                    <Badge className="bg-purple-600">{currentUser?.xp} XP</Badge>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-4">
              {currentUser?.badges.map((badge, i) => (
                <div key={i} className="text-4xl">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Keyingi darajaga</span>
              <span className="text-sm font-bold">{currentUser?.xp || 0} / {Math.ceil((currentUser?.level || 1) / 10) * 1000} XP</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-yellow-100">
            <Trophy className="size-10 text-yellow-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-yellow-700 mb-1">{currentUser?.score}</div>
            <div className="text-sm text-yellow-700">Umumiy ball</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
            <Star className="size-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-blue-700 mb-1">{currentUser?.level}</div>
            <div className="text-sm text-blue-700">Daraja</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100">
            <Flame className="size-10 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-orange-700 mb-1">{currentUser?.streak}</div>
            <div className="text-sm text-orange-700">Kunlik ketma-ketlik</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
            <Target className="size-10 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-700 mb-1">
              {currentUser?.totalQuestions
                ? ((currentUser.correctAnswers / currentUser.totalQuestions) * 100).toFixed(0)
                : 0}
              %
            </div>
            <div className="text-sm text-green-700">Aniqlik</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Statistika</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jami savollar</span>
                <span className="font-bold">{currentUser?.totalQuestions || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To'g'ri javoblar</span>
                <span className="font-bold text-green-600">{currentUser?.correctAnswers || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Noto'g'ri javoblar</span>
                <span className="font-bold text-red-600">
                  {(currentUser?.totalQuestions || 0) - (currentUser?.correctAnswers || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nishonlar</span>
                <span className="font-bold">{currentUser?.badges.length || 0}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Yutuqlar</h2>
            <div className="grid grid-cols-4 gap-3">
              {currentUser?.badges.map((badge, i) => (
                <div
                  key={i}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl text-center border-2 border-yellow-300"
                >
                  <div className="text-4xl mb-1">{badge}</div>
                  <div className="text-xs text-yellow-700">Nishon {i + 1}</div>
                </div>
              ))}
              {[...Array(8 - (currentUser?.badges.length || 0))].map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="p-4 bg-gray-100 rounded-xl text-center border-2 border-gray-300"
                >
                  <div className="text-4xl opacity-30 mb-1">🔒</div>
                  <div className="text-xs text-gray-500">Qulflangan</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Hisobot sozlamalari</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={currentUser?.email} disabled className="mt-2" />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Input id="role" value={currentUser?.role} disabled className="mt-2" />
            </div>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
}
