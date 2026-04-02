import React from 'react';
import { Post } from '@/data/mockData';
import { Heart, MessageCircle, Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onOpen: (post: Post) => void;
  onToggleFavorite: (id: string) => void;
}

const PostCard = ({ post, onOpen, onToggleFavorite }: PostCardProps) => {
  const totalReactions = post.reactions.reduce((sum, r) => sum + r.count, 0);
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    : 'Черновик';

  return (
    <article
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow animate-fade-in cursor-pointer"
      onClick={() => onOpen(post)}
    >
      {post.imageUrl && (
        <div className="aspect-[2/1] bg-muted overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary/8 to-primary/3 flex items-center justify-center">
            <span className="text-4xl">📖</span>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground">{date}</span>
          {post.section === 'school' && (
            <span className="text-[10px] font-semibold bg-premium/10 text-premium px-2 py-0.5 rounded-full">
              Школа
            </span>
          )}
          {post.status === 'draft' && (
            <span className="text-[10px] font-semibold bg-warning/15 text-warning px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> Черновик
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-foreground leading-snug mb-1.5 font-serif">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            {totalReactions > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="w-3.5 h-3.5" />
                {totalReactions}
              </span>
            )}
            {post.commentsCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="w-3.5 h-3.5" />
                {post.commentsCount}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(post.id); }}
            className={cn(
              'p-1.5 rounded-full transition-colors',
              post.isFavorited ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            )}
          >
            {post.isFavorited ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
