import { Link } from 'react-router';
import { BookOpen, Trophy, Target, Sparkles, Users, Brain, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduTest
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="hover:text-blue-600 transition-colors">Imkoniyatlar</a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">Statistika</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Narxlar</a>
            <Link to="/login">
              <Button variant="ghost">Kirish</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Ro'yxatdan o'tish
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="size-4" />
            <span className="text-sm">O'zbekistondagi eng zamonaviy ta'lim platformasi</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            O'rganish va sinovdan o'tish
            <br />
            yangi darajada
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            DTM, olimpiada va maktab testlariga tayyorgarlik ko'rish uchun eng yaxshi platforma.
            Gamifikatsiya, reyting va professional tahlil.
          </p>
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-14 px-8">
                Bepul boshlash
              </Button>
            </Link>
            <Link to="/student">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                Demo ko'rish
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/50 backdrop-blur">
              <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">O'quvchilar</div>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur">
              <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600">Savollar</div>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur">
              <div className="text-3xl font-bold text-pink-600 mb-2">1,000+</div>
              <div className="text-gray-600">O'qituvchilar</div>
            </Card>
            <Card className="p-6 bg-white/50 backdrop-blur">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Qoniqish</div>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Asosiy imkoniyatlar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Brain className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Adaptiv testlar</h3>
              <p className="text-gray-600">Sizning darajangizga moslashuvchi savollar tizimi</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="size-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamifikatsiya</h3>
              <p className="text-gray-600">XP, darajalar, meddallar va reyting tizimi</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <div className="size-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Batafsil tahlil</h3>
              <p className="text-gray-600">Har bir mavzu bo'yicha professional tahlil</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="size-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">DTM simulyatori</h3>
              <p className="text-gray-600">Real imtihon sharoitida mashq qilish</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="size-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Raqobat rejimi</h3>
              <p className="text-gray-600">Do'stlaringiz bilan bellashish va reyting</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <div className="size-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Yuklab olish</h3>
              <p className="text-gray-600">Yutuqlaringiz uchun sertifikatlar</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <div className="size-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kurslar</h3>
              <p className="text-gray-600">Strukturalashtirilgan o'quv dasturlari</p>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="size-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI yordamchi</h3>
              <p className="text-gray-600">Sun'iy intellekt orqali shaxsiy maslahatlar</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Bugun boshlang!</h2>
          <p className="text-xl mb-8 opacity-90">
            50,000+ o'quvchi bilan birga o'rganishni boshlang
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
              Bepul ro'yxatdan o'tish
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="size-5 text-white" />
            </div>
            <span className="text-xl">EduTest</span>
          </div>
          <p className="text-gray-400">© 2026 EduTest. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
