import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { FileText, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function HomeworkPage() {
  const homeworks = [
    {
      id: 1,
      title: 'Matematika: Kvadrat tenglamalar',
      subject: 'Matematika',
      assignedBy: 'Olimova Malika',
      dueDate: '28.04.2026',
      status: 'pending',
      questions: 15,
      timeLimit: 30,
    },
    {
      id: 2,
      title: 'Fizika: Nyuton qonunlari',
      subject: 'Fizika',
      assignedBy: 'Karimov Aziz',
      dueDate: '29.04.2026',
      status: 'pending',
      questions: 20,
      timeLimit: 40,
    },
    {
      id: 3,
      title: 'Kimyo: Periodli sistema',
      subject: 'Kimyo',
      assignedBy: 'Rahmonova Dil',
      dueDate: '25.04.2026',
      status: 'overdue',
      questions: 12,
      timeLimit: 25,
    },
    {
      id: 4,
      title: 'Biologiya: Hujayra tuzilishi',
      subject: 'Biologiya',
      assignedBy: 'Toshmatova Feruza',
      dueDate: '23.04.2026',
      status: 'completed',
      questions: 18,
      timeLimit: 35,
      score: 85,
    },
  ];

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Uyga vazifa</h1>
          <p className="text-gray-600">O'qituvchilar tomonidan berilgan topshiriqlar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="text-3xl font-bold text-orange-700 mb-1">
              {homeworks.filter((h) => h.status === 'pending').length}
            </div>
            <div className="text-sm text-orange-700">Bajarilmagan</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="text-3xl font-bold text-red-700 mb-1">
              {homeworks.filter((h) => h.status === 'overdue').length}
            </div>
            <div className="text-sm text-red-700">Muddati o'tgan</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-3xl font-bold text-green-700 mb-1">
              {homeworks.filter((h) => h.status === 'completed').length}
            </div>
            <div className="text-sm text-green-700">Bajarilgan</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {homeworks.map((homework) => (
            <Card
              key={homework.id}
              className={`p-6 ${
                homework.status === 'overdue'
                  ? 'border-2 border-red-300 bg-red-50/50'
                  : homework.status === 'completed'
                  ? 'border-2 border-green-300 bg-green-50/50'
                  : ''
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`size-14 rounded-xl flex items-center justify-center ${
                      homework.status === 'completed'
                        ? 'bg-green-600'
                        : homework.status === 'overdue'
                        ? 'bg-red-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    <FileText className="size-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{homework.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Badge className="bg-blue-600">{homework.subject}</Badge>
                      </div>
                      <div>O'qituvchi: {homework.assignedBy}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="size-4" />
                        Muddat: {homework.dueDate}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="size-4" />
                        {homework.timeLimit} daqiqa
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FileText className="size-4" />
                        {homework.questions} ta savol
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {homework.status === 'completed' ? (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{homework.score}%</div>
                      <div className="text-xs text-gray-600">Bajarilgan</div>
                      <CheckCircle2 className="size-6 text-green-600 mx-auto mt-1" />
                    </div>
                  ) : homework.status === 'overdue' ? (
                    <div className="text-center">
                      <Badge className="bg-red-600 mb-2">Muddati o'tgan</Badge>
                      <Button variant="outline" className="text-red-600 border-red-600">
                        Bajarish
                      </Button>
                    </div>
                  ) : (
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Boshlash
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {homeworks.filter((h) => h.status === 'overdue').length > 0 && (
          <Card className="p-6 bg-red-50 border-2 border-red-300">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-8 text-red-600" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Diqqat!</h3>
                <p className="text-red-700">
                  Muddati o'tgan vazifalaringiz mavjud. Iltimos, tezroq bajaring.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}
