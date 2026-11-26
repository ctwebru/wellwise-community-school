import { Compass, Dumbbell, HeartPulse, CircleUserRound, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MainTab } from '@/data/diaitaData';
import { cn } from '@/lib/utils';

const tabs: { id: MainTab; label: string; icon: typeof Compass }[] = [
  { id: 'home', label: 'Главная', icon: Compass },
  { id: 'akme', label: 'AKME', icon: Dumbbell },
  { id: 'inside', label: 'INSIDE', icon: HeartPulse },
  { id: 'courses', label: 'Курсы', icon: GraduationCap },
  { id: 'me', label: 'Моё', icon: CircleUserRound },
];

export default function DiaitaTabBar({ active, onChange }: { active: MainTab; onChange: (tab: MainTab) => void }) {
  return (
    <nav aria-label="Основная навигация" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-safe-bottom backdrop-blur-sm">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5 px-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button key={id} variant="ghost" onClick={() => onChange(id)} className={cn('h-16 flex-col gap-1 rounded-none px-0.5 text-[10px] font-semibold', active === id ? 'text-primary' : 'text-muted-foreground')}>
            <Icon className="h-5 w-5" strokeWidth={active === id ? 2.4 : 1.7} />
            {label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
