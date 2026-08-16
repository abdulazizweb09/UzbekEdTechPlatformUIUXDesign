import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { BookOpen, Play, CheckCircle2, Lock } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'Matematika asoslari',
      description: 'Algebradan geometriyagacha - barcha asosiy mavzular',
      progress: 45,
      lessons: 24,
      completed: 11,
      category: 'Matematika',
      difficulty: 'O\'rta',
    },
    {
      id: 2,
      title: 'Fizika - Mexanika',
      description: 'Harakat, kuch va energiya qonunlari',
      progress: 23,
      lessons: 18,
      completed: 4,
      category: 'Fizika',
      difficulty: 'Qiyin',
    },
    {
      id: 3,
      title: 'Kimyo - Organik kimyo',
      description: 'Uglevodlar va ularning hosilalari',
      progress: 67,
      lessons: 15,
      completed: 10,
      category: 'Kimyo',
      difficulty: 'O\'rta',
    },
    {
      id: 4,
      title: 'Biologiya - Genetika',
      description: 'DNK, genlar va irsiyat',
      progress: 12,
      lessons: 20,
      completed: 2,
      category: 'Biologiya',
      difficulty: 'Qiyin',
    },
    {
      id: 5,
      title: 'Ingliz tili - Beginner',
      description: 'Boshlang\'ich darajadagi ingliz tili',
      progress: 0,
      lessons: 30,
      completed: 0,
      category: 'Ingliz tili',
      difficulty: 'Oson',
      locked: true,
    },
  ];

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kurslar</h1>
          <p className="text-gray-600">Tizimli o\'rganish uchun tuzilgan kurslar</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className={`p-6 hover:shadow-xl transition-shadow ${
                course.locked ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div
                  className={`size-24 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    course.locked
                      ? 'bg-gray-200'
                      : 'bg-gradient-to-br from-blue-600 to-purple-600'
                  }`}
                >
                  {course.locked ? (
                    <Lock className="size-12 text-gray-400" />
                  ) : (
                    <BookOpen className="size-12 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                      <p className="text-gray-600 mb-3">{course.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-blue-600">{course.category}</Badge>
                        <Badge
                          className={
                            course.difficulty === 'Oson'
                              ? 'bg-green-600'
                              : course.difficulty === 'O\'rta'
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }
                        >
                          {course.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {course.completed} / {course.lessons} dars
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {!course.locked ? (
                    <>
                      <Progress value={course.progress} className="mb-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{course.progress}% bajarildi</span>
                        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                          <Play className="size-4" />
                          {course.progress > 0 ? 'Davom etish' : 'Boshlash'}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                      <Lock className="size-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Kursni ochish uchun Level 15 ga yeting</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="size-12 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">Kurslarni tugatish uchun mukofot!</h3>
              <p className="text-gray-700">
                Har bir kursni muvaffaqiyatli tugatganingizda maxsus sertifikat va nishon olasiz.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
}
