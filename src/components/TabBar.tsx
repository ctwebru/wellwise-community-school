import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Home, GraduationCap, Bookmark, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const tabs = [
    { id: 'posts', label: 'Посты', icon: Home },
    { id: 'school', label: 'Школа', icon: GraduationCap },
    { id: 'favorites', label: 'Избранное', icon: Bookmark },
    { id: 'profile', label: 'Профиль', icon: User },
    ...(isAdmin ? [{ id: 'admin', label: 'Управление', icon: Settings }] : []),
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around px-2 h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-lg transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5px]')} />
              <span className={cn('text-[10px]', isActive ? 'font-semibold' : 'font-medium')}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
