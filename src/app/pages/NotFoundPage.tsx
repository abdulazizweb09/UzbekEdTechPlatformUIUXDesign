import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-3xl font-bold mb-4">Sahifa topilmadi</h1>
        <p className="text-gray-600 mb-8">Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
        <Link to="/">
          <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Home className="size-5" />
            Bosh sahifaga qaytish
          </Button>
        </Link>
      </div>
    </div>
  );
}
