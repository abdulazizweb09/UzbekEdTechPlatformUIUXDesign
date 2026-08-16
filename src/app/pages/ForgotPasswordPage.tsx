import { useState } from 'react';
import { Link } from 'react-router';
import { BookOpen, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    if (!email) {
      toast.error('Iltimos, emailni kiriting');
      return;
    }
    setSent(true);
    toast.success('Parolni tiklash havolasi yuborildi!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="size-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="size-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduTest
          </span>
        </div>

        {!sent ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">Parolni unutdingizmi?</h1>
            <p className="text-center text-gray-600 mb-8">
              Parolni tiklash uchun emailingizni kiriting
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4"
            >
              Havola yuborish
            </Button>
          </>
        ) : (
          <div className="text-center">
            <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="size-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Email yuborildi!</h1>
            <p className="text-gray-600 mb-8">
              Parolni tiklash havolasini {email} manziliga yubordik. Iltimos, emailingizni tekshiring.
            </p>
          </div>
        )}

        <Link to="/login" className="flex items-center justify-center gap-2 text-blue-600 hover:underline">
          <ArrowLeft className="size-4" />
          Kirish sahifasiga qaytish
        </Link>
      </Card>
    </div>
  );
}
