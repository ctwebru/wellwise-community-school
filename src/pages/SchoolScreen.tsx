import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_POSTS, Post } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import PostDetail from '@/components/PostDetail';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft, CheckCircle2, ExternalLink, Loader2, Sparkles, Crown } from 'lucide-react';
import heroSchool from '@/assets/hero-school.jpg';

interface SchoolScreenProps {
  onBack?: () => void;
}

const SchoolScreen = ({ onBack }: SchoolScreenProps) => {
  const { user, setSubscription } = useAuth();
  const isSubscribed = user?.subscriptionActive;
  const [posts, setPosts] = useState<Post[]>(
    MOCK_POSTS.filter((p) => p.section === 'school' && p.status === 'published')
  );
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleFavorite = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p)));
    if (selectedPost?.id === id) {
      setSelectedPost({ ...selectedPost, isFavorited: !selectedPost.isFavorited });
    }
  };

  const simulatePayment = () => {
    setCheckingPayment(true);
    setTimeout(() => {
      setCheckingPayment(false);
      setPaymentSuccess(true);
      setSubscription(true);
      setTimeout(() => setPaymentSuccess(false), 2000);
    }, 2500);
  };

  if (selectedPost && isSubscribed) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  if (checkingPayment) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-base font-medium text-foreground">Проверяем оплату...</p>
        <p className="text-sm text-muted-foreground mt-1">Это займёт несколько секунд</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-xl font-bold text-foreground font-serif">Подписка активирована!</h2>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Добро пожаловать в Школу здорового человека
        </p>
      </div>
    );
  }

  // Paywall state
  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Hero */}
        <div className="relative h-[260px] overflow-hidden">
          <img src={heroSchool} alt="" className="absolute inset-0 w-full h-full object-cover" width={960} height={540} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          {onBack && (
            <button
              onClick={onBack}
              className="absolute top-5 left-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-xs font-medium">Доступно по подписке</span>
            </div>
            <h1 className="text-white text-2xl font-bold font-serif">Школа здоровья</h1>
            <p className="text-white/70 text-sm mt-0.5">Премиум контент от врача</p>
          </div>
        </div>

        <div className="px-5 pt-5">
          {/* Benefits */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-card p-5 mb-5">
            <h2 className="text-base font-bold text-foreground mb-3 font-serif">Что входит в подписку</h2>
            <div className="space-y-2.5 mb-5">
              {[
                'Программы восстановления здоровья',
                'Подробные разборы анализов',
                'Видео-консультации и лекции',
                'Индивидуальные рекомендации',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Plans */}
            <div className="space-y-2 mb-5">
              {[
                { period: '1 месяц', price: '990 ₽', tag: '' },
                { period: '6 месяцев', price: '4 490 ₽', tag: 'Выгодно' },
                { period: '1 год', price: '7 990 ₽', tag: 'Лучшая цена' },
              ].map((plan) => (
                <div key={plan.period} className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{plan.period}</span>
                    {plan.tag && (
                      <span className="text-[10px] font-semibold bg-primary/12 text-primary px-1.5 py-0.5 rounded-full">
                        {plan.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-foreground">{plan.price}</span>
                </div>
              ))}
            </div>

            <Button onClick={simulatePayment} className="w-full h-12 rounded-xl text-base">
              Оформить подписку
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Оплата на защищённом сайте. Отмена в любой момент.
            </p>
          </div>

          {/* Locked posts preview */}
          <h3 className="text-base font-semibold text-foreground mb-3 font-serif">Доступно по подписке</h3>
          <div className="space-y-3 opacity-50">
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-2xl border border-border p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent z-10" />
                <div className="relative z-0">
                  <h3 className="text-base font-semibold text-foreground mb-1 font-serif">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Subscribed state
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-[200px] overflow-hidden">
        <img src={heroSchool} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={960} height={540} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-5 left-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-2xl font-bold font-serif">Школа</h1>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <p className="text-white/70 text-sm mt-0.5">Эксклюзивный контент для подписчиков</p>
        </div>
      </div>

      <div className="px-4 space-y-3 mt-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onOpen={setSelectedPost} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default SchoolScreen;
