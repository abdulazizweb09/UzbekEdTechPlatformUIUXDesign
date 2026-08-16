import { useState } from 'react';
import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { ArrowLeft, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

export default function QuestionManagementPage() {
  const { questions } = useApp();
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple-choice' as 'multiple-choice' | 'true-false' | 'written',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    subject: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    topic: '',
  });

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.correctAnswer || !newQuestion.subject) {
      toast.error('Iltimos, barcha kerakli maydonlarni to\'ldiring');
      return;
    }
    toast.success('Savol qo\'shildi!');
    setIsAddingQuestion(false);
    setNewQuestion({
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      subject: '',
      difficulty: 'medium',
      topic: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Savollar boshqaruvi</h1>
          </div>
          <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="size-4" />
                Yangi savol
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Yangi savol qo'shish</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Savol mazmuni</Label>
                  <Textarea
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    placeholder="Savolni kiriting"
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Fan</Label>
                    <Input
                      value={newQuestion.subject}
                      onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                      placeholder="Matematika"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Mavzu</Label>
                    <Input
                      value={newQuestion.topic}
                      onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                      placeholder="Algebraning asoslari"
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label>Qiyinlik darajasi</Label>
                  <Select
                    value={newQuestion.difficulty}
                    onValueChange={(value: any) => setNewQuestion({ ...newQuestion, difficulty: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Oson</SelectItem>
                      <SelectItem value="medium">O'rta</SelectItem>
                      <SelectItem value="hard">Qiyin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newQuestion.type === 'multiple-choice' && (
                  <div>
                    <Label>Javob variantlari</Label>
                    {newQuestion.options.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: newOptions });
                        }}
                        placeholder={`Variant ${index + 1}`}
                        className="mt-2"
                      />
                    ))}
                  </div>
                )}
                <div>
                  <Label>To'g'ri javob</Label>
                  <Input
                    value={newQuestion.correctAnswer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                    placeholder="To'g'ri javobni kiriting"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Tushuntirish</Label>
                  <Textarea
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                    placeholder="Javobning tushuntirishini kiriting"
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleAddQuestion} className="w-full gap-2">
                  <Save className="size-4" />
                  Saqlash
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <p className="text-gray-600">Jami {questions.length} ta savol</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {questions.map((question) => (
            <Card key={question.id} className="p-6">
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
                  <p className="text-sm text-gray-600 mb-2">
                    To'g'ri javob: <span className="font-bold">{question.correctAnswer}</span>
                  </p>
                  <p className="text-sm text-gray-600">{question.explanation}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
