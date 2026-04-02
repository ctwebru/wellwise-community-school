import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Home, FileText, GraduationCap, Bookmark, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const tabs = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'posts', label: 'Статьи', icon: FileText },
    { id: 'school', label: 'Школа', icon: GraduationCap },
    { id: 'profile', label: 'Профиль', icon: User },
    ...(isAdmin ? [{ id: 'admin', label: 'Управление', icon: Settings }] : []),
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around px-1 h-[52px] max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('w-[22px] h-[22px]', isActive && 'stroke-[2.5px]')} />
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
