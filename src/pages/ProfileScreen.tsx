import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LogOut, Crown, Bell, BellOff,
  Shield, User, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import doctorPhoto from '@/assets/doctor-photo.png';

const ProfileScreen = () => {
  const { user, logout, setDemoRole, setSubscription } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showPushPrompt, setShowPushPrompt] = useState(true);

  if (!user) return null;

  const roleLabels: Record<UserRole, string> = {
    user: 'Пользователь',
    moderator: 'Модератор',
    admin: 'Администратор',
  };

  const expiresDate = user.subscriptionExpiresAt
    ? new Date(user.subscriptionExpiresAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-6 font-serif">Профиль</h1>

        {/* User info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              {roleLabels[user.role]}
            </p>
          </div>
        </div>

        {/* Doctor card */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/8 to-primary/3 border border-primary/15 p-4 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            <img src={doctorPhoto} alt="Врач" className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Яна Прудникова</p>
            <p className="text-xs text-muted-foreground">Ваш врач • гастроэнтеролог</p>
          </div>
        </div>

        {/* Subscription status */}
        <div className={cn(
          'rounded-2xl p-5 mb-6 border',
          user.subscriptionActive
            ? 'bg-primary/5 border-primary/20'
            : 'bg-card border-border'
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Crown className={cn('w-5 h-5', user.subscriptionActive ? 'text-primary' : 'text-muted-foreground')} />
            <h3 className="text-base font-semibold text-foreground">
              {user.subscriptionActive ? 'Подписка активна' : 'Нет подписки'}
            </h3>
          </div>

          {user.subscriptionActive && expiresDate ? (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Действует до {expiresDate}
            </p>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Оформите подписку для доступа к Школе здоровья
              </p>
              <Button size="sm" onClick={() => setSubscription(true)}>
                Оформить подписку
              </Button>
            </div>
          )}
        </div>

        {/* Push prompt */}
        {showPushPrompt && !notificationsEnabled && (
          <div className="rounded-2xl bg-card border border-border p-5 mb-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-info" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">Включить уведомления?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Узнавайте первыми о новых статьях и обновлениях
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={() => { setNotificationsEnabled(true); setShowPushPrompt(false); }}
                  >
                    Включить
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPushPrompt(false)}
                  >
                    Позже
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="space-y-1">
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-foreground" />
              ) : (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-foreground">Уведомления</span>
            </div>
            <span className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              notificationsEnabled ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
            )}>
              {notificationsEnabled ? 'Вкл' : 'Выкл'}
            </span>
          </button>
        </div>

        {/* Demo role switcher */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            Демо: переключение ролей
          </p>
          <div className="flex gap-2">
            {(['user', 'moderator', 'admin'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setDemoRole(role)}
                className={cn(
                  'flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-colors',
                  user.role === role
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                )}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setSubscription(!user.subscriptionActive)}
              className={cn(
                'flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-colors',
                user.subscriptionActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground'
              )}
            >
              {user.subscriptionActive ? '✓ Подписка' : 'Без подписки'}
            </button>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full mt-8 text-destructive hover:text-destructive hover:bg-destructive/5"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
