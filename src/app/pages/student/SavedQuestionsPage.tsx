import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Bookmark, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

export default function SavedQuestionsPage() {
  const { questions, savedQuestions, toggleSavedQuestion } = useApp();

  const saved = questions.filter(q => savedQuestions.includes(q.id));

  const handleRemove = (questionId: string) => {
    toggleSavedQuestion(questionId);
    toast.success('Savoldan olib tashlandi');
  };

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Saqlangan savollar</h1>
            <p className="text-gray-600">{saved.length} ta savol saqlangan</p>
          </div>
          <Bookmark className="size-8 text-yellow-600 fill-current" />
        </div>

        {saved.length === 0 ? (
          <Card className="p-12 text-center">
            <Bookmark className="size-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Saqlangan savollar yo'q</h2>
            <p className="text-gray-600">Keyinchalik ko'rish uchun savollarni saqlang</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {saved.map((question) => (
              <Card key={question.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-600">{question.subject}</Badge>
                      <Badge variant="outline">{question.topic}</Badge>
                      <Badge
                        className={
                          question.difficulty === 'easy'
                            ? 'bg-green-600'
                            : question.difficulty === 'medium'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                        }
                      >
                        {question.difficulty === 'easy'
                          ? 'Oson'
                          : question.difficulty === 'medium'
                          ? 'O\'rta'
                          : 'Qiyin'}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{question.question}</h3>
                    <div className="text-sm text-gray-600">
                      To'g'ri javob: <span className="font-bold">{question.correctAnswer}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(question.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
