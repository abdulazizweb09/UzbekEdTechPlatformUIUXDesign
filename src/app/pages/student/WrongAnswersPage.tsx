import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { XCircle, Lightbulb } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WrongAnswersPage() {
  const { questions, userAnswers } = useApp();

  const wrongAnswers = Array.from(userAnswers.entries())
    .filter(([_, data]) => !data.isCorrect)
    .map(([questionId]) => questions.find(q => q.id === questionId))
    .filter(Boolean);

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Xato javoblar</h1>
            <p className="text-gray-600">{wrongAnswers.length} ta xato javob topildi</p>
          </div>
          <XCircle className="size-8 text-red-600" />
        </div>

        {wrongAnswers.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">Xato javoblar yo'q!</h2>
            <p className="text-gray-600">Barcha savollarni to'g'ri javoblabsiz!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wrongAnswers.map((question) => {
              if (!question) return null;
              return (
                <Card key={question.id} className="p-6 border-2 border-red-200 bg-red-50/50">
                  <div className="flex items-start gap-4">
                    <XCircle className="size-6 text-red-600 mt-1 flex-shrink-0" />
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
                      <div className="mb-3">
                        <div className="text-sm text-red-700 mb-1">
                          Sizning javobingiz: <span className="font-bold">{userAnswers.get(question.id)?.answer || '-'}</span>
                        </div>
                        <div className="text-sm text-green-700">
                          To'g'ri javob: <span className="font-bold">{question.correctAnswer}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-700 mb-2">
                          <Lightbulb className="size-5" />
                          <span className="font-bold">Tushuntirish:</span>
                        </div>
                        <p className="text-blue-900 text-sm">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {wrongAnswers.length > 0 && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-bold mb-2">💡 Maslahat</h3>
            <p className="text-gray-700">
              Xato javoblarni o'rganish va ularni qayta ishlab chiqish orqali o'z bilimingizni mustahkamlang.
              Har bir xato - bu o'rganish imkoniyati!
            </p>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}
