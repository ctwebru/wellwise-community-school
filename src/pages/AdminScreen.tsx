import React, { useState } from 'react';
import { MOCK_POSTS, Post } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus, Filter, FileText, Clock, CheckCircle2, ArrowLeft,
  Image as ImageIcon, Video, Send, Save, Calendar, MessageSquare,
  MoreVertical, Edit, Trash2, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminView = 'list' | 'compose';
type PostFilter = 'all' | 'published' | 'draft' | 'scheduled';

const AdminScreen = () => {
  const [view, setView] = useState<AdminView>('list');
  const [filter, setFilter] = useState<PostFilter>('all');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Composer state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [section, setSection] = useState<'posts' | 'school'>('posts');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [showActions, setShowActions] = useState<string | null>(null);

  const allPosts = MOCK_POSTS;

  const filteredPosts = allPosts.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const statusConfig = {
    published: { label: 'Опубликован', icon: CheckCircle2, color: 'text-success' },
    draft: { label: 'Черновик', icon: FileText, color: 'text-warning' },
    scheduled: { label: 'Запланирован', icon: Clock, color: 'text-info' },
  };

  const resetComposer = () => {
    setTitle('');
    setContent('');
    setSection('posts');
    setCommentsEnabled(true);
    setEditingPost(null);
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setSection(post.section);
    setCommentsEnabled(post.commentsEnabled);
    setEditingPost(post);
    setView('compose');
  };

  if (view === 'compose') {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Composer header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => { setView('list'); resetComposer(); }}
              className="p-2 -ml-2 text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-foreground">
              {editingPost ? 'Редактирование' : 'Новый пост'}
            </span>
            <div className="w-9" />
          </div>
        </div>

        <div className="px-5 pt-5 space-y-5">
          {/* Section selector */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
              Раздел
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSection('posts')}
                className={cn(
                  'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors',
                  section === 'posts'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border text-muted-foreground'
                )}
              >
                Посты
              </button>
              <button
                onClick={() => setSection('school')}
                className={cn(
                  'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors',
                  section === 'school'
                    ? 'bg-premium text-premium-foreground border-premium'
                    : 'bg-card border-border text-muted-foreground'
                )}
              >
                Школа
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок поста"
              className="h-12 rounded-xl bg-card border-border text-lg font-semibold placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Content */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите что-нибудь полезное..."
              rows={12}
              className="w-full rounded-xl bg-card border border-border p-4 text-reading text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Media buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ImageIcon className="w-4 h-4" /> Фото
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Video className="w-4 h-4" /> Видео
            </button>
          </div>

          {/* Settings */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Комментарии</span>
              </div>
              <button
                onClick={() => setCommentsEnabled(!commentsEnabled)}
                className={cn(
                  'w-11 h-6 rounded-full transition-colors relative',
                  commentsEnabled ? 'bg-primary' : 'bg-muted'
                )}
              >
                <span className={cn(
                  'absolute top-0.5 w-5 h-5 rounded-full bg-background shadow-sm transition-transform',
                  commentsEnabled ? 'left-[22px]' : 'left-0.5'
                )} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-4">
            <Button className="w-full h-12 rounded-xl text-base font-semibold">
              <Send className="w-4 h-4 mr-2" />
              Опубликовать сейчас
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-11 rounded-xl">
                <Calendar className="w-4 h-4 mr-1.5" />
                Запланировать
              </Button>
              <Button variant="secondary" className="flex-1 h-11 rounded-xl">
                <Save className="w-4 h-4 mr-1.5" />
                Черновик
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Post list view
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Управление</h1>
          <Button
            size="sm"
            onClick={() => setView('compose')}
            className="rounded-xl"
          >
            <Plus className="w-4 h-4 mr-1" />
            Пост
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as PostFilter, label: 'Все' },
            { id: 'published' as PostFilter, label: 'Опубликованные' },
            { id: 'draft' as PostFilter, label: 'Черновики' },
            { id: 'scheduled' as PostFilter, label: 'Запланированные' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors',
                filter === f.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      <div className="px-4 space-y-2">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Нет постов в этой категории</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const status = statusConfig[post.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={post.id}
                className="bg-card rounded-xl border border-border p-4 animate-fade-in"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusIcon className={cn('w-3.5 h-3.5', status.color)} />
                      <span className={cn('text-xs font-medium', status.color)}>{status.label}</span>
                      {post.section === 'school' && (
                        <span className="text-[10px] font-semibold bg-premium/10 text-premium px-1.5 py-0.5 rounded-full">
                          Школа
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === post.id ? null : post.id)}
                      className="p-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {showActions === post.id && (
                      <div className="absolute right-0 top-8 bg-popover border border-border rounded-lg shadow-elevated p-1 z-10 min-w-[130px] animate-scale-in">
                        <button
                          onClick={() => { handleEdit(post); setShowActions(null); }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                        >
                          <Edit className="w-3.5 h-3.5" /> Изменить
                        </button>
                        <button
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminScreen;
