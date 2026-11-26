import { useState } from 'react';
import { Check, ChevronDown, Download, Expand, FileText, Play, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { CourseBlock } from '@/data/courseData';
import type { BlockAnswer } from '@/lib/courseProgress';
import { courseImages } from '@/components/courses/courseImages';
import { cn } from '@/lib/utils';

interface CourseBlockProps {
  block: CourseBlock;
  answer?: BlockAnswer;
  ready: boolean;
  onAnswer: (answer: BlockAnswer) => void;
  onComplete: () => void;
}

function BlockLabel({ block, ready }: { block: CourseBlock; ready: boolean }) {
  const names: Record<CourseBlock['type'], string> = { text: 'Материал', image: 'Изображение', video: 'Видео', quiz: 'Мини-тест', survey: 'Короткая анкета', checklist: 'Чек-лист', task: 'Задание', materials: 'Материалы' };
  const interactive = !['text', 'image', 'materials'].includes(block.type);
  return <div className="mb-4 flex items-center justify-between gap-3"><span className="editorial-label">{names[block.type]}{interactive ? ' · обязательный шаг' : ''}</span>{interactive && <span className={cn('flex items-center gap-1 text-[11px] font-semibold', ready ? 'text-success' : 'text-muted-foreground')}>{ready ? <><Check className="h-3.5 w-3.5" /> Готово</> : 'Нужен ваш ответ'}</span>}</div>;
}

function ImageContent({ block }: { block: Extract<CourseBlock, { type: 'image' }> }) {
  const [expanded, setExpanded] = useState(false);
  return <>
    <button type="button" onClick={() => setExpanded(true)} className="relative block w-full overflow-hidden rounded-sm text-left" aria-label="Увеличить изображение">
      <img src={courseImages[block.image]} alt={block.title} className="aspect-[4/3] w-full object-cover" />
      <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-background text-foreground"><Expand className="h-4 w-4" /></span>
    </button>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{block.caption}</p>
    {expanded && <div className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/95 p-5" role="dialog" aria-modal="true" aria-label={block.title}>
      <Button size="icon" variant="outline" onClick={() => setExpanded(false)} aria-label="Закрыть изображение" className="absolute right-5 top-6 rounded-full border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"><X /></Button>
      <img src={courseImages[block.image]} alt={block.title} className="max-h-full w-full object-contain" />
    </div>}
  </>;
}

export function CourseBlockView({ block, answer, ready, onAnswer, onComplete }: CourseBlockProps) {
  const selected = typeof answer === 'string' ? answer : '';
  const checked = Array.isArray(answer) ? answer : [];

  if (block.type === 'text') return <section className="border-t border-border pt-7">
    <BlockLabel block={block} ready={ready} />
    <h2 className="font-heading text-2xl font-semibold leading-tight">{block.title}</h2>
    <p className="mt-4 text-[15px] leading-7 text-foreground/85">{block.body}</p>
    {block.callout && <div className="mt-6 border-l-2 border-primary bg-secondary p-5"><p className="editorial-label">Важно</p><p className="mt-2 text-sm font-medium leading-relaxed">{block.callout}</p></div>}
    {block.spoiler && <details className="group mt-5 border-y border-border py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">Если выполнять задание непросто <ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.spoiler}</p></details>}
  </section>;

  if (block.type === 'image') return <section className="border-t border-border pt-7"><BlockLabel block={block} ready={ready} /><h2 className="mb-4 font-heading text-xl font-semibold">{block.title}</h2><ImageContent block={block} /></section>;

  if (block.type === 'video') return <section className="border-t border-border pt-7">
    <BlockLabel block={block} ready={ready} />
    <div className="relative overflow-hidden rounded-sm"><img src={courseImages[block.image]} alt="" className="aspect-video w-full object-cover" /><div className="absolute inset-0 bg-foreground/25" /><button type="button" onClick={onComplete} aria-label={ready ? 'Видео просмотрено' : 'Воспроизвести видео'} className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-background text-foreground">{ready ? <Check /> : <Play className="ml-1" />}</span></button><span className="absolute bottom-3 right-3 rounded-sm bg-foreground px-2 py-1 text-xs text-background">{block.duration}</span>{ready && <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" />}</div>
    <h2 className="mt-4 font-heading text-xl font-semibold">{block.title}</h2>
    <Button variant={ready ? 'outline' : 'default'} onClick={onComplete} className="mt-4 w-full">{ready ? <><RotateCcw /> Посмотреть ещё раз</> : <><Play /> Отметить просмотр</>}</Button>
  </section>;

  if (block.type === 'quiz' || block.type === 'survey') return <section className="border-t border-border pt-7">
    <BlockLabel block={block} ready={ready} />
    <h2 className="font-heading text-2xl font-semibold leading-tight">{block.title}</h2>
    <div className="mt-5 space-y-2">{block.options.map(option => <button type="button" key={option} onClick={() => onAnswer(option)} className={cn('flex min-h-12 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm leading-snug transition', selected === option ? 'border-primary bg-primary/10' : 'border-border bg-card')}><span>{option}</span><span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full border', selected === option ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>{selected === option && <Check className="h-3 w-3" />}</span></button>)}</div>
    {selected && block.type === 'quiz' && <div className={cn('mt-5 border-l-2 p-4', selected === block.answer ? 'border-success bg-success/5' : 'border-primary bg-primary/5')}><p className="text-sm font-semibold">{selected === block.answer ? 'Верно' : 'Посмотрите на это иначе'}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.explanation}</p></div>}
    {selected && block.type === 'survey' && <div className="mt-6 border-l-2 border-primary bg-secondary p-5"><p className="editorial-label">Ваш персональный фокус</p><p className="mt-2 text-sm leading-relaxed">Начните с наблюдения за выбранным сценарием. Это не диагноз, а отправная точка для образовательных заданий курса.</p></div>}
  </section>;

  if (block.type === 'checklist') return <section className="border-t border-border pt-7">
    <BlockLabel block={block} ready={ready} />
    <h2 className="font-heading text-2xl font-semibold">{block.title}</h2>
    <div className="mt-5 divide-y divide-border border-y border-border">{block.items.map(item => { const isChecked = checked.includes(item.id); return <button type="button" key={item.id} onClick={() => onAnswer(isChecked ? checked.filter(id => id !== item.id) : [...checked, item.id])} className="flex min-h-14 w-full items-center gap-3 py-3 text-left"><span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-sm border', isChecked ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>{isChecked && <Check className="h-4 w-4" />}</span><span className="flex-1 text-sm">{item.label}</span>{item.optional && <span className="text-[10px] text-muted-foreground">по желанию</span>}</button>; })}</div>
  </section>;

  if (block.type === 'task') return <section className="border-t border-border pt-7">
    <BlockLabel block={block} ready={ready} />
    <h2 className="font-heading text-2xl font-semibold">{block.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.prompt}</p>
    <Textarea value={selected} onChange={event => onAnswer(event.target.value)} placeholder={block.placeholder} className="mt-5 min-h-32 resize-none bg-card text-sm leading-relaxed" />
    <p className="mt-2 text-xs text-muted-foreground">Ответ сохраняется автоматически на этом устройстве.</p>
  </section>;

  return <section className="border-t border-border pt-7"><BlockLabel block={block} ready={ready} /><h2 className="font-heading text-2xl font-semibold">{block.title}</h2><div className="mt-5 divide-y divide-border border-y border-border">{block.items.map(item => <a key={item.id} href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${item.label}\n\nDIAITA · образовательный материал курса.\n`)}`} download={`${item.id}-diaita.txt`} className="flex min-h-16 items-center gap-3 py-3"><FileText className="h-5 w-5 text-primary" /><span className="flex-1"><span className="block text-sm font-semibold">{item.label}</span><span className="mt-1 block text-xs text-muted-foreground">{item.description}</span></span><Download className="h-4 w-4" /></a>)}</div></section>;
}
