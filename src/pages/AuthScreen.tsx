import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import breathing from '@/assets/diaita-breathing.jpg';

type AuthStep = 'email' | 'code';

const AuthScreen = () => {
  const { login, verifyCode } = useAuth();
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Введите корректный email');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      login(email);
      setLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 4) {
      setError('Введите 4-значный код');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const success = verifyCode(code);
      setLoading(false);
      if (!success) setError('Неверный код. Попробуйте снова.');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col safe-bottom">
      <div className="relative h-[46vh] min-h-[340px] overflow-hidden">
        <img src={breathing} alt="Спокойная дыхательная практика" className="h-full w-full object-cover" width={1200} height={1504} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-7 text-overlay-foreground">
          <p className="editorial-label text-primary">Персональный ритм здоровья</p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold">DIAITA</h1>
          <p className="mt-2 max-w-[290px] text-sm text-overlay-muted">Понимайте своё состояние и превращайте рекомендации в простые действия.</p>
        </div>
      </div>

      {/* Form section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="animate-fade-in">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="font-heading text-xl font-semibold text-foreground">Войти в DIAITA</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Введите email для получения кода
                </p>
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="pl-10 h-12 rounded-sm bg-card border-border text-base"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm animate-fade-in">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full h-12 rounded-sm text-base font-semibold"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Получить код
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Мы отправим одноразовый код на ваш email
              </p>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-foreground">Код подтверждения</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Отправлен на <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              <div>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="0000"
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setError(''); }}
                  className="h-14 rounded-sm bg-card border-border text-center text-2xl font-semibold"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-destructive text-sm animate-fade-in">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading || code.length !== 4}
                className="w-full h-12 rounded-sm text-base font-semibold"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Войти'
                )}
              </Button>

              <Button
                variant="link"
                type="button"
                onClick={() => { setStep('email'); setCode(''); setError(''); }}
                className="w-full text-center text-sm text-primary font-medium mt-2"
              >
                Изменить email
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
