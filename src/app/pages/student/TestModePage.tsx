import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import StudentLayout from '../../components/StudentLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Clock,
  CheckCircle2,
  Circle,
  Flag,
  AlertCircle,
  Trophy,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useApp, Question } from '../../context/AppContext';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export default function TestModePage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { questions, addTestResult, currentUser, setCurrentUser } = useApp();

  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const testConfigs: Record<string, { title: string; questionCount: number; timeLimit: number }> = {
    practice: { title: 'Amaliyot testi', questionCount: 15, timeLimit: 0 },
    timed: { title: 'Vaqtli test', questionCount: 20, timeLimit: 1200 },
    dtm: { title: 'DTM Simulyatori', questionCount: 30, timeLimit: 1800 },
    mock: { title: 'Mock imtihon', questionCount: 25, timeLimit: 1500 },
  };

  const config = testConfigs[mode || 'practice'] || testConfigs.practice;

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setTestQuestions(shuffled.slice(0, config.questionCount));
    setTimeLeft(config.timeLimit);
  }, [mode]);

  useEffect(() => {
    if (testStarted && config.timeLimit > 0 && timeLeft > 0 && !testFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, timeLeft, testFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
    toast.success('Test boshlandi!');
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(new Map(answers.set(currentQuestionIndex, answer)));
  };

  const handleMarkForReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestionIndex)) {
      newMarked.delete(currentQuestionIndex);
      toast.info('Belgi olib tashlandi');
    } else {
      newMarked.add(currentQuestionIndex);
      toast.info('Ko\'rib chiqish uchun belgilandi');
    }
    setMarkedForReview(newMarked);
  };

  const finishTest = () => {
    setTestFinished(true);

    let correctCount = 0;
    testQuestions.forEach((q, index) => {
      const userAnswer = answers.get(index);
      if (userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / testQuestions.length) * 100);
    const timeSpent = config.timeLimit - timeLeft;

    const result = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('uz-UZ'),
      mode: config.title,
      score: score,
      totalQuestions: testQuestions.length,
      correctAnswers: correctCount,
      timeSpent: timeSpent,
      subject: 'Barcha fanlar',
    };

    setTestResults(result);
    addTestResult(result);

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        xp: currentUser.xp + correctCount * 10,
        score: currentUser.score + score,
        correctAnswers: currentUser.correctAnswers + correctCount,
        totalQuestions: currentUser.totalQuestions + testQuestions.length,
      });
    }

    if (score >= 80) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  };

  if (!testStarted) {
    return (
      <StudentLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center bg-white/80 backdrop-blur-lg shadow-xl">
            <div className="size-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="size-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
            <div className="space-y-3 text-gray-600 mb-8">
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="size-5" />
                Savollar soni: <span className="font-bold">{config.questionCount}</span>
              </p>
              {config.timeLimit > 0 && (
                <p className="flex items-center justify-center gap-2">
                  <Clock className="size-5" />
                  Vaqt: <span className="font-bold">{formatTime(config.timeLimit)}</span>
                </p>
              )}
              <p className="flex items-center justify-center gap-2">
                <Target className="size-5" />
                Har bir to'g'ri javob uchun <span className="font-bold">10 XP</span>
              </p>
            </div>
            <Button
              onClick={handleStartTest}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-14 px-8"
            >
              Testni boshlash
            </Button>
          </Card>
        </div>
      </StudentLayout>
    );
  }

  if (testFinished && testResults) {
    const accuracy = (testResults.correctAnswers / testResults.totalQuestions) * 100;
    return (
      <StudentLayout>
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center bg-white/80 backdrop-blur-lg shadow-xl mb-6">
            <div className="text-6xl mb-4">
              {testResults.score >= 80 ? '🎉' : testResults.score >= 60 ? '👍' : '💪'}
            </div>
            <h1 className="text-3xl font-bold mb-2">Test yakunlandi!</h1>
            <p className="text-gray-600 mb-8">
              {testResults.score >= 80
                ? 'Ajoyib natija!'
                : testResults.score >= 60
                ? 'Yaxshi natija!'
                : 'Davom eting, siz qila olasiz!'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-3xl font-bold text-blue-700 mb-1">{testResults.score}%</div>
                <div className="text-sm text-blue-700">Ball</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {testResults.correctAnswers}
                </div>
                <div className="text-sm text-green-700">To'g'ri</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
                <div className="text-3xl font-bold text-red-700 mb-1">
                  {testResults.totalQuestions - testResults.correctAnswers}
                </div>
                <div className="text-sm text-red-700">Noto'g'ri</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-3xl font-bold text-purple-700 mb-1">
                  {formatTime(testResults.timeSpent)}
                </div>
                <div className="text-sm text-purple-700">Vaqt</div>
              </Card>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="font-bold text-lg">Natijalar tahlili</h3>
              {testQuestions.map((q, index) => {
                const userAnswer = answers.get(index);
                const isCorrect =
                  userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 text-left ${
                      isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="size-5 text-green-600 mt-1" />
                      ) : (
                        <AlertCircle className="size-5 text-red-600 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="font-bold mb-1">
                          {index + 1}. {q.question}
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            Sizning javobingiz:{' '}
                            <span className="font-bold">{userAnswer || 'Javob berilmagan'}</span>
                          </div>
                          {!isCorrect && (
                            <div>
                              To'g'ri javob: <span className="font-bold">{q.correctAnswer}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/student')}
                variant="outline"
                className="gap-2"
              >
                Asosiy sahifaga
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 gap-2"
              >
                Qayta urinish
              </Button>
            </div>
          </Card>
        </div>
      </StudentLayout>
    );
  }

  const currentQuestion = testQuestions[currentQuestionIndex];
  const answeredCount = answers.size;
  const progress = (answeredCount / testQuestions.length) * 100;

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{config.title}</h1>
                  <p className="text-gray-600">
                    Savol {currentQuestionIndex + 1} / {testQuestions.length}
                  </p>
                </div>
                {config.timeLimit > 0 && (
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <Clock className="size-5" />
                    <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
                  </div>
                )}
              </div>

              <Progress value={progress} className="mb-6" />

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-blue-600">{currentQuestion.subject}</Badge>
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
                <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>

                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        answers.get(currentQuestionIndex) === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                >
                  Oldingi
                </Button>
                <Button
                  onClick={handleMarkForReview}
                  variant="outline"
                  className={`gap-2 ${markedForReview.has(currentQuestionIndex) ? 'bg-yellow-50' : ''}`}
                >
                  <Flag className="size-4" />
                  {markedForReview.has(currentQuestionIndex) ? 'Belgilangan' : 'Belgilash'}
                </Button>
                {currentQuestionIndex < testQuestions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    className="ml-auto bg-blue-600"
                  >
                    Keyingi
                  </Button>
                ) : (
                  <Button onClick={finishTest} className="ml-auto bg-green-600 gap-2">
                    <CheckCircle2 className="size-4" />
                    Yakunlash
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Savollarga o'tish</h3>
              <div className="grid grid-cols-5 gap-2">
                {testQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`size-10 rounded-lg border-2 font-bold text-sm transition-all ${
                      index === currentQuestionIndex
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : answers.has(index)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : markedForReview.has(index)
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-4 bg-green-50 border-2 border-green-500 rounded"></div>
                  <span>Javob berilgan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 bg-yellow-50 border-2 border-yellow-500 rounded"></div>
                  <span>Ko'rib chiqish</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 bg-white border-2 border-gray-300 rounded"></div>
                  <span>Javob berilmagan</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Statistika</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Javob berilgan:</span>
                  <span className="font-bold">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Qolgan:</span>
                  <span className="font-bold">{testQuestions.length - answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Belgilangan:</span>
                  <span className="font-bold">{markedForReview.size}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
