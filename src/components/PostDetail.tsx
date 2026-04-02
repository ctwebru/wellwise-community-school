import React, { useState } from 'react';
import { Post, MOCK_COMMENTS, Comment } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft, Bookmark, BookmarkCheck, Heart, Send, Play,
  MoreVertical, Trash2, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
}

const PostDetail = ({ post, onBack, onToggleFavorite }: PostDetailProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(
    MOCK_COMMENTS.filter((c) => c.postId === post.id)
  );
  const [showModMenu, setShowModMenu] = useState<string | null>(null);

  const isModerator = user?.role === 'moderator' || user?.role === 'admin';

  const handleReaction = (emoji: string) => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      postId: post.id,
      userId: user?.id || '',
      userName: user?.email?.split('@')[0] || 'Вы',
      text: commentText,
      createdAt: new Date().toISOString(),
      isHidden: false,
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleHideComment = (commentId: string) => {
    setComments(comments.map(c => c.id === commentId ? { ...c, isHidden: true } : c));
    setShowModMenu(null);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
    setShowModMenu(null);
  };

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="p-2 -ml-2 text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(post.id)}
              className={cn(
                'p-2 rounded-full',
                post.isFavorited ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {post.isFavorited ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-6 pb-32 max-w-lg mx-auto">
        {post.section === 'school' && (
          <span className="inline-block text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full mb-3">
            Школа здоровья
          </span>
        )}

        <h1 className="text-2xl font-bold text-foreground leading-tight mb-2 font-serif">
          {post.title}
        </h1>

        <p className="text-sm text-muted-foreground mb-6">{date}</p>

        {post.imageUrl !== undefined && (
          <div className="rounded-xl bg-muted overflow-hidden aspect-video mb-6 flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl block mb-2">🏥</span>
              <span className="text-sm text-muted-foreground">Иллюстрация к статье</span>
            </div>
          </div>
        )}

        {post.videoUrl && (
          <div className="rounded-xl bg-foreground/5 overflow-hidden aspect-video mb-6 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
            </div>
          </div>
        )}

        <div className="text-reading text-foreground space-y-4">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className={cn(paragraph.startsWith('**') && 'font-semibold')}>
              {paragraph.replace(/\*\*/g, '')}
            </p>
          ))}
        </div>

        {/* Reactions */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-2 flex-wrap">
            {['❤️', '👍', '🔥', '💡', '😊'].map((emoji) => {
              const reaction = post.reactions.find((r) => r.emoji === emoji);
              return (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all',
                    liked && emoji === '❤️'
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                  )}
                >
                  <span>{emoji}</span>
                  {reaction && <span className="text-xs font-medium">{reaction.count}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comments */}
        {post.commentsEnabled && (
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-base font-semibold text-foreground mb-4 font-serif">
              Комментарии {comments.filter(c => !c.isHidden).length > 0 && `(${comments.filter(c => !c.isHidden).length})`}
            </h3>

            {comments.filter(c => !c.isHidden).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">Пока нет комментариев</p>
                <p className="text-xs text-muted-foreground mt-1">Будьте первым!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.filter(c => !c.isHidden).map((comment) => (
                  <div key={comment.id} className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">
                        {comment.userName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{comment.userName}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </span>
                          {isModerator && (
                            <div className="relative">
                              <button
                                onClick={() => setShowModMenu(showModMenu === comment.id ? null : comment.id)}
                                className="p-1 text-muted-foreground hover:text-foreground"
                              >
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                              {showModMenu === comment.id && (
                                <div className="absolute right-0 top-6 bg-popover border border-border rounded-lg shadow-elevated p-1 z-10 min-w-[140px] animate-scale-in">
                                  <button
                                    onClick={() => handleHideComment(comment.id)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
                                  >
                                    <EyeOff className="w-3.5 h-3.5" /> Скрыть
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Удалить
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 mt-0.5 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment input */}
            <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 z-40">
              <div className="flex items-center gap-2 max-w-lg mx-auto">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Написать комментарий..."
                  className="flex-1 h-10 px-4 rounded-full bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    commentText.trim()
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
