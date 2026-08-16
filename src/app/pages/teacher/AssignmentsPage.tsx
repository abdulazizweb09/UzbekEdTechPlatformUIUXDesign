import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, FileText, Users, CheckCircle2 } from 'lucide-react';

export default function AssignmentsPage() {
  const assignments = [
    {
      id: 1,
      title: 'Matematika: Kvadrat tenglamalar',
      subject: 'Matematika',
      students: 45,
      completed: 32,
      dueDate: '28.04.2026',
      status: 'active',
    },
    {
      id: 2,
      title: 'Fizika: Nyuton qonunlari',
      subject: 'Fizika',
      students: 45,
      completed: 28,
      dueDate: '29.04.2026',
      status: 'active',
    },
    {
      id: 3,
      title: 'Kimyo: Periodli sistema',
      subject: 'Kimyo',
      students: 45,
      completed: 45,
      dueDate: '25.04.2026',
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/teacher">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Vazifalar boshqaruvi</h1>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
            <Plus className="size-4" />
            Yangi vazifa
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-4">
          {assignments.map((assignment) => {
            const completionRate = (assignment.completed / assignment.students) * 100;
            return (
              <Card key={assignment.id} className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="size-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <FileText className="size-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{assignment.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                        <Badge className="bg-blue-600">{assignment.subject}</Badge>
                        <div className="flex items-center gap-1">
                          <Users className="size-4" />
                          {assignment.students} o'quvchi
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="size-4" />
                          {assignment.completed} bajarilgan
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">Muddat: {assignment.dueDate}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{completionRate.toFixed(0)}%</div>
                    <div className="text-xs text-gray-600">Bajarilish</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
