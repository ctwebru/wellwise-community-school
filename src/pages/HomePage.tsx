import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, Lock, Sparkles, Crown } from 'lucide-react';
import heroHome from '@/assets/hero-home.jpg';
import heroArticles from '@/assets/hero-articles.jpg';
import heroSchool from '@/assets/hero-school.jpg';
import doctorPhoto from '@/assets/doctor-photo.png';
import logoSvg from '@/assets/logo.svg';
import { cn } from '@/lib/utils';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const { user } = useAuth();
  const isSubscribed = user?.subscriptionActive;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero banner — full width photo with overlay */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={heroHome}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={960}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        
        {/* Logo on top */}
        <div className="absolute top-0 left-0 right-0 pt-safe-top px-5 pt-6 z-10">
          <img src={logoSvg} alt="Яна Прудникова" className="h-7 brightness-0 invert opacity-90" />
        </div>

        {/* Text on bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 z-10">
          <h1 className="text-white text-2xl font-bold font-serif leading-tight mb-1">
            Здоровье начинается<br />с понимания
          </h1>
          <p className="text-white/70 text-sm">
            новые материалы уже в подписке
          </p>
          <button
            onClick={() => onNavigate('school')}
            className="mt-4 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            перейти
          </button>
        </div>

        {/* Dots indicator like Kolsa */}
        <div className="absolute bottom-6 right-5 flex gap-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Quick access widgets */}
      <div className="px-4 -mt-0 pt-5">
        {/* Doctor info card */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            <img src={doctorPhoto} alt="Врач" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Яна Прудникова</p>
            <p className="text-xs text-muted-foreground">Гастроэнтеролог • диетолог</p>
          </div>
          {isSubscribed ? (
            <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              <Crown className="w-3 h-3" /> PRO
            </span>
          ) : (
            <button
              onClick={() => onNavigate('school')}
              className="flex items-center gap-1 text-xs font-semibold text-primary-foreground bg-foreground px-3 py-1.5 rounded-full"
            >
              Подключить PRO <Sparkles className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Section cards — large visual blocks like Kolsa */}
        <h2 className="text-lg font-bold text-foreground mb-3">Разделы</h2>

        {/* Articles card */}
        <button
          onClick={() => onNavigate('posts')}
          className="w-full mb-3 relative rounded-2xl overflow-hidden aspect-[16/9] text-left group"
        >
          <img
            src={heroArticles}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={960}
            height={540}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <p className="text-white text-lg font-bold font-serif">Статьи</p>
            <p className="text-white/70 text-xs mt-0.5">Бесплатные материалы о здоровье</p>
          </div>
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* School card */}
        <button
          onClick={() => onNavigate('school')}
          className="w-full mb-3 relative rounded-2xl overflow-hidden aspect-[16/9] text-left group"
        >
          <img
            src={heroSchool}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={960}
            height={540}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <div className="flex items-center gap-2">
              <p className="text-white text-lg font-bold font-serif">Школа здоровья</p>
              {!isSubscribed && <Lock className="w-4 h-4 text-white/60" />}
            </div>
            <p className="text-white/70 text-xs mt-0.5">
              {isSubscribed ? 'Эксклюзивный контент для подписчиков' : 'Доступно по подписке'}
            </p>
          </div>
          {!isSubscribed && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold px-2.5 py-1 rounded-full">
              <Lock className="w-3 h-3" /> PRO
            </div>
          )}
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* Subscription CTA block if not subscribed */}
        {!isSubscribed && (
          <div className="rounded-2xl bg-card border border-border p-5 mt-2 mb-3">
            <h3 className="text-base font-bold text-foreground mb-1">Вступайте в сообщество!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Поддержка, знания, рекомендации врача.
            </p>
            <button
              onClick={() => onNavigate('school')}
              className="w-full bg-foreground text-background py-3 rounded-xl text-sm font-semibold"
            >
              Перейти
            </button>
          </div>
        )}

        {/* Recent articles preview */}
        <h2 className="text-lg font-bold text-foreground mt-5 mb-3">Новые статьи</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {[
            { title: 'Утренние привычки', emoji: '🌅', tag: 'Новое' },
            { title: 'Витамин D: мифы', emoji: '☀️', tag: '' },
            { title: 'Сон и иммунитет', emoji: '😴', tag: '' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => onNavigate('posts')}
              className="flex-shrink-0 w-[140px] rounded-2xl bg-card border border-border overflow-hidden text-left"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/8 to-primary/3 flex items-center justify-center relative">
                <span className="text-4xl">{item.emoji}</span>
                {item.tag && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground leading-tight">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
