import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex flex-col justify-center px-6 safe-top safe-bottom">
      <div className="animate-fade-in">
        {/* Logo / Brand */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Здоровье+</h1>
          <p className="text-muted-foreground mt-1 text-sm">Ваш персональный помощник здоровья</p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="pl-10 h-12 rounded-xl bg-card border-border text-base"
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
              className="w-full h-12 rounded-xl text-base font-semibold"
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
            <div className="text-center mb-2">
              <p className="text-sm text-muted-foreground">
                Код отправлен на <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Код подтверждения
              </label>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
                value={code}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setError(''); }}
                className="h-14 rounded-xl bg-card border-border text-center text-2xl tracking-[0.5em] font-semibold"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-destructive text-sm animate-fade-in">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || code.length !== 4}
              className="w-full h-12 rounded-xl text-base font-semibold"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Войти'
              )}
            </Button>

            <button
              type="button"
              onClick={() => { setStep('email'); setCode(''); setError(''); }}
              className="w-full text-center text-sm text-primary font-medium mt-2"
            >
              Изменить email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
