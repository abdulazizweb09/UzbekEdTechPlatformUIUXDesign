import { useState, useEffect } from 'react';
import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  RefreshCw,
  Bookmark,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp, Question } from '../../context/AppContext';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export default function SavollarPage() {
  const { questions, addUserAnswer, savedQuestions, toggleSavedQuestion, currentUser, setCurrentUser } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setSelectedAnswer('');
    setSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  useEffect(() => {
    generateRandomQuestion();
  }, []);

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) {
      toast.error('Iltimos, javobni tanlang');
      return;
    }

    const correct = selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setSubmitted(true);
    setShowExplanation(true);

    addUserAnswer(currentQuestion.id, selectedAnswer, correct);

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      toast.success('To\'g\'ri javob! 🎉');

      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          xp: currentUser.xp + 10,
          score: currentUser.score + 10,
          correctAnswers: currentUser.correctAnswers + 1,
          totalQuestions: currentUser.totalQuestions + 1,
        });
      }
    } else {
      toast.error('Noto\'g\'ri javob');
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          totalQuestions: currentUser.totalQuestions + 1,
        });
      }
    }
  };

  const handleNext = () => {
    generateRandomQuestion();
  };

  const handleSave = () => {
    if (currentQuestion) {
      toggleSavedQuestion(currentQuestion.id);
      if (savedQuestions.includes(currentQuestion.id)) {
        toast.success('Savoldan olib tashlandi');
      } else {
        toast.success('Savol saqlandi');
      }
    }
  };

  if (!currentQuestion) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-96">
          <Button onClick={generateRandomQuestion}>Savol yuklash</Button>
        </div>
      </StudentLayout>
    );
  }

  const isSaved = savedQuestions.includes(currentQuestion.id);

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tasodifiy savollar</h1>
            <p className="text-gray-600">Har safar yangi savol bilan mashq qiling</p>
          </div>
          <Button
            onClick={generateRandomQuestion}
            variant="outline"
            className="gap-2"
            disabled={!submitted}
          >
            <RefreshCw className="size-4" />
            Yangi savol
          </Button>
        </div>

        <Card className="p-8 mb-6 bg-white/80 backdrop-blur-lg shadow-xl">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-blue-600">{currentQuestion.subject}</Badge>
              <Badge variant="outline">{currentQuestion.topic}</Badge>
              <Badge
                className={
                  currentQuestion.difficulty === 'easy'
                    ? 'bg-green-600'
                    : currentQuestion.difficulty === 'medium'
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
                }
              >
                {currentQuestion.difficulty === 'easy'
                  ? 'Oson'
                  : currentQuestion.difficulty === 'medium'
                  ? 'O\'rta'
                  : 'Qiyin'}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className={isSaved ? 'text-yellow-600' : ''}
            >
              <Bookmark className={`size-5 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>

          <div className="space-y-3 mb-6">
            {currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false' ? (
              currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !submitted && setSelectedAnswer(option)}
                  disabled={submitted}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === option
                      ? submitted
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : submitted && option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {submitted && option === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="size-5 text-green-600" />
                    )}
                    {submitted && selectedAnswer === option && !isCorrect && (
                      <XCircle className="size-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))
            ) : (
              <Input
                placeholder="Javobingizni kiriting"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                disabled={submitted}
                className="text-lg p-4"
              />
            )}
          </div>

          {!submitted ? (
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-12"
            >
              Javobni tekshirish
            </Button>
          ) : (
            <div className="space-y-4">
              {isCorrect ? (
                <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle2 className="size-6" />
                    <span className="font-bold text-lg">To'g'ri javob! 🎉</span>
                  </div>
                  <p className="text-green-700">Siz +10 XP oldingiz!</p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <XCircle className="size-6" />
                    <span className="font-bold text-lg">Noto'g'ri javob</span>
                  </div>
                  <p className="text-red-700">
                    To'g'ri javob: <span className="font-bold">{currentQuestion.correctAnswer}</span>
                  </p>
                </div>
              )}

              {showExplanation && (
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Lightbulb className="size-6" />
                    <span className="font-bold">Tushuntirish:</span>
                  </div>
                  <p className="text-blue-900">{currentQuestion.explanation}</p>
                </div>
              )}

              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg h-12 gap-2"
              >
                Keyingi savol
                <ArrowRight className="size-5" />
              </Button>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {currentUser?.correctAnswers || 0}
            </div>
            <div className="text-sm text-blue-700">To'g'ri javoblar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-3xl font-bold text-purple-700 mb-1">
              {currentUser?.totalQuestions || 0}
            </div>
            <div className="text-sm text-purple-700">Jami savollar</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="text-3xl font-bold text-pink-700 mb-1">
              {currentUser?.totalQuestions
                ? ((currentUser.correctAnswers / currentUser.totalQuestions) * 100).toFixed(0)
                : 0}
              %
            </div>
            <div className="text-sm text-pink-700">Aniqlik</div>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
